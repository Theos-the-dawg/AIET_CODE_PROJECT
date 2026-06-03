const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema(
    {
        "id":{
            type:Number,
            required:true
        },

        "username":String,
        "email":String,
        "password":String,
        "isAdmin":Boolean,
        
        "regDate":{
            type:Object,
            required:true,
            default:new Date.now}

        
        }
)