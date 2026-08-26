# Edgecoms Academy: Implementation Plan

Status: approved and in progress.

| Phase | State |
| --- | --- |
| 0. Cleanup and foundation | done |
| 1. Content layer | done |
| 2. Database and access | done in code; Neon and Resend domain still to provision |
| 3. Public surface | done |
| 4. Lesson experience | done |
| 5. Progress | done |
| 6. Polish and ship | not started |

Two external items block nothing locally but must be done before deploy: a Neon
project with a pooled connection string, and a Resend-verified sending domain.

---

## 0. What already exists

Scaffold: Better-T-Stack v3.40.5, Bun 1.3.14 workspaces + Turborepo, Biome/Ultracite.

| Area | State | Verdict |
| --- | --- | --- |
| `apps/web` | Next.js 16 App Router, React 19.2, `typedRoutes: true`, `reactCompiler: true`, port 3001 | Keep |
| `packages/ui` | shadcn `base-lyra` on `@base-ui/react`, Tailwind v4 CSS-first tokens | Keep, retune tokens |
| `packages/db` | Drizzle 0.45, `drizzle-orm/node-postgres` + `pg`, empty migrations dir | Keep |
| `packages/db/src/schema/auth.ts` | Better Auth tables already written: `user`, `session`, `account`, `verification`, with indexes and relations | Keep as is |
| `packages/auth` | `betterAuth()` with drizzle pg adapter, email+password, `nextCookies()` | Keep, extend |
| `packages/env` | `@t3-oss/env` server schema: `DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`. Web schema empty | Keep, extend |
| `packages/api` | tRPC v11, `publicProcedure` / `protectedProcedure`, demo router | Recommend deletion |
| Routes | `/` ASCII-art demo, `/login`, `/dashboard` demo, `/api/auth/[...all]`, `/api/trpc/[trpc]` | Delete demos, keep auth handler |
| Auth forms | `sign-in-form.tsx`, `sign-up-form.tsx`, password based | Delete, replaced by the code flow in section F |
| Deploy | `vercel.json` Vercel Services, root `apps/web`, env sync script in `scripts/` | Keep |
| Local DB | `packages/db/docker-compose.yml` postgres:18 | Keep for offline dev |

Not installed anywhere: Resend, PostHog, Sentry. Matches the revised scope.

### Defects found in the current tree

1. **`apps/web/src/app/layout.tsx` (uncommitted diff) moves `suppressHydrationWarning` from `<html>` to `<body>`.** `next-themes` writes the `class` attribute onto `<html>`, so the suppression must sit on `<html>` or every load logs a hydration mismatch. Revert this.
2. **Font mismatch.** `globals.css` declares `--font-sans: "Inter Variable"`, which is never loaded; `layout.tsx` loads Geist + Geist Mono via `next/font`. One of the two has to change. Recommendation: keep `next/font`, load Inter, point the token at `var(--font-inter)`.
3. **Dead shared components.** `attachment`, `bubble`, `marker`, `message`, `message-scroller`, `empty`, `input-group`, `card`, `checkbox`, `tooltip`, `textarea` have zero importers outside `packages/ui`. The first five are AI-chat primitives with no place in this product. Delete them.
4. **`packages/api/src/context.ts` returns a dead `auth: null` field.** Moot if tRPC goes.

---

## A. Product architecture

One product, three surfaces.

**Public surface (no session).** Marketing home, Academy landing, course overview pages. Fully static, prerendered at build, indexed by search engines. This is the acquisition layer and the only SEO surface.

**Account surface (session required).** Dashboard, lesson pages, account settings. Server-rendered per request because everything on them is user-scoped.

**Content.** Curriculum lives in the repository as typed TypeScript data, not in the database and not inside React components. One course, three modules, N lessons per module. Editing a lesson is a pull request; deploying is the publish action. Video assets live at Tella and are referenced by id.

**Progress.** The only user-generated data in V1. One Postgres table. Edgecoms Academy is the sole source of truth for progress; Tella analytics are never read.

### Why content lives in git, not the database

You asked for `courses` / `modules` / `lessons` tables. I recommend against them for V1, and here is the reasoning as the person who will maintain this.

The content set is roughly 30 lessons, edited by the Edgecoms team, changing rarely. Database-backed content buys you exactly one thing: editing without a deploy. To collect it you must build and maintain a seed pipeline, keep seed files and rows in sync, handle "who wins" on conflicts, and eventually build an admin UI, because nobody edits 30 rows in Drizzle Studio for long. That is four moving parts to solve a problem you do not have yet.

Content in git gives you: type checking on the whole curriculum, review before publish, instant rollback, no seed drift, no admin build, and zero content queries at request time. Linear, Vercel and Stripe all ship their docs this way.

The path out is short and I have kept it deliberately short. Every read goes through one module (`content/registry.ts`, roughly `getCourse`, `getLesson`, `getLessonNeighbours`). Moving to database-backed content later means reimplementing three functions against tables and running the existing typed content through a one-off seed. No page, component, or route changes. Section C includes the table design for that day so you are not designing it under pressure.

