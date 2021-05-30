const express = require('express');
const app = express();  //initializing our app
const path = require('path');
const fs = require('fs');


const port = process.env.PORT ||80;

//EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static'));  //For serving static files
app.use(express.urlencoded()); //it helps us to get the submited data through express

//PUG SPEIFIC STUFF
app.set('view engine','pug'); //set the template engine as pug
app.set('views',path.join(__dirname,'views'));   //Set the views directory

//ENDPOINTS
app.get('/',(req,res)=>{
res.status(200).render('index.pug');
})

//START THE SERVER
app.listen(port,()=>{
    console.log(`Application has started at port ${port}`);
}) 
