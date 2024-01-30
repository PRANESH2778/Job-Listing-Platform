const express = require('express');
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
router.get('/alluser',(req,res)=>{
    User.find({}).then((result)=>{
        res.json(result)
    }).catch((err)=>{
        res.json(err)
    })
})
router.post('/register',async (req,res)=>{
    try{
        const {name,email,mobile,password} = req.body;
        if(!name || !email || !mobile || !password){
            return res.status(400).json({
                errorMessage:"Bad Request"
            })
        }
        const isExistingUser = await User.findOne({email:email});
        if(isExistingUser){
            return res.status(409).json({message:"User already exists"})
        }
        const isExistingNumber = await User.findOne({mobile:mobile});
        if(isExistingNumber){
            return res.status(409).json({message:"User already exists"})
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const userData = new User({
            name,
            email,
            mobile,
            password:hashedPassword,
        });
        const userResponse = await userData.save();
        const token = await jwt.sign( 
            {userId:userResponse._id},
            process.env.JWT_SECRET)
        res.json({message:"User registered successfully", token: token,name:name})
    }catch(err){
        res.json({message:"error creating user"})
        console.log(err)
    }

});
router.post('/login',async (req,res)=>{
    try{
        const {email,password} = req.body
        if(!email || !password){
            return res.status(400).json({
                errorMessage:"Bad Request ! invalid login details"
            })
        }
        const userDetails = await User.findOne({email});
        if(!userDetails){
            return res.status(402).json({message:"invalid login details"})
        }
        //console.log(email)
        const passwordMatch = await bcrypt.compare(
            password,
            userDetails.password
        );
        //console.log(passwordMatch)
        if(!passwordMatch){
            console.log(passwordMatch)
            res.status(403).json({message:"invalid login details"})
        }
        const token = await jwt.sign( 
            {userId:userDetails._id},
            process.env.JWT_SECRET);
        res.json({message:"logged In successfully", token: token,name:userDetails.name,success:true})
    }catch(err){
            res.json({message:"error login user"})
            console.log(err) 
    }
})
module.exports = router
