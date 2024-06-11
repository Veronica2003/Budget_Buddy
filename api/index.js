const express = require('express');
const cors=require('cors');
require('dotenv').config();
const mongoose=require('mongoose');
const Transaction=require('./models/Transaction.js');
//const { default: mongoose } = require('mongoose');
const app=express();
app.use(express.json());

app.use(cors())
app.get('/api/test',(req,res)=>{
    res.send('Hello');
})
app.post('/api/transaction',async(req,res)=>{
    if (!req.body) {
        return res.status(400).json({ error: 'Invalid JSON input' });
    }
    
    await mongoose.connect(process.env.MONGO_URL);
    const {name,description,datetime,price}=req.body;
    const transaction=await Transaction.create({name,description,datetime,price});
    res.json(transaction);
})
app.get('/api/transactions',async (req,res)=>{
    await mongoose.connect(process.env.MONGO_URL);
    const transactions = await Transaction.find();
    res.json(transactions);
})
const port=4040
app.listen(port);
// username -: Paisa
// pswrd-: money123 