If you disagree and want the tables now, say so and I will build the alternative in section C.2 instead. It is more code, not less.

---

## B. Application architecture

### Next.js structure

```
apps/web/src/
  app/
    layout.tsx                     root: fonts, theme provider, toaster
    page.tsx                       marketing home (static)
    academy/
      page.tsx                     academy landing (static)
      courses/[courseSlug]/
        page.tsx                   course overview (static, generateStaticParams)
      access/page.tsx              two step code form, public
      (app)/                       route group, session enforced in layout
        layout.tsx                 requireSession + AcademyShell
        dashboard/page.tsx
        account/page.tsx
        courses/[courseSlug]/[lessonSlug]/
          layout.tsx               sidebar + content grid
          page.tsx                 lesson
    api/auth/[...all]/route.ts     Better Auth handler
    sitemap.ts
    robots.ts
  content/
    index.ts                       server-only guard in front of the registry
    registry.ts                    getCourse, getLesson, neighbours, totals
    registry.check.ts              runnable assertion check
    types.ts
    courses/shopify-ecommerce.ts
  lib/
    session.ts                     requireSession, getOptionalSession
    progress.ts                    server-only reads
  actions/
    progress.ts                    "use server" mutations
  components/
    academy/...                    see section E
```

Note the deliberate duplication of `courses/[courseSlug]` in two places: the public overview lives outside the `(app)` group so it can be fully static, and the lesson route lives inside it so it inherits the session gate. Same URL space, different caching characteristics.

### Server / client boundary

Default is Server Component. Client Components are limited to, and only to:

- the mobile sidebar sheet (open/close state),
- the video facade (click to mount the iframe),
- the "Mark complete" button (pending state on a server action),
- the auth forms (already client, keeping them),
- theme toggle and user menu (already client).

The sidebar itself, including per-lesson completion ticks and progress bars, renders on the server. No client state store, no react-query, no data fetching hooks anywhere in the Academy.

### Remove tRPC

Recommendation: delete `packages/api`, `app/api/trpc/[trpc]`, `utils/trpc.ts`, `@trpc/*`, `@tanstack/react-query` and its devtools.

Justification, not preference: every Academy read happens during server render and every write is one of three mutations that a Server Action expresses in five lines. tRPC's value is type safety across a network boundary you do not have here. Keeping it means shipping the tRPC client, react-query, and a hydration path to browsers that have no queries to run. Removing it deletes a package, a route handler, a provider, and roughly 100 KB of client JavaScript for a platform whose whole pitch is that it feels fast.

`protectedProcedure` is replaced by `requireSession()` in `lib/session.ts`, which every action and every server-only read calls. That is a stricter boundary than a tRPC middleware, because it sits next to the data access rather than next to the transport.

If you plan a mobile app or a public API within a year, keep tRPC and I will route the Academy through it instead. Say the word.

### Database access

`packages/db` exports `db` and the schema. Reads live in `apps/web/src/lib/progress.ts`, which starts with `import "server-only"`. Writes live in `apps/web/src/actions/progress.ts`. Nothing else in the app imports `db`. Every function derives `userId` from the session, never from an argument.

Driver: keep `drizzle-orm/node-postgres` and point `DATABASE_URL` at Neon's pooled endpoint (the `-pooler` host). Zero code change, keeps real transactions, and the pooler is designed for exactly this. `@neondatabase/serverless` with `drizzle-orm/neon-http` is the upgrade if cold-start latency ever shows up in traces; it costs interactive transactions, which we do not use today. Not worth the churn now.

### Video embedding

See section H.

### Progress tracking

See section G.

---

## C. Database design

### C.1 Recommended schema

Better Auth owns four tables that already exist and stay untouched: `user`, `session`, `account`, `verification`. Better Auth writes them via its Drizzle adapter; the Academy only ever reads `user.id` and `user.name` / `user.email`.

Academy adds exactly one table, in a new file `packages/db/src/schema/academy.ts`, exported from `schema/index.ts` alongside auth. Same database, one migration history, separate files so the Better Auth tables stay recognisably vendor-owned.

**`lesson_progress`**

Purpose: the complete record of what a student has started and finished. One row per (user, lesson). Created on first real interaction, updated on completion, never deleted.

| Column | Type | Notes |
| --- | --- | --- |
| `user_id` | `text` not null | FK `user.id`, `on delete cascade` |
| `course_slug` | `text` not null | part of the key, and lets per-course queries skip a content lookup |
| `lesson_slug` | `text` not null | matches a slug in the content module, unique within its course |
| `started_at` | `timestamp` not null default now | |
| `completed_at` | `timestamp` null | null means started but not finished |
| `updated_at` | `timestamp` not null, `$onUpdate` | drives "resume where you left off" |

Constraints and indexes:

- Primary key `(user_id, course_slug, lesson_slug)`. Composite PK gives the upsert conflict target for free and makes the row naturally idempotent. No surrogate id.
- The leading `(user_id, course_slug)` prefix of the PK already serves the sidebar and the course progress count, so no separate index for those.
- `index (user_id, updated_at desc)` serves the single "continue learning" query.

