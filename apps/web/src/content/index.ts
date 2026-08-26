import "server-only";

// biome-ignore lint/performance/noBarrelFile: this file exists to put the server-only guard in front of the registry
export {
	type CourseTotals,
	getAllLessons,
	getCourse,
	getCourses,
	getCourseTotals,
	getLesson,
	getLessonNeighbours,
	type LessonLocation,
} from "./registry";
export type {
	Course,
	CourseModule,
	Lesson,
	LessonChapter,
	LessonResource,
	LessonVideo,
} from "./types";
