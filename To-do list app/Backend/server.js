const express = require('express');
const cors = require('cors')
const mongoose =require('mongoose')

const app = express();

app.use(express());
app.use(express.json())
app.use(cors())


const port = 8000;
app.listen(port, ()=>{
    console.log(`Server is running on ${port} `)
})