Relationship: `lesson_progress.user_id` to `user.id`, many to one. There is no FK to a lessons table because there is no lessons table; slug integrity is enforced at build time by the content module and at write time by validating the slug against content before the upsert. That validation matters and is not optional, see section L.

**Corrected during Phase 1.** An earlier draft keyed progress on `lesson_slug` alone, which forced lesson slugs to be unique across every course forever. That is an artificial constraint: routing only needs uniqueness within a course, and the global rule would have meant the second course could never have its own `introduction`. Putting `course_slug` into the key removes it at the cost of nothing, since the column was already in the table. The content registry enforces per-course uniqueness and throws at module load on a duplicate, so a clash fails the build rather than corrupting progress.

Deliberate constraint: **lesson slugs are immutable once shipped.** They are URLs, so renaming one already breaks bookmarks and search results. If a rename is ever unavoidable it is a one line `UPDATE lesson_progress SET lesson_slug = ... WHERE lesson_slug = ...` in the same PR.

Everything else is derived, not stored:

- Lesson state: presence of the row, plus `completed_at` null or not.
- Module progress: count of completed rows whose slug is in that module, over the module's lesson count from content.
- Course progress: one `count(*) where completed_at is not null` over the course's total from content.
- Resume target: newest `updated_at` row for the user.

No `enrollments` table. Every course is free and open to every signed-in user, so an enrollment row would encode no information. First progress row is the enrollment.

No `course_progress` summary table. Denormalised aggregates need invalidation. A count over an indexed composite key with a few dozen rows per user costs nothing.

### C.2 Alternative if content moves to the database later

Add three tables, keep `lesson_progress` and repoint it:

- `course`: `id` (uuid pk), `slug` unique, `title`, `tagline`, `published_at`, `position`.
- `module`: `id`, `course_id` FK cascade, `slug`, `title`, `blurb`, `position`. Unique `(course_id, slug)`, index on `course_id`.
- `lesson`: `id`, `module_id` FK cascade, `slug` unique globally, `title`, `summary`, `body`, `takeaways` jsonb, `resources` jsonb, `chapters` jsonb, `video_provider`, `video_id`, `duration_seconds`, `position`, `published_at`. Unique `(module_id, slug)`, index on `module_id`, index on `published_at`.
- `lesson_progress` gains `lesson_id` FK, keeps `lesson_slug` during the transition, drops it after.

Ordering is an integer `position` column, spaced by 10 on seed so a reorder is an update rather than a renumber. Migration is a script that walks the existing typed content and inserts it. Do this when a non-engineer needs to publish, and not before.

---

## D. Route architecture

Assumption to confirm (see section P): this application is deployed on its own and mounted at `edgecoms.com/academy` by a rewrite from the main site. Under that assumption **every route lives under `/academy`**, including login, so the app's own paths and the public paths are identical and no `basePath` juggling or link rewriting is needed.

| Route | Access | Rendering | Indexed |
| --- | --- | --- | --- |
| `/` | public | redirect to `/academy` | n/a |
| `/academy` | public | static | yes |
| `/academy/courses/[courseSlug]` | public | static, `generateStaticParams` | yes |
| `/academy/courses/[courseSlug]/[lessonSlug]` | session | dynamic | no |
| `/academy/dashboard` | session | dynamic | no |
| `/academy/account` | session | dynamic | no |
| `/academy/access` | public | static | no |
| `/api/auth/[...all]` | Better Auth | handler | no |
| `/sitemap.xml`, `/robots.txt` | public | generated | n/a |

Deviations from your draft, with reasons:

- **`/lessons/` segment dropped.** `/academy/courses/shopify-ecommerce/product-research` reads better than `.../lessons/product-research`, is shorter to share, and matches the documentation-site feel you asked for. Nothing else can occupy that segment because course slugs are enumerable at build time.
- **`/` redirects rather than being a second marketing page.** An earlier draft had a marketing homepage at `/` and an Academy landing at `/academy`, which is two pages carrying one message. Under the rewrite assumption `/` in this deployment has no production role at all, since `edgecoms.com/` is the agency site. It redirects, and `/academy` is the single landing page.
- **`/academy` is the public landing, not a conditional dashboard.** Rendering two different pages at one URL forces the whole route dynamic and kills its static prerender, which is the page most likely to be shared. The dashboard gets its own URL and the header CTA switches between "Start learning" and "Continue" based on session.
- **One `/academy/access` route, no `/login`, `/signup`, `/forgot-password` or `/reset-password`.** With emailed codes there are no passwords to reset and no separate signup, so four routes collapse into one. See section F.
- **`/academy/dashboard` root redirect.** After login, land on `/academy/dashboard`. If the user has progress, the dashboard's primary action deep links straight to their resume lesson.

---

## E. Component architecture

Server Components unless marked client.

**Shell and navigation**

