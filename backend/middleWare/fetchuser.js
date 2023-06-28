var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Harryisagoodboy';

const fetchuser = (req,res,next)=>{
    //getting user for its token login required
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"please enter valid details"})
    }
    try{
        const data = jwt.verify(token,JWT_SECRET);
        req.user =data.user;
        next()
    }
    catch(error){
        res.status(401).send({error:"please enter valid details"})
    }
}

module.exports = fetchuser