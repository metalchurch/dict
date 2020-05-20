const express = require('express');
const {mongoose}=require('mongoose');
const bodyParser=require('body-parser');
const app=express();
const port=process.env.PORT||3000;
app.use(bodyParser.json());
module.exports=app;


app.post('/users/signup',(req,res)=>{
    var body=req.body;
    var user=new UserSchema(body);
    user.save().then(()=>{
        res.status(200).send();
    }).catch((e)=>{
    res.send(400).send(e);
    });
    
    });
    
    app.get('/users/data',(req,res)=>{
        Sale.find().then((data)=>{
            res.sataus(200).send(JSON.stringify(data.undefined,2))
        }).catch((e)=>{
            res.status(400).send(e);
        });
    
    })