- `AcademyShell` (server): the two column grid, sidebar slot, content slot, mobile header bar. Lives in the `(app)` layout.
- `CourseNavigation` (server): renders modules and lessons from content, merges in the progress map passed as a prop, marks current lesson from `params`. Renders `<a>` tags, no client router state.
- `MobileNavSheet` (client): wraps `CourseNavigation` in a shadcn `sheet` for small screens. The only reason this is client is the open/close boolean.
- `CourseProgressMeter` (server): the "18 / 25 lessons, 72%" bar. Used in the sidebar footer, the dashboard card, and the course overview.

**Lesson page**

- `LessonHeader` (server): eyebrow (`01 / FIND & VALIDATE PRODUCTS`), title, duration, module context.
- `LessonVideo` (client, thin): the provider facade. See section H.
- `LessonBody` (server): description paragraphs and prose.
- `LessonTakeaways` (server): the key takeaways list.
- `ResourceList` (server): links and downloads, rendered only when the lesson has resources.
- `LessonChapters` (server): the timestamp list from the reference screenshot. Rendered as non-interactive labels.

  **Revised in Phase 4.** Tella's embed does accept a `t` parameter for a start time, so a chapter click could remount the iframe at that timestamp. Two reasons it stays static for now: `autoPlay` only works muted, so a chapter jump would land paused or silent, and there is no real video to test the remount against. Revisit once real recordings exist.
- `CompleteLessonButton` (server): a `<form>` posting to a server action, with a small client submit button for the pending state. Works without JavaScript, and the same shape is used for "Next", which completes the current lesson and redirects in one round trip.
- `LessonPagination` (server): previous and next, resolved from the flattened lesson list.

**Dashboard and marketing**

- `ContinueLearning` (server): the resume card, hidden entirely for users with no progress, replaced by a "Start with Module 01" card.
- `ModuleCard` (server): one card per module, used on the dashboard and the course overview. Not a "CourseCard"; with one course, a course card is a page, not a card.

Components explicitly not built: no `LessonProgress` separate from `CourseProgressMeter` (same component, different props), no generic `Breadcrumb` (two levels, inline), no `Sidebar` abstraction from shadcn's sidebar block (it is a large stateful component built for app shells with collapsible rails; a two column CSS grid with a sticky column is ten lines and looks better).

**Shared UI additions.** Only `sheet` and `progress` from shadcn. `progress` is worth taking rather than hand rolling purely for its ARIA wiring. Module groups in the sidebar use the native `<details>` element rather than an accordion component.

**Design tokens.** Retune `packages/ui/src/styles/globals.css` before building pages, not after: tighter neutral ramp, `--radius` down from `0.625rem` to around `0.5rem`, a real border colour rather than pure grey, and a defined type scale. Everything downstream inherits it, so this is cheap now and expensive later.

---

## F. Authentication flow

**No passwords anywhere.** Access is a six digit code emailed to the address the student types into a two field form. Better Auth's `emailOTP` plugin provides the whole mechanism, and this deletes password hashing, the forgot password page, the reset password page, the separate email verification flow, and the support queue that comes with all four.

### Why a code and not a magic link

Module 03 of your own course is about Meta Ads, so a large share of Academy traffic will arrive from Instagram and Facebook, which open links inside their own in-app browser. A magic link tapped in that in-app browser opens in the system browser, so the session cookie lands in a browser the student was not using and they end up staring at a signed-out page with no idea why. A code is typed into the tab that is already open, so it works in every browser including the broken ones. It also matches the "access key" you described.

### The flow

```
Step 1  form: name + email
        POST /api/auth/email-otp/send-verification-otp  { email, type: "sign-in" }
        code generated, hashed, stored in the existing `verification` table, emailed

Step 2  form: 6 digit code
        POST /api/auth/sign-in/email-otp  { email, otp, name }
        code verified and consumed
        user does not exist -> created with emailVerified: true, session opened
        user exists         -> session opened
        session cookie set, redirect to /academy/dashboard
```

Both steps live on one page at `/academy/access`, with the name carried between them in component state. There is no separate signup page and no separate login page, because the endpoint does not distinguish: `disableSignUp` stays `false`, which is exactly what collapses the two into one.

Verified against better-auth 1.7.1 in this repo: `/sign-in/email-otp` accepts `{ email, otp, name, image, ...rest }`, and `...rest` is passed through `parseUserInput` on create. Any extra qualifying question you want on the form (store stage, monthly revenue, goal) can be declared in `user.additionalFields` and written straight onto the user row by the same request. No second call, no profile step, no separate leads table.

### Configuration

```ts
betterAuth({
  emailAndPassword: { enabled: false },
  plugins: [
    emailOTP({
      otpLength: 6,
      expiresIn: 600,
      allowedAttempts: 3,
      storeOTP: "hashed",
      rateLimit: { window: 60, max: 3 },
      sendVerificationOTP: async ({ email, otp }) => { /* see below */ },
    }),
    nextCookies(),
  ],
  session: { expiresIn: 60 * 60 * 24 * 60, updateAge: 60 * 60 * 24, cookieCache: { enabled: true } },
})
```

