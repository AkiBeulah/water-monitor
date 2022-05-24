const express = require('express');
const router = express.Router()

const Level = require('../models/waterLevel');

router.get('/', (req, res) => {
    console.log('get deets loading...')
    Level.find({"createdAt":{$gt:new Date(Date.now() - 24*60*60 * 1000)}})
        .then(resp => res.json(resp))
        .catch(err => console.log(err))
})

router.post('/', (req, res) => {
    const {value} = req.body;
    const newCh = new Level({
        value: value,
    })
    newCh.save()
        .then(() => {
            return res.status(201).json({
                message: "Level logged successfully"
            })
        })
        .catch(err => {
            return res.status(400).json({
                "error": err,
                "message": "Error logging Level"
            })
        })
})

module.exports = router