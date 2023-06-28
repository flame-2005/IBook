const express = require('express')
const router = express.Router();
const fetchuser = require('../middleWare/fetchuser');
const Note = require('../models/Notes');
const User = require('../models/User')
const { body, validationResult } = require('express-validator');


// route 1 getting all the notes logedin req
router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    try {
        const notes = await Note.find({user:'649701fe218365c57e66e0d4'})
        res.json(notes)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("some error occured")
    }    
    
})
// Getting details of user who has added the note
router.get('/fetchAuther',fetchuser,async (req,res)=>{
    try {
        const user = await User.find({user:req.params.id})
        res.json(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("some error occured")
    }    
    
})

//Route 2:addind new notes  using post login req
router.post('/addnotes',fetchuser,[
    body('title','tital must be at least 5 char').isLength({ min: 3 }),
    body('discription','dis must be at least 10 char').isLength({ min: 10 }),
],async(req,res)=>{

    try {
        
    const {title,discription,tag} = req.body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const note = new Note({
        title,discription,tag, user:'649701fe218365c57e66e0d4'
    })
    if(req.file){
        note.image= req.file.path
    }
    upload.single('image')
    const savedNotes = await note.save()
    res.json(savedNotes)
}catch (error) {
    console.error(error.message)
    res.status(500).send("some error occured")
} 
})
// Route 3 : Updating an existing note Login req
router.put('/updatenotes/:id',fetchuser,async(req,res)=>{
    const{title,discription,tag}= req.body
    // creating new note
    try {
        const newNote = {};
    if(title){newNote.title = title}
    if(discription){newNote.discription = discription}
    if(title){newNote.tag = tag}

    let note = await Note.findById(req.params.id);
    if(!note){
        return res.status(404).send("not Found")
    }
    if (note.user.toString() !== req.user.id){
        return res.status(401).send("not Allowed")

    }
    console.log('func called')
    note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json({note})
    } catch (error) {
        console.error(error.message)
        res.status(500).send("some error occured")
    }

    
})
// Route 4 : deleting an existing note Login req
router.delete('/deletenotes/:id',fetchuser,async(req,res)=>{
    try {
        let note = await Note.findById(req.params.id);
    if(!note){
        return res.status(404).send("not Found")
    }
    if (note.user.toString() !== req.user.id){
        return res.status(401).send("not Allowed")

    }

    note = await Note.findByIdAndDelete(req.params.id)
    res.json({"status":"success",note})
    } catch (error) {
        console.error(error.message)
        res.status(500).send("some error occured")
    } 
    
})

module.exports = router