`storeOTP: "hashed"` so a database leak does not hand out live codes. Sixty day rolling sessions because re-authenticating costs an email round trip, and a student who returns after three weeks should land on their lesson, not on a form.

### Sending the email

Email is now on the critical path, so it is back in scope. Resend, called with `fetch`:

```ts
await fetch("https://api.resend.com/emails", {
  method: "POST",
  headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
  body: JSON.stringify({ from: env.EMAIL_FROM, to: email, subject: `${otp} is your Edgecoms Academy code`, html }),
})
```

No `resend` package and no `react-email`. There is one email in this product, its body is a heading and a six digit number, and the SDK wraps a single endpoint. Swapping to the SDK later is a ten line change if batching or webhooks ever matter.

The plugin docs suggest not awaiting the send to avoid timing attacks. That concern applies to flows that branch on whether an account exists; this one does not branch, so await it and skip the `waitUntil` dependency.

### Session, access and logout

Unchanged from the rest of the plan. Session is a Better Auth cookie backed by `session` rows. `lib/session.ts` exposes `getOptionalSession()` and `requireSession()`, the latter redirecting to `/academy/access`. The `(app)` layout calls `requireSession()`, and so does every server action and every function in `lib/progress.ts`, because the guard next to the data is the one that counts. Logout is `authClient.signOut()` then `router.push("/academy")` and `router.refresh()`.

### What this does and does not secure

Worth stating plainly so nobody expects more from it than it gives. An emailed code proves the person controls that inbox. It does not stop anyone from getting in, because anyone has an inbox, and it does not stop a signed in student from pulling the Tella embed URL out of the page and sharing it. This is a lead gate, not DRM. That is the correct trade for free content: you get a verified email list and a progress record per student, and you should not spend a single day building video DRM on top of it.

### Schema impact

None. Codes live in the `verification` table that `schema/auth.ts` already defines. The `account` table simply never receives a password row. No access key table, no invite table, no leads table.

## G. Progress architecture

Constraint first: **the Tella embed exposes no playback events we can depend on.** There is no reliable postMessage contract, so watched percentage is not observable. Any design that pretends otherwise will produce fake numbers. Progress is therefore interaction-based, not playback-based, and the model is deliberately coarse: a lesson is untouched, started, or completed.

**Mark started: on video play.** The video facade already handles a click to mount the iframe. That click fires a server action that upserts the row. It is a genuine intent signal, it costs no extra listener, and it does not fire for someone who opened a page by accident. Marking started on page render would need a side effect inside a Server Component, which is wrong, or a mount effect on every lesson, which is a request per page view for a signal worth less.

Fallback for lessons with no video: the same action fires from `LessonBody` mount. One small client wrapper, only rendered when `lesson.video` is absent.

**Mark completed: explicit, plus implicit on advance.** A "Mark as complete" button is the primary path, because a student who skims a lesson they already know should be able to tick it. Clicking "Next lesson" also completes the current one, which is how people actually move through a course and removes a click from the common path. Both call the same action. Both are idempotent.

No auto-complete on a timer and no auto-complete on scroll. Both lie about what happened.

**The write.** One upsert:

```
insert into lesson_progress (user_id, lesson_slug, course_slug, started_at, completed_at)
values (...)
on conflict (user_id, lesson_slug) do update set
  completed_at = coalesce(lesson_progress.completed_at, excluded.completed_at),
  updated_at = now()
```

`coalesce` preserves the first completion time so a revisit does not reset it. The action validates that `lessonSlug` exists in content and that `courseSlug` matches the content's mapping for it, then takes `userId` from the session. It calls `revalidatePath` on the lesson route so the sidebar tick and the progress bar update on the server without any client state.

**Resume.** One indexed query, newest `updated_at` for the user. If that row is incomplete, resume points at it; if complete, resume points at the next lesson in content order. If the user has no rows at all, `ContinueLearning` renders the "start here" variant instead. That is the whole "continue learning" feature, no extra table and no `last_lesson_id` column to keep in sync.

**Course progress.** Completed count from one query, total from content. Module progress is the same count filtered to the module's slugs, computed in memory from the single per-course fetch the sidebar already does.

**One query per request, not two.** `getCourseProgress` is wrapped in React's `cache()`, so the lesson layout and the lesson page share a single fetch during one render. Resume is derived from the same rows rather than issuing its own query: `selectResumeTarget` in `lib/resume.ts` is a pure function over the lesson sequence, the newest row, and the completed set, which also makes the branching testable without a database.

**Deliberate ceiling, stated up front:** resume returns to the top of a lesson, not to a video timestamp, because the player will not tell us the timestamp. If Tella is replaced by a player with a real API, add `last_position_seconds` to the existing table and have the video component report it. The table and the action tolerate that column without restructuring.

---

## H. Tella integration

Content stores a reference, never markup:

```ts
type LessonVideo = {
  provider: "tella"
  id: string
  poster?: string
}
```

