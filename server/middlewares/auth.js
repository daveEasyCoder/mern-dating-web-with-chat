import jwt from 'jsonwebtoken'
import User from '../Model/user.js';
export const authUser = async (req,res,next) => {
  
  const token = req.cookies.token
 
  if(!token){
    console.log("token not found");
    return res.status(401).json({success:false,message:"token not found!"})
  }

  try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    const user = await User.findById(decoded.id)
    if(!user){
        console.log("user not found");
        return res.status(401).json({success:false,message:"user not found."})
    }
    req.id = user._id
    next()

  } catch (error) {
     console.error("Error to verify user:", error);
     return res.status(401).json({success:false, message: "Error to verify user"});
  }
}