import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config.js";


export const register = async (req, res) => {

    const{username, email, password} = req.body;

    try{
        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json({message : 'User Already exists'});
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({username, email, password : hashPassword});
        res.status(201).json({message : 'user created', username : user.username});
    } catch(err){

        res.status(500).json({message : 'Internal server error'});
    }
};


export const login = async (req, res) =>{
    const {email, password} = req.body;

    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({message : 'Invalid Credentials'});
        }
        
        const isPasswordValid =  await bcrypt.compare(password, user.password);
        
        if(!isPasswordValid){
            return res.status(401).json({message : 'Invalid Credentials'});
        }
        
        const token = jwt.sign({userId : user._id}, jwtSecret);
        
        res.cookie('token', token, {
            httpOnly:true,
            secure: true,
            sameSite: 'None',
        }).status(200)
        .json({message : 'Login successful', username : user.username});
    }   
    catch(err){
        res.status(500).json({message : 'Internal server error'});
    }
};

export const logout = async(req, res) => {
    res.clearCookie('token').status(200).json({ message: 'Logged out' });
}

export const authme = async(req,res) =>{
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({ message: 'Not authenticated' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById({_id : decoded.userId});

        res.status(200).json({ username: user.username || 'user' });
      } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }
}