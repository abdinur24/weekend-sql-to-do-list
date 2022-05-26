const express = require('express');
const listRouter = express.Router();

const pool = require('../modules/pool');

// GET
listRouter.get('/', (req,res) => {
    console.log('In /list GET');
    const query = `SELECT * FROM "list";`
    pool.query(query)
    .then(result => {
        console.log(result.rows);
        res.send(result.rows);
    }).catch(error => {
        console.log('Error doing a SELECT of list', error)
        res.sendStatus(500);
    })
})


// POST
listRouter.post('/', (req, res) => {
    const newList = req.body;
    console.log('New list is', newList);
    const query = `INSERT INTO "list" ("task", "complete") VALUES ($1, $2);`
    pool.query(query, [newList.task, newList.complete])
        .then(() => {
            res.sendStatus(201)
        }).catch(error => {
            console.log('Error at INSERT list', error);
            res.sendStatus(500);
        })
});

// PUT
listRouter.put('/:id', (req, res) => {
    console.log(`PUT /list/`, req.params);
    const listId = req.params.id; 
    const query = `UPDATE "list" SET "complete" =  NOT "complete" WHERE id=$1`
    pool.query(query, [listId])
        .then(response => {
            res.sendStatus(204)
        }).catch(error => {
            console.log('Error at UPDATE list', error);
            res.sendStatus(500);
        });
})

// DELETE
listRouter.delete('/:id', (req, res) => {
    console.log(`DELETE /list/`, req.params);
    const listId = req.params.id; 
    const query = `DELETE FROM "list" WHERE id=$1;`
    pool.query(query, [listId])
        .then(response => {
            res.sendStatus(204)
        }).catch(error => {
            console.log('Error at DELETE list', error);
            res.sendStatus(500);
        });
})

module.exports = listRouter;