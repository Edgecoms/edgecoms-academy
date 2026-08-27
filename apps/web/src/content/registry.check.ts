import assert from "node:assert/strict";

import { hasLessonIcon, lessonIcon } from "../components/academy/lesson-icon";
import {
	getAllLessons,
	getCourse,
	getCourses,
	getCourseTotals,
	getLesson,
	getLessonNeighbours,
} from "./registry";

const COURSE = "shopify-ecommerce";

function totalsMatchTheCurriculum() {
	for (const course of getCourses()) {
		const lessons = getAllLessons(course.slug);
		assert.ok(lessons.length > 0, `${course.slug} has no lessons`);
		assert.deepEqual(getCourseTotals(course.slug), {
			lessons: lessons.length,
			modules: course.modules.length,
		});
	}
}

const TELLA_ID = /^vid_[a-z0-9]+$/;

function everyLessonHasItsOwnTellaVideo() {
	const ids = new Set<string>();

	for (const course of getCourses()) {
		for (const {
			lesson: { slug, video },
		} of getAllLessons(course.slug)) {
			assert.ok(video, `${slug} has no video`);
			assert.match(video.id, TELLA_ID, `${slug} has a bad Tella id`);
			assert.ok(!ids.has(video.id), `${video.id} is used by two lessons`);
			ids.add(video.id);
		}
	}
}

function lessonSlugsAreUniqueWithinACourse() {
	for (const course of getCourses()) {
		const slugs = getAllLessons(course.slug).map((entry) => entry.lesson.slug);
		assert.equal(
			new Set(slugs).size,
			slugs.length,
			`${course.slug} has duplicate lesson slugs`
		);
	}
}

function lessonsFollowModuleOrder() {
	const lessons = getAllLessons(COURSE);

	for (const [position, entry] of lessons.entries()) {
		assert.equal(entry.index, position);
		assert.equal(getLesson(COURSE, entry.lesson.slug), entry);
	}

	const declared =
		getCourse(COURSE)?.modules.map((module) => module.slug) ?? [];
	const walked = [...new Set(lessons.map((entry) => entry.module.slug))];
	assert.deepEqual(walked, declared);
}

function neighboursLinkTheSequenceAndStopAtBothEnds() {
	const lessons = getAllLessons(COURSE);
	const first = lessons.at(0)?.lesson.slug ?? "";
	const last = lessons.at(-1)?.lesson.slug ?? "";

	assert.equal(getLessonNeighbours(COURSE, first).previous, undefined);
	assert.equal(getLessonNeighbours(COURSE, last).next, undefined);

	for (const [position, entry] of lessons.entries()) {
		const { previous, next } = getLessonNeighbours(COURSE, entry.lesson.slug);
		assert.equal(previous?.lesson.slug, lessons[position - 1]?.lesson.slug);
		assert.equal(next?.lesson.slug, lessons[position + 1]?.lesson.slug);
	}
}

function unknownSlugsResolveToNothing() {
	assert.equal(getCourse("nope"), undefined);
	assert.equal(getLesson(COURSE, "nope"), undefined);
	assert.equal(getLesson("nope", "introduction"), undefined);
	assert.deepEqual(getAllLessons("nope"), []);
	assert.deepEqual(getCourseTotals("nope"), { lessons: 0, modules: 0 });
	assert.deepEqual(getLessonNeighbours("nope", "introduction"), {
		next: undefined,
		previous: undefined,
	});
}

function everyLessonHasItsOwnIcon() {
	const seen = new Map<unknown, string>();

	for (const course of getCourses()) {
		for (const {
			lesson: { slug },
		} of getAllLessons(course.slug)) {
			assert.ok(hasLessonIcon(slug), `${slug} has no mapped icon`);

			const icon = lessonIcon(slug);
			const owner = seen.get(icon);
			assert.ok(!owner, `${slug} reuses the icon already used by ${owner}`);
			seen.set(icon, slug);
		}
	}
}

const CHAPTER_AT = /^\d{1,2}:[0-5]\d$/;

function chapterMarksAreWellFormedAndAscending() {
	for (const course of getCourses()) {
		for (const {
			lesson: { slug, chapters },
		} of getAllLessons(course.slug)) {
			if (!chapters?.length) {
				continue;
			}

			let previous = -1;
			for (const chapter of chapters) {
				assert.match(chapter.at, CHAPTER_AT, `${slug} has a bad mark`);
				const [minutes, seconds] = chapter.at.split(":").map(Number);
				const at = (minutes ?? 0) * 60 + (seconds ?? 0);
				assert.ok(
					at > previous,
					`${slug} marks are out of order at ${chapter.at}`
				);
				previous = at;
			}
		}
	}
}

const checks = [
	totalsMatchTheCurriculum,
	everyLessonHasItsOwnTellaVideo,
	everyLessonHasItsOwnIcon,
	chapterMarksAreWellFormedAndAscending,
	lessonSlugsAreUniqueWithinACourse,
	lessonsFollowModuleOrder,
	neighboursLinkTheSequenceAndStopAtBothEnds,
	unknownSlugsResolveToNothing,
];

for (const check of checks) {
	check();
}

const totals = getCourseTotals(COURSE);
process.stdout.write(
	`content ok: ${getCourses().length} course, ${totals.modules} modules, ${totals.lessons} lessons\n`
);
