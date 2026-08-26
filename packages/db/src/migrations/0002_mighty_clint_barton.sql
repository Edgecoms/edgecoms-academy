CREATE TABLE "lesson_progress" (
	"user_id" text NOT NULL,
	"course_slug" text NOT NULL,
	"lesson_slug" text NOT NULL,
	"started_at" timestamp DEFAULT now() NOT NULL,
	"completed_at" timestamp,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "lesson_progress_user_id_course_slug_lesson_slug_pk" PRIMARY KEY("user_id","course_slug","lesson_slug")
);
--> statement-breakpoint
ALTER TABLE "lesson_progress" ADD CONSTRAINT "lesson_progress_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "lesson_progress_resume_idx" ON "lesson_progress" USING btree ("user_id","updated_at" DESC NULLS LAST);