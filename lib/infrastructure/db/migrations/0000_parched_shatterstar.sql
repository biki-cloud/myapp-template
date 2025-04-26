CREATE SCHEMA "myapp-template";
--> statement-breakpoint
CREATE TABLE "myapp-template"."tasks" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"is_done" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
