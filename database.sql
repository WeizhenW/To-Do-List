CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR(128),
	"is_completed" BOOL
	);

ALTER TABLE "tasks" ADD COLUMN "due_date" DATE;