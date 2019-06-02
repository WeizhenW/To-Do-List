const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pg = require('pg');
const Pool = pg.Pool;

const PORT = 5000;

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('server/public'));

const config = {
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: 5432
};

const pool = new Pool(config);

//get route to retrieve all the tasks from database, order by id, and send back to client
app.get('/tasks', (req, res) => {
    pool.query(`SELECT * FROM "tasks" ORDER BY "id" ${req.query.order};
    `).then(
        result => {
            res.send(result.rows);
        }
    ).catch(
        error => {
            console.log('error with get route', error);
            res.sendStatus(500);
        }
    )
})

//post route to get new task from client and insert to database
app.post('/tasks', (req, res) => {
    pool.query(`
    INSERT INTO "tasks" ("task", "is_completed", "due_date")
    VALUES ($1, false, $2);`, [req.body.task, req.body.due_date])
    .then(
        () => {
            res.sendStatus(200);
        }
    ).catch(
        error => {
            console.log('error with post route', error);
            res.sendStatus(500);
        }
    )
})

//put route to update the task status for a specific task
app.put('/tasks/:id', (req, res) => {
    pool.query(`
    UPDATE "tasks" SET "is_completed"=$1 WHERE "id"=$2;`, [req.body.is_completed, req.params.id])
    .then(
        () => {
            res.sendStatus(200);
        }
    ).catch(
        error => {
            console.log('error with update', error);
            res.sendStatus(500);
        }
    )
})

//delete route to delete a task from database
app.delete('/tasks/:id', (req, res) => {
    pool.query(`
    DELETE FROM "tasks" WHERE "id" = $1;`, 
    [req.params.id])
    .then(
        () => {
            res.sendStatus(200);
        }
    ).catch(
        error => {
            console.log('error with delete', error);
            res.sendStatus(500);
        }
    )
})

//get route to retrieve the tasks from database filtered by due date and order by id either asc or desc
app.get('/tasks/filter', (req, res) => {  
    pool.query(`SELECT * FROM "tasks" WHERE "due_date" = '${req.query.duedate}' ORDER BY "id" ${req.query.order};
    `).then(
        result => {
            res.send(result.rows);
        }
    ).catch(
        error => {
            console.log('error with get route', error);
            res.sendStatus(500);
        }
    )
})

//server running
app.listen(PORT, () => {
    console.log('server running on', PORT);
})