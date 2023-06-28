const mongoose = require('mongoose');
const {Schema} = mongoose;


const NotesSchema = new mongoose.Schema({
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    
    
    title: {
        type:String,
        require:true
    },
    discription: {
        type:String,
        require:true,
        unique:true
    },
    tag: {
        type:String,
    },
    date: {
        type:Date,
        default:Date.now

    }

  });

module.exports = mongoose.model('1Notes',NotesSchema)