`LessonVideo` is a small client component that renders a fixed 16:9 container and switches on `provider`. Today the switch has one arm, `TellaEmbed`, which renders the iframe with `allowFullScreen`, `title` set to the lesson title for screen readers, and no third party script of any kind. Replacing Tella means adding a second arm and changing one field in the content files. No page, layout, or database change.

**The iframe does not render on load.** Because the video sits at the top of the lesson page, `loading="lazy"` does nothing for it, so the component uses a facade: a poster image when the lesson has one, otherwise a typographic title card matching the reference screenshot, with a play button over it. Clicking mounts the iframe and fires the "started" progress action. Verified in Phase 4: Tella's `autoPlay` only autoplays muted, and a cross-origin iframe cannot inherit the click gesture anyway, so the player mounts paused and the student presses Tella's play button. Two clicks for a lesson whose content is the audio beats one click with the sound off. This keeps the third party frame, its network requests, and its JavaScript entirely out of the initial page load and off the LCP path. The poster is the LCP element and it is a `next/image` we control.

The one thing to avoid, and the reason this abstraction is worth its small cost: no component outside `LessonVideo` may know the string "tella". Not the content types beyond the provider literal, not the pages, not the styles.

---

## I. Analytics

Dropped from scope per your instruction. No PostHog, no events, no provider component.

When it comes back, the minimum useful set is four events, not seven: `signed_up`, `lesson_started`, `lesson_completed`, `course_completed`. Everything else on your list is derivable from those four plus the `lesson_progress` table, and `module_completed` in particular is a query, not an event. The place to fire them is inside the existing progress server action, server side, where they cannot be blocked or double counted.

Worth noting: because progress already lives in your own database, you can answer most product questions with SQL today and do not need an analytics vendor to start.

---

## J. SEO

**Indexed:** `/`, `/academy`, and each `/academy/courses/[courseSlug]`. All static, all prerendered.

**Not indexed:** every route under `(app)`, plus `/academy/access`. Lesson pages set `robots: { index: false, follow: false }` in their `generateMetadata`, and `robots.ts` disallows the lesson path prefix. They are session-gated so a crawler sees only a redirect anyway, but stating it explicitly avoids soft-404 noise in Search Console.

**The SEO surface is the course overview page**, and it should be built to carry that weight: full module and lesson listing with titles and one line summaries, estimated durations, and the free positioning above the fold. That page is what ranks for "how to find winning products" style queries, and every lesson title on it is a keyword you own without exposing gated content.

**Implementation:** `metadataBase` from `NEXT_PUBLIC_APP_URL`, per-route `generateMetadata` with title, description and canonical, `opengraph-image.tsx` generated with `ImageResponse` from the course and lesson titles, `sitemap.ts` built by walking the content module so new lessons appear automatically, `robots.ts`, and one JSON-LD `Course` block on the course overview page. Nothing else. Structured data on lesson pages would describe content Google cannot see.

---

## K. Performance

- **Static where session is absent.** The three public pages read no session and no database, so they prerender at build and serve from the edge cache.
- **The video never blocks first paint.** Facade pattern, section H. This is the single largest win available on the lesson page.
- **Two queries per lesson request.** Session (usually served from the Better Auth cookie cache) and the per-course progress map. Content is a module import, resolved at build.
- **Sidebar is server rendered.** Thirty links with completion state cost nothing to render on the server and would cost a hydration pass and a client store on the client.
- **Client JavaScript budget.** Removing tRPC, react-query and its devtools takes the Academy down to the theme provider, the sheet, the video facade, the complete button, and the auth forms. The lesson page should ship well under 100 KB of first-load JS.
- **`next/font` with one variable family**, self hosted, no layout shift, no external font request.
- **`next/image`** for posters and any marketing imagery, with explicit dimensions.
- **`generateStaticParams`** on the public course route.
- **React Compiler is already enabled**, so manual `memo` and `useCallback` are unnecessary and should not be added.
- **Do not reach for Cache Components / PPR in V1.** The dynamic part of the lesson page is one indexed query on a table with tens of rows per user. Adding `use cache` and Suspense boundaries around it optimises something that is not slow, and cache invalidation on progress writes is a real source of stale-tick bugs. Revisit with real traces.

---

## L. Security review

