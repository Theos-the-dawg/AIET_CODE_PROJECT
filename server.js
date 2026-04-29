const express = require('express');
const port = 4000;
const app = express()

app.listen(port,(req,res) =>{
    console.log(`running on 127.0.0.1:${port}`)
})