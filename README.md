# Edgecoms Academy

Free, practical ecommerce education. Build your Shopify business from zero.

The implementation plan lives in [docs/PLAN.md](docs/PLAN.md). Read it before adding features.

## Stack

- **Next.js 16** App Router, React 19, React Compiler
- **TypeScript** across every package
- **Tailwind CSS v4** with tokens in `packages/ui/src/styles/globals.css`
- **shadcn/ui** primitives on Base UI, shared through `packages/ui`
- **Drizzle ORM** on **PostgreSQL** (Neon in production)
- **Better Auth** with emailed access codes, no passwords
- **Biome / Ultracite** for linting and formatting
- **Turborepo** with Bun workspaces

Data is read in Server Components and written through Server Actions. There is no
client data-fetching layer.

## Local setup

Install dependencies:

```bash
bun install
```

Copy `apps/web/.env.example` to `apps/web/.env` and fill in `BETTER_AUTH_SECRET`.

Start Postgres and the local mail catcher:

```bash
bun run db:start
```

Apply migrations, then run the app:

```bash
bun run db:migrate
```

```bash
bun run dev
```

- App: [http://localhost:3001](http://localhost:3001)
- Inbox: [http://localhost:8025](http://localhost:8025)

## Access codes and email

There are no passwords. A student enters a name and email, we email a six digit
code, and verifying it both creates the account and signs them in.

Delivery has two transports, picked by `EMAIL_TRANSPORT`:

- `smtp` sends to the Mailpit container. Every code lands at
  [http://localhost:8025](http://localhost:8025), nothing leaves the machine.
- `resend` sends for real and needs `RESEND_API_KEY` plus an `EMAIL_FROM` on a
  domain verified in Resend.

Unset, it defaults to `smtp` outside production and `resend` in production, so
local development needs no email configuration.

## UI Customization

React web apps in this stack share shadcn/ui primitives through `packages/ui`.

- Change design tokens and global styles in `packages/ui/src/styles/globals.css`
- Update shared primitives in `packages/ui/src/components/*`
- Adjust shadcn aliases or style config in `packages/ui/components.json` and `apps/web/components.json`

### Add more shared components

Run this from the project root to add more primitives to the shared UI package:

```bash
bunx shadcn@latest add dialog popover table -c packages/ui
```

Import shared components like this:

```tsx
import { Button } from "@edgecoms-academy/ui/components/button";
```

### Add app-specific blocks

If you want to add app-specific blocks instead of shared primitives, run the shadcn CLI from `apps/web`.

## Deployment

### Vercel Services

- Target: web
- Config: `vercel.json`
- Link the project first: bun run deploy:setup
- Local Vercel dev: bun run dev:vercel
- Sync preview env: bun run env:preview
- Sync production env: bun run env:production
- Dry-run check (no upload): bun run deploy:check
- Preview deploy: bun run deploy
- Production deploy: bun run deploy:prod
  Vercel Services share project environment variables, but deploys do not upload local `.env` files automatically. Link the project with `vercel link`, then run the env sync command before your first deploy (otherwise the deployment starts with no env vars), or pass one-off envs with `vercel deploy -e KEY=value`.
  Pass Vercel CLI flags to the env sync command directly, for example: `bun run env:production --scope your-team`.

For more details, see the guide on [Deploying to Vercel](https://www.better-t-stack.dev/docs/guides/vercel).

## Git Hooks and Formatting

- Run checks: `bun run check`

## Project Structure

```
edgecoms-academy/
├── apps/
│   └── web/         # Next.js application
├── packages/
│   ├── ui/          # Shared shadcn/ui components, design tokens
│   ├── auth/        # Better Auth config, email transport, templates
│   ├── db/          # Drizzle schema, migrations, connection
│   ├── env/         # Validated environment variables
│   └── config/      # Shared tsconfig
```

## Available Scripts

- `bun run dev`: Start all applications in development mode
- `bun run build`: Build all applications
- `bun run dev:web`: Start only the web application
- `bun run check-types`: Check TypeScript types across all apps
- `bun run db:start`: Start Postgres and Mailpit
- `bun run db:stop`: Stop them
- `bun run db:generate`: Generate a migration from schema changes
- `bun run db:migrate`: Apply pending migrations
- `bun run db:studio`: Open database studio UI
- `bun run check`: Run Biome formatting and linting
- `bun run fix`: Apply Biome autofixes
- `bun run deploy:setup`: Link this repo to a Vercel project (first-time setup)
- `bun run dev:vercel`: Run the Vercel Services dev environment locally
- `bun run env:preview`: Sync local env files to the Vercel preview environment
- `bun run env:production`: Sync local env files to the Vercel production environment
- `bun run deploy`: Create a Vercel preview deployment
- `bun run deploy:prod`: Deploy to Vercel production
- `bun run deploy:check`: Dry-run a deploy to preview framework detection and included files without uploading
