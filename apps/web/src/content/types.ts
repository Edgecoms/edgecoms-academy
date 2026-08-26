export interface LessonVideo {
	id: string;
	poster?: string;
	provider: "tella";
}

export interface LessonResource {
	href: string;
	kind: "link" | "download" | "template";
	label: string;
}

export interface LessonChapter {
	at: string;
	label: string;
}

export interface Lesson {
	body?: string[];
	chapters?: LessonChapter[];
	durationSeconds?: number;
	resources?: LessonResource[];
	slug: string;
	summary: string;
	takeaways?: string[];
	title: string;
	video?: LessonVideo;
}

export interface CourseModule {
	blurb: string;
	lessons: Lesson[];
	number: string;
	slug: string;
	title: string;
}

export interface Course {
	description: string;
	modules: CourseModule[];
	slug: string;
	tagline: string;
	title: string;
}
