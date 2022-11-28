const express = require('express');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const app = express();
const reminderRoute = require('./routes/reminders')
const DB_URL = "mongodb+srv://simbababu:yedhavapandu@cluster0.jsjjvan.mongodb.net/test";
const connectionParam = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(DB_URL, connectionParam)
    .then(() => {
            console.log("DB Connected");
    }).catch((e)=>{
        console.log("Error in DB connection  : " + e)
    })

const corsIssue = function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next()
}



app.use(express.json(), corsIssue);
app.use('/api/reminders',reminderRoute)

const NO_DATA_FOUND = {
    status: 404,
    msg: 'Data not found'
}

app.get('/', (req, res) => {
    res.send("Welcome to my nodejs application");
})

app.get('/api/welcomeNote', (req, res) => {
   try{
    let returnString = `Hi there..!, I am kiran Behara and I have 3 years of experience as an Angular Developer with a little bit java and Oracle knowledge, I like the MacOs interaface a lot, so I tried to develop my personal portfolio similar to Macos.

    Tech Stack :
    
    Angular
    Harper DB`
    res.send({ note: returnString })
   } catch(err){
    console.log("CATCH ERROR ===> " ,err)
   }
})




const port = process.env.PORT || 2111
app.listen(port, () => { console.log(`Server running & Listening on port number : ${port}`) })