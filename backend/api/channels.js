const express = require('express');
const router = express.Router()

const Channel = require('../models/channel');

router.get('/', (req, res) => {
    console.log('get channels loading...')
    Channel.find()
        .then(resp => res.json(resp))
        .catch(err => console.log(err))
})

router.post('/', (req, res) => {
    const {name, value, state} = req.body;
    const newCh = new Channel({
        name: name,
        value: value,
        state: state
    })
    newCh.save()
        .then(() => {
            return res.status(201).json({
                message: "CH logged successfully"
            })
        })
        .catch(err => {
            return res.status(400).json({
                "error": err,
                "message": "Error logging CH"
            })
        })
})

router.patch('/', (req, res) => {
    const {id, name, value, state} = req.body
    console.log(req.body)
    Channel.findById(id, (err, ch) => {
        if (!ch) {
            return new Error('Could not load Document')
        } else {
            ch.name = name
            ch.value = value
            ch.state = state

            ch.save((err) => {
                if (err) console.log(err)
                else {
                    return Channel.find()
                        .then(channels => {
                            res.json(channels)
                        })
                        .catch(err => console.log(err))
                }
            })
        }
    })
})

module.exports = router