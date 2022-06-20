const express = require('express');
const router = express.Router()

const Yves = require('../models/yve');

router.get('/', (req, res) => {
    console.log('get yves loading...')
    Yves.find({"createdAt":{$gt:new Date(Date.now() - 24*60*60 * 1000)}})
        .then(resp => res.json(resp))
        .catch(err => console.log(err))
})

router.post('/', (req, res) => {
    const {temp, pulse_rate, blood_oxygen} = req.body;
    const newYve = new Yves({
        temp: temp,
        pulse_rate: pulse_rate,
        blood_oxygen: blood_oxygen
    })
    newYve.save()
        .then(() => {
            return res.status(201).json({
                message: "Yve logged successfully"
            })
        })
        .catch(err => {
            return res.status(400).json({
                "error": err,
                "message": "Error logging Yve"
            })
        })
})

module.exports = router