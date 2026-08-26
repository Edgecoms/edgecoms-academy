import { shopifyEcommerce } from "./courses/shopify-ecommerce";
import type { Course, CourseModule, Lesson } from "./types";

const COURSES: Course[] = [shopifyEcommerce];

export interface LessonLocation {
	course: Course;
	index: number;
	lesson: Lesson;
	module: CourseModule;
}

export interface CourseTotals {
	lessons: number;
	modules: number;
}

function lessonKey(courseSlug: string, lessonSlug: string) {
	return `${courseSlug}/${lessonSlug}`;
}

function buildRegistry(courses: Course[]) {
	const bySlug = new Map<string, Course>();
	const lessons = new Map<string, LessonLocation>();
	const ordered = new Map<string, LessonLocation[]>();

	for (const course of courses) {
		if (bySlug.has(course.slug)) {
			throw new Error(`Duplicate course slug: ${course.slug}`);
		}
		bySlug.set(course.slug, course);

		const seenModules = new Set<string>();
		const sequence: LessonLocation[] = [];

		for (const module of course.modules) {
			if (seenModules.has(module.slug)) {
				throw new Error(
					`Duplicate module slug in ${course.slug}: ${module.slug}`
				);
			}
			seenModules.add(module.slug);

			for (const lesson of module.lessons) {
				const key = lessonKey(course.slug, lesson.slug);
				if (lessons.has(key)) {
					throw new Error(
						`Duplicate lesson slug in ${course.slug}: ${lesson.slug}`
					);
				}
				const location: LessonLocation = {
					course,
					index: sequence.length,
					lesson,
					module,
				};
				lessons.set(key, location);
				sequence.push(location);
			}
		}

		ordered.set(course.slug, sequence);
	}

	return { bySlug, lessons, ordered };
}

const registry = buildRegistry(COURSES);

export function getCourses() {
	return COURSES;
}

export function getCourse(courseSlug: string) {
	return registry.bySlug.get(courseSlug);
}

export function getAllLessons(courseSlug: string) {
	return registry.ordered.get(courseSlug) ?? [];
}

export function getLesson(courseSlug: string, lessonSlug: string) {
	return registry.lessons.get(lessonKey(courseSlug, lessonSlug));
}

export function getLessonNeighbours(courseSlug: string, lessonSlug: string) {
	const current = getLesson(courseSlug, lessonSlug);
	if (!current) {
		return { next: undefined, previous: undefined };
	}

	const sequence = getAllLessons(courseSlug);
	return {
		next: sequence[current.index + 1],
		previous: sequence[current.index - 1],
	};
}

export function getCourseTotals(courseSlug: string): CourseTotals {
	const course = getCourse(courseSlug);
	return {
		lessons: getAllLessons(courseSlug).length,
		modules: course?.modules.length ?? 0,
	};
}
