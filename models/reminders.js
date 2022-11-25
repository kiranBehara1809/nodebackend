const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
    title : {
        require : true,
        type : String,
        trim : false
    },
    description : {
        type : String,
    },
    date : {
        type : Date
    },
    time : {
        type : String
    },
    showNotification :{
        type : Boolean
    }
})

const reminderModel = mongoose.model('reminders', reminderSchema)

module.exports = reminderModel