| Concern | Handling |
| --- | --- |
| URL guessing into gated content | `requireSession()` in the `(app)` layout **and** in every data function and server action. Never a UI-level hide. |
| Server actions are public HTTP endpoints | Every action re-derives `userId` from the session. No action accepts a `userId` argument. Inputs validated with zod. |
| Writing progress for another user's lesson | Impossible by construction: the conflict target is `(session.user.id, slug)`. |
| Arbitrary slug injection into the table | The action validates the `(courseSlug, lessonSlug)` pair against the content module before the upsert. Without this, the table accumulates junk rows that inflate completion counts, since there is no FK to catch it. This is the one place where dropping the lessons table costs something, and this check is what pays for it. |
| Lesson content leaking to the client bundle | `content/index.ts` starts with `import "server-only"`. Worth noting the honest framing: the courses are free, so gating is a lead capture decision rather than a confidentiality boundary. Treating it as one anyway keeps the rule simple. |
| Credential stuffing | Not applicable. There are no passwords to stuff. |
| Code brute force | Six digits, `allowedAttempts: 3`, ten minute expiry, single use. |
| Code request flooding to someone else's inbox | Plugin `rateLimit` of three per minute per identifier, plus Better Auth's global `rateLimit` on auth endpoints. |
| Stolen database handing out live codes | `storeOTP: "hashed"`. |
| Account enumeration | The send and verify endpoints behave identically whether or not the address has an account, because signup and login are the same call. |
| Session fixation and cookie theft | Better Auth defaults: httpOnly, secure, sameSite lax, signed. Do not override. |
| Secrets | Only ever imported from `@edgecoms-academy/env/server`, which is server-only by construction. `.vercelignore` already blocks `.env` from deploys. `BETTER_AUTH_SECRET` is validated at 32 characters minimum. |
| Open redirect on `?next=` | Accept the parameter only when it starts with a single `/` and is not `//`. |
| Dependency and infrastructure surface | No new runtime service in V1. Fewer moving parts than the current tree, since tRPC leaves. |

Explicitly not doing: CSRF tokens (Better Auth and Next server actions handle origin checking), a WAF, audit logging, 2FA, CSP beyond Next's defaults. None are justified by a free course platform with one write path.

---

## M. Development phases

**Phase 0. Cleanup and foundation.** Delete the ASCII home page, the demo dashboard, the five unused chat components and the six unused primitives. Remove tRPC and react-query if approved. Revert the `suppressHydrationWarning` regression. Resolve the font mismatch. Retune design tokens and set the type scale. Add `sheet` and `progress`. Update README. Outcome: a clean, empty, correctly themed app.

**Phase 1. Content layer.** `content/types.ts`, `content/index.ts` with `getCourse`, `getLesson`, `getLessonNeighbours`, `getAllLessons`, `getCourseTotals`. One course file with three modules and the lesson placeholders you listed, real titles and slugs, placeholder bodies. A dev-time assertion that slugs are globally unique. Outcome: the curriculum is typed and queryable, ready for real copy.

**Phase 2. Database and access.** Start the Resend domain verification on day one of this phase, since DNS propagation is the only thing here with a lead time. Then: `schema/academy.ts` with `lesson_progress`, first generated migration, Neon project and pooled connection string, `db:migrate`. `lib/session.ts`. Swap `emailAndPassword` for `emailOTP`, wire `sendVerificationOTP` to Resend, write the code email template. Delete the password forms and build the two step `/academy/access` page with resend cooldown and error states. Outcome: a student can request a code, be created and signed in by it, and be correctly bounced from gated URLs.

**Phase 3. Public surface.** Marketing home, Academy landing, course overview page with the full lesson listing, metadata, OG images, sitemap, robots, JSON-LD. Outcome: the acquisition path is shippable on its own, before any lesson exists.

**Phase 4. Lesson experience.** `(app)` layout and shell, `CourseNavigation`, mobile sheet, `LessonHeader`, `LessonVideo` facade with `TellaEmbed`, body, takeaways, resources, chapters, pagination. Static navigation only, no progress yet. Outcome: the page in your reference screenshot, rendering real content.

**Phase 5. Progress.** The action, the reads, completion ticks in the sidebar, the meter, the complete button, next-completes-current, dashboard with `ContinueLearning` and module cards. Outcome: the product is functionally complete.

**Phase 6. Polish and ship.** Account page, keyboard navigation through the sidebar, focus states, reduced motion, empty and error states, `not-found` and `error` boundaries, responsive pass at 375 / 768 / 1280 / 1920, Lighthouse pass, `bun run check`, Vercel env sync, deploy, and the rewrite from the main domain.

Phases 3 and 4 are independent and can be reordered. Everything else is sequential.

---

## N. Dependencies

**Add:** still nothing at the package level. `sheet` and `progress` come from the shadcn CLI into `packages/ui` and depend only on `@base-ui/react`, already installed. Email sending is a `fetch` call, and `better-auth/plugins/email-otp` ships inside the `better-auth` version already installed.

**Remove:** `@trpc/server`, `@trpc/client`, `@trpc/tanstack-react-query`, `@tanstack/react-query`, `@tanstack/react-query-devtools`, and the `packages/api` workspace.

**Keep as is:** `better-auth`, `drizzle-orm`, `pg`, `zod`, `next-themes`, `sonner`, `lucide-react`, `@base-ui/react`, `class-variance-authority`, `clsx`, `tailwind-merge`, `tw-animate-css`, `@t3-oss/env-*`.

**Remove, second wave:** `@tanstack/react-form`. It existed only for the two password forms, and the access form is two inputs across two steps, which `useActionState` handles without a library.

**Considered and rejected:** the `resend` SDK and `react-email` (one email, one endpoint, see section F), `@vercel/functions` for `waitUntil` (nothing to defer), any MDX toolchain (lesson bodies are short; add it the day a lesson needs long-form prose with inline links), any state manager, any carousel or animation library, `@neondatabase/serverless` (see section B), shadcn's `sidebar` block, and every one of the analytics, email and monitoring packages now out of scope.

---

## O. Environment variables

Existing, keep:

- `DATABASE_URL` — Neon pooled connection string. Local dev may point at the docker compose instance instead.
- `BETTER_AUTH_SECRET` — minimum 32 characters, distinct per environment.
- `BETTER_AUTH_URL` — full origin. The env package already falls back to the Vercel-provided URL on preview deploys.

To add:

- `NEXT_PUBLIC_APP_URL` — public origin used for `metadataBase`, canonicals, sitemap and OG image URLs. Must be `https://edgecoms.com/academy`'s origin in production, not the Vercel deployment URL, or every canonical will point at the wrong host. Add to the currently empty client schema in `packages/env/src/web.ts`.

- `RESEND_API_KEY` — server only, required for access codes to send at all.
- `EMAIL_FROM` — the verified sender, for example `Edgecoms Academy <academy@edgecoms.com>`. Must be on a domain verified in Resend or nothing delivers.

Not needed in V1: any PostHog or Sentry variable. Tella needs no key; embeds are public by video id.

Vercel: set these per environment and sync with the existing `bun run env:preview` / `env:production` scripts. `.env` files never ship, `.vercelignore` already enforces that.

---

## P. Risks and open questions

**1. How is this mounted at `edgecoms.com/academy`?** Is this a separate Vercel project rewritten from the main site, a path in an existing Next.js app, or does it own the whole domain? Everything in section D assumes the first, with all routes namespaced under `/academy`. Getting this wrong means rewriting every internal link, every canonical, the sitemap and the auth callback URLs, so it is worth five minutes now. Related: what lives at `edgecoms.com/` today, and does the Academy own `/` in this deployment or redirect it?

**2. Resolved: emailed access codes replace passwords entirely.** See section F. Two consequences that need your input:

**2a. Which sending domain, and who can edit its DNS?** Resend needs SPF, DKIM and DMARC records on whatever domain `EMAIL_FROM` uses. This is the only task in the plan with an external wait, so it should be started before anything else in Phase 2. Recommendation: a subdomain such as `academy.edgecoms.com`, so a deliverability problem in the Academy can never damage the reputation of the domain your client work sends from.

**2b. Deliverability is now the single biggest risk in the product.** If codes land in spam, signup conversion goes to zero and the failure is invisible to you, because the student simply leaves. Mitigations in the plan: verified domain with full DNS records, the code in the subject line so it is readable from the notification, a visible "check your spam folder" hint on the code screen, a resend button on a 45 second cooldown, and a support address on that screen. Worth deciding now whether you also want a Resend webhook writing bounces and complaints somewhere you will actually look.

**3. Are lessons gated behind login at all?** Requiring an account for free content is a real conversion cost, and it hides your best content from search. The middle path is to leave the first lesson of Module 01 public as a sample, gate the rest, and index the public one. Cheap to build if decided now, awkward to retrofit into the route groups later.

**4. One course with three modules, or three courses?** Your sidebar sketch shows one course containing Module 01 / 02 / 03, while the dashboard section says "show the three modules/courses". This plan assumes one course, three modules, matching the sidebar and the "Build your Shopify business from zero" positioning. Three separate courses would change progress from one bar to three and change the dashboard from one continue card to a course grid.

**5. Tella specifics.** What does an embed URL look like for your videos, are they public or link-restricted, does Tella expose thumbnails and durations through an API or must poster images and durations be entered by hand into the content files, and do the chapter timestamps in the reference screenshot come from Tella or would we author them? The answer decides whether Phase 4's facade uses real posters or generated title cards.

**6. Remove tRPC?** Section B argues yes. If a mobile app or a public API is on the roadmap within the year, say so and it stays.

**7. Content in git or in the database?** Section A argues git. This is the largest architectural decision in the plan and the one I would most like confirmed before Phase 1.

**8. Should completing a lesson require anything?** The plan lets a student mark any lesson complete at any time. If completion is ever meant to gate a certificate, that becomes a trust problem, and the honest fix is a quiz rather than fake watch tracking.

**9. Brand assets.** Logo, wordmark, and whether the Academy inherits Edgecoms brand colours or stays neutral. Phase 0 sets the tokens and everything inherits them, so a colour decision after Phase 4 means touching every page.

**10. What else goes on the access form?** Name and email is the minimum and the highest converting. Better Auth will carry extra fields onto the user row in the same request at no cost, so questions like "do you have a store yet" are cheap to add technically. They are not cheap in conversion. Recommendation: two fields before the code, and anything else asked once, after access is granted, where abandoning it costs you nothing.

**11. Real curriculum copy.** The lesson lists are described as provisional. Slugs are effectively permanent once shipped, so it is worth getting the final lesson list and slugs before Phase 3 publishes a sitemap.
