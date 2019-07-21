
# Weizhen's To-Do List

Weizhen's To-Do List is an application built with jQuery and can be used to track my coding tasks.

## FEATURE

With this app, user will be able to:

- Add new todo from input field to the list and to database
- Delete a todo from the list and from database
- Toggle the complete button:
  - set a task to complete
  - reset the status to incomplete
- Bootstrap modal alert to confirm the delete action
- Warning in case of empty input or input longer than 128 characters (length of the field name in postgres)
- Enter and show due date
- Display by ascending or descending order
- Display filtered by due date
- Warning in case the required due date is not entered
- If a task is overdue and not completed, show color red

## DATABASE SETUP

Create a new database with the name `weekend-to-do-app`. And run the sql from the database file.

## INSTALL AND RUN

  ```
  npm install
  npm start
  ```
## BUILT WITH

- jQuery for front end
- Node.js / Express for backend
- bootstrap for styling
- PostgreSQL for database


