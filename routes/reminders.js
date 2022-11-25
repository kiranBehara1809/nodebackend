const express = require('express');
const reminderModel = require('../models/reminders')
const router = express.Router()
const mongoose = require('mongoose');


router.get('', (req, res) => {
    try {
        const reminders = mongoose.model("reminders");
        reminders.find({}, (err, data) => {
            if (err) {
                return res.status(404).send(NO_DATA_FOUND)
            } else {
                return res.send(data)
            }
        })
    } catch (err) {
        console.log("ERROR BRO ==> ", err)
    }
})

router.get('/:id', (req, res) => {
    const reminders = mongoose.model("reminders");
    reminders.find({ _id: req.params.id }, (err, data) => {
        if (err) {
            return res.status(404).send(NO_DATA_FOUND)
        } else {
            return res.send(data)
        }
    })
})

router.post('/delete', (req, res) => {
    let API_STARTED = new Date();
    reminderModel.deleteOne({ _id: req.body._id }, (err, data) => {
        let API_ENDED = new Date();
        if (err) {
            console.log("ERROR WHILE DELETING =>", err);
            res.status(500).send({
                status: 500,
                msg: 'Error while deleting record',
                rootCause: err.message,
                timeTaken: Math.abs(API_STARTED.getTime() - API_ENDED.getTime()) / 1000
            })
        } else {
            res.send({
                status: 200,
                msg: 'Deleted Successfully',
                timeTaken: Math.abs(API_STARTED.getTime() - API_ENDED.getTime()) / 1000,
                _id: req.body._id,
                ...updateObject
            })
        }
    })
})

router.post('/update', (req, res) => {
    let API_STARTED = new Date();
    let updateObject = {}
    updateObject.title = req.body.title
    updateObject.description = req.body.description
    updateObject.date = req.body.date
    updateObject.time = req.body.time
    updateObject.showNotification = req.body.showNotification
    updateObject.__v = req.body.__v + 0.001
    reminderModel.updateOne({ _id: req.body._id }, { $set: { ...updateObject } }, (err, data) => {
        let API_ENDED = new Date();
        if (err) {
            console.log("ERROR WHILE UPDATING =>", err);
            res.status(500).send({
                status: 500,
                msg: 'Error while updating data',
                rootCause: err.message,
                timeTaken: Math.abs(API_STARTED.getTime() - API_ENDED.getTime()) / 1000
            })
        } else {
            res.send({
                status: 200,
                msg: 'Updated Successfully',
                timeTaken: Math.abs(API_STARTED.getTime() - API_ENDED.getTime()) / 1000,
                _id: req.body._id,
                ...updateObject
            })
        }
    })
})

router.post('', (req, res) => {
    const isUpdate = req.body._id ? true : false
    let API_STARTED = new Date();
    let reminder = new reminderModel();
    reminder.title = req.body.title
    reminder.description = req.body.description
    reminder.date = req.body.date
    reminder.time = req.body.time
    reminder.showNotification = req.body.showNotification
    reminder.save((err, data) => {
        let API_ENDED = new Date();
        if (err) {
            console.log("ERROR WHILE SAVING =>", err);
            res.status(500).send({
                status: 500,
                msg: 'Error while saving data',
                rootCause: err.message,
                timeTaken: Math.abs(API_STARTED.getTime() - API_ENDED.getTime()) / 1000
            })
        } else {
            res.send({
                status: 200,
                msg: 'Data saved Successfully',
                timeTaken: Math.abs(API_STARTED.getTime() - API_ENDED.getTime()) / 1000
            })
        }
    })
})

module.exports = router