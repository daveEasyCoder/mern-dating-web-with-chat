import User from '../Model/user.js'
import bcrypt from 'bcrypt';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { sendVerificationEmail } from '../config/sendMail.js';

export const registerUser = async (req, res) => {
   
    const {fullname, email, password} = req.body
    if(!fullname) return res.status(400).json({message: "FullName is required"})
    if(!email) return res.status(400).json({message: "Email is required"})
    if(!password) return res.status(400).json({message: "Password is required"})
    if(password.length < 6) return res.status(400).json({message: "Password length must be at least 6 characters"})
    if(!validator.isEmail(email)) return res.status(400).json({message: "Invalid email format"})

    try {
        const normalizedEmail = validator.normalizeEmail(email);

        const existingUser = await User.findOne({ email:normalizedEmail });
        if(existingUser){
            console.log("User already exists");
            return res.status(400).json({success:false,message: "User already exists"});  
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User ({
            fullname,
            email,
            password: hashedPassword,
        })
 
        const user = {
            id: newUser._id,
            fullname: newUser.fullname,
            email: newUser.email,
        }
        await newUser.save();
        // generate token for email verification
        const token = jwt.sign(
            {id:newUser._id},
            process.env.JWT_EMAIL_SECRET,
            {expiresIn:'1d'}
        )

          const baseUrl = process.env.BASE_URL || 'http://localhost:5173'
          const link = `${baseUrl}/verify-email/${token}`;
          const subject = "Email Verification Matching App"
          const html =  `
            <h3>Email Verification</h3>
            <p>Click the link below to verify your email:</p>
           <p><a href='${link}' style="color: blue;">Verify Email</a></p>
        `
       await sendVerificationEmail(email,subject, html);
     
        return res.status(201).json({success:true,message: "User registered successfully", user});

    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({message: "Internal server error"});
        
    }
}

export const loginUser = async (req, res) => {
    const {email, password} = req.body
    if(!email) return res.status(400).json({message: "Email is required"})
    if(!validator.isEmail(email)) return res.status(400).json({message: "Invalid email format"})
    if(!password) return res.status(400).json({message: "Password is required"})

    try {
        const normalizedEmail = validator.normalizeEmail(email);
        const user = await User.findOne({ email:normalizedEmail })
        if(!user){
            console.log("User not found");
            return res.status(404).json({success:false,message: "User not found"});  
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            console.log("Invalid password");
            return res.status(400).json({success:false,message: "Invalid password"});  
        }
        if(!user.isVerified){
             // generate token for email verification
           const emailToken = jwt.sign(
                {id:user._id},
                process.env.JWT_EMAIL_SECRET,
                {expiresIn:'1d'}
            )
            const baseUrl = process.env.BASE_URL || 'http://localhost:5173'
            const link = `${baseUrl}/verify-email/${emailToken}`;
            const subject = "Email Verification Matching App"
            const html =  `
                <h3>Email Verification</h3>
                <p>Click the link below to verify your email:</p>
            <p><a href='${link}' style="color: blue;">Verify Email</a></p>
            `
            await sendVerificationEmail(email,subject, html);
            return res.status(400).json({success:false,message: "Please verify your email to login"});
        }
        const userData = {
            id: user._id,
            fullname: user.fullname,
            email: user.email,
            gender:user.gender
        }
      
        // generate a token
        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is not defined in environment variables");
            return res.status(500).json({success:false, message: "Server configuration error" });
        }
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1hr' });
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production',sameSite: 'Strict' });

        return res.status(200).json({success:true,message: "User logged in successfully", user:userData});

    } catch (error) {
        console.error("Error logging in user:", error);
        return res.status(500).json({success:false, message: "Internal server error"});
    }
}


export const logout = async (req,res) => {
  try {
    res.cookie("token","")
    return res.status(200).json({success:true,message:"logged out successfully"})
  } catch (error) {
     console.error("Error logging out user:", error);
      return res.status(500).json({success:false, message: "Internal server error"});
  }
}


export const verifyEmail =async(req,res) => {
 
    try {
        const token = req.params.token
        if(!token){
            console.log("token not found");
            return res.status(400).json({success:false,message:"token not found"})
        }
        const decoded = jwt.verify(token,process.env.JWT_EMAIL_SECRET)
        const user = await User.findById(decoded.id)
        if(!user){
            console.log("user not found");
            return res.status(400).json({success:false,message:"user not found"})
        }

        user.isVerified = true
        user.save()
        return res.status(200).json({success:true,message:"Email verified successfully"})
 
    } catch (error) {
        console.error("Error logging in user:", error);
        return res.status(500).json({success:false, message: "Internal server error"});
    }
}


export const createOrUpdateProfile = async (req, res) => {
  try {
    const userId = req.id
    const { fullname, lookingFor, age, height, skinColor, job, bio, location,gender } = req.body;
    if (!userId) {
       return res.status(400).json({ success: false, message: "User not found" });
    }
    if (!fullname || !lookingFor || !age || !height || !skinColor || !job || !bio || !location) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }
     const hobbies = JSON.parse(req.body.hobbies || "[]");
     
    const user = await User.findById(userId);
    if(!user){
      console.log("User not found");
      return res.status(400).json({success:false,message:"User not found"})
    }
    let image = user.profilePicture
    if(req.file){
        image = req.file.filename
    }

     const updatedUser = await User.findByIdAndUpdate(
         userId,
        { fullname, lookingFor, age, height, skinColor, job, bio, location, gender,profilePicture:image,hobbies},
        { new: true }
      );
      if(!updatedUser){
        console.log("User not found");
        return res.status(400).json({success:false,message:"User not found"})
     }

      await updatedUser.save()

    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ success: false, message: "Server error", error });
  }
};




export const getProfile = async (req, res) => {
  try {
    
    const userId = req.id;

    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


export const getAllUser = async (req,res) => {
  try {
    const user = await User.find({}).select("-password")
    return res.status(200).json({success:true,user})
  } catch (error) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

export const likeUser = async (req,res) => {
  try {
    const {id} = req.body
    const userId = req.id
  
       // Validate ObjectId
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid user id." });
    }
    if(id.toString() === userId.toString()){
      return res.status(400).json({success:false,message:"You cannot like yourself."})
    }

    const likedUser = await User.findById(id)
    let msg;
    if(!likedUser){
      console.log("This user not found ");
      return res.status(400).json({success:false,message:"This user not found!"})
    }
    if(likedUser.likedBy.map(uid => uid.toString()).includes(userId.toString())){
      await User.findByIdAndUpdate(id, { $pull: { likedBy: userId } });
      msg = "User Unliked successfully"
    }else{
      await User.findByIdAndUpdate(id, { $addToSet: { likedBy: userId } });
      msg = "User Liked successfully"
    }
   
    // await likedUser.save()

    const users = await User.find({}).select("-password")

    return res.status(200).json({success:true,users,msg})
    
  } catch (error) {
     console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server error' });
  }
}

export const getSinglePerson = async (req,res) => {
 try {
    const {id} = req.params
    const user = await User.findById(id).select("-password")
    if(!user){
      console.log("This user not found ");
      return res.status(400).json({success:false,message:"This user not found!"})
    }

    return res.status(200).json({success:true,user})

 } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server error' });
 }
}


export const uploadImage = async (req,res) => {
 try {
    const userId = req.id
    const image = req.file
    if(!image){
      console.log("image requireD");
      return res.status(400).json({success:false,message:"Image required"})
    }

    const user = await User.findById(userId).select("-password")
    user.photos.push(image.filename)
    await user.save()
    
    return res.status(200).json({success:true, user})

 } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server error' });
 }
}