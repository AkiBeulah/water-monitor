const express = require('express');
const router = express.Router()

const Ola = require('../models/ola');

router.get('/', (req, res) => {
    console.log('get olas loading...')
    Ola.find()
        .then(resp => res.json(resp))
        .catch(err => console.log(err))
})

router.post('/', (req, res) => {
    const {air_q, temp, hum} = req.body;
    const newOla = new Ola({
        air_q: air_q,
        temp: temp,
        hum: hum
    })
    newOla.save()
        .then(() => {
            return res.status(201).json({
                message: "Ola logged successfully"
            })
        })
        .catch(err => {
            return res.status(400).json({
                "error": err,
                "message": "Error logging Ola"
            })
        })
})

module.exports = router