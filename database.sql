CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR(128),
	"is_completed" BOOL,
	"due_date" DATE
	);
