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

//get route to retrieve all the tasks from database, and send back to client
app.get('/tasks', (req, res) => {
    pool.query(`SELECT * FROM "tasks" ORDER BY "id";
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
    INSERT INTO "tasks" ("task", "is_completed")
    VALUES ($1, false);`, [req.body.task])
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

//put route to update the complete status
app.put('/tasks/:id', (req, res) => {
    pool.query(`
    UPDATE "tasks" SET "is_completed"=true WHERE "id"=$1;`, [req.params.id])
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

//server running
app.listen(PORT, () => {
    console.log('server running on', PORT);
})