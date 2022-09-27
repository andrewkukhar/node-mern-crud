const express = require('express')
const apiRoutes = express.Router()
const mdb = require('../db/connect')
const ObjectId = require('mongodb').ObjectId

apiRoutes.route('/api').get((req, res) => {
    let db_connect = mdb.getDb('users')
    db_connect
        .collection('users')
        .find({})
        .toArray((err, result) => {
            if (err) throw err
            res.json(result)
        })
})

apiRoutes.route('/api/:id').get((req, res) => {
    let db_connect = mdb.getDb()
    let myquery = { _id: ObjectId(req.params.id) }
    db_connect
        .collection('users')
        .findOne(myquery, (err, result) => {
            if (err) throw err
            res.json(result)
        })
})

apiRoutes.route('/api/add').post((req, response) => {
    let db_connect = mdb.getDb()
    let myobj = {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level
    }
    db_connect.collection('users').insertOne(myobj, (err, res) => {
        if (err) throw err
        response.json(res)
    })
})

apiRoutes.route('/update/:id').post((req, response) => {
    let db_connect = mdb.getDb()
    let myquery = { _id: ObjectId(req.params.id) }
    let newValues = {
        $set: {
            name: req.body.name,
            position: req.body.position,
            level: req.body.level
        }
    }
    db_connect
        .collection('users')
        .updateOne(myquery, newValues, (err, res) => {
            if (err) throw err
            console.log("1 document updated")
            response.json(res)
        })
})
apiRoutes.route('/:id').delete((req, response) => {
    let db_connect = mdb.getDb()
    let myquery = { _id: ObjectId(req.params.id) }
    db_connect
        .collection('users')
        .deleteOne(myquery, (err, obj) => {
            if (err) throw err
            console.log("1 document deleted")
            response.json(obj)
        })
})

module.exports = apiRoutes;