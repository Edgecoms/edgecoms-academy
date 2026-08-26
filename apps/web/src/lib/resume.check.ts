import assert from "node:assert/strict";

import { getAllLessons } from "@/content/registry";

import { selectResumeTarget } from "./resume";

const COURSE = "shopify-ecommerce";
const sequence = getAllLessons(COURSE);
const slugAt = (index: number) => sequence[index]?.lesson.slug;

function noProgressStartsAtTheBeginning() {
	const target = selectResumeTarget(sequence, undefined, new Set());
	assert.ok(target);
	assert.equal(target.lesson.slug, slugAt(0));
}

function anUnfinishedLessonResumesItself() {
	const target = selectResumeTarget(
		sequence,
		{ completed: false, lessonSlug: slugAt(4) ?? "" },
		new Set()
	);
	assert.ok(target);
	assert.equal(target.lesson.slug, slugAt(4));
}

function afinishedLessonAdvancesToTheNextOne() {
	const completed = new Set([slugAt(0) ?? ""]);
	const target = selectResumeTarget(
		sequence,
		{ completed: true, lessonSlug: slugAt(0) ?? "" },
		completed
	);
	assert.ok(target);
	assert.equal(target.lesson.slug, slugAt(1));
}

function itNeverSendsYouBackToSomethingAlreadyDone() {
	const completed = new Set([slugAt(0) ?? "", slugAt(1) ?? ""]);
	const target = selectResumeTarget(
		sequence,
		{ completed: true, lessonSlug: slugAt(0) ?? "" },
		completed
	);
	assert.ok(target);
	assert.equal(
		target.lesson.slug,
		slugAt(2),
		"should skip past the already completed next"
	);
}

function finishingTheLastLessonFallsBackToAnyGap() {
	const completed = new Set(sequence.map((entry) => entry.lesson.slug));
	completed.delete(slugAt(3) ?? "");
	const target = selectResumeTarget(
		sequence,
		{ completed: true, lessonSlug: slugAt(sequence.length - 1) ?? "" },
		completed
	);
	assert.ok(target);
	assert.equal(
		target.lesson.slug,
		slugAt(3),
		"should return to the one lesson still missing"
	);
}

function afullyCompletedCourseHasNoTarget() {
	const completed = new Set(sequence.map((entry) => entry.lesson.slug));
	const target = selectResumeTarget(
		sequence,
		{ completed: true, lessonSlug: slugAt(sequence.length - 1) ?? "" },
		completed
	);
	assert.equal(target, undefined);
}

function aStaleSlugFallsBackToTheFirstGap() {
	const target = selectResumeTarget(
		sequence,
		{ completed: true, lessonSlug: "lesson-that-was-deleted" },
		new Set([slugAt(0) ?? ""])
	);
	assert.ok(target);
	assert.equal(target.lesson.slug, slugAt(1));
}

const checks = [
	noProgressStartsAtTheBeginning,
	anUnfinishedLessonResumesItself,
	afinishedLessonAdvancesToTheNextOne,
	itNeverSendsYouBackToSomethingAlreadyDone,
	finishingTheLastLessonFallsBackToAnyGap,
	afullyCompletedCourseHasNoTarget,
	aStaleSlugFallsBackToTheFirstGap,
];

for (const check of checks) {
	check();
}

process.stdout.write(
	`resume ok: ${checks.length} cases over ${sequence.length} lessons\n`
);
