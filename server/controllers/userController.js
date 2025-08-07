import User from '../Model/user.js'
import bcrypt from 'bcrypt';
import validator from 'validator';

export const registerUser = async (req, res) => {
    const {fullname, email, password} = req.body
    if(!fullname) return res.status(400).json({message: "Name is required"})
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
        console.log("User registered successfully");
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
            return res.status(401).json({success:false,message: "Invalid password"});  
        }

        const userData = {
            id: user._id,
            fullname: user.fullname,
            email: user.email,
        }
        console.log("User logged in successfully");

        // generate a token
        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is not defined in environment variables");
            return res.status(500).json({success:false, message: "Server configuration error" });
        }
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production',sameSite: 'Strict' });

        return res.status(200).json({success:true,message: "User logged in successfully", user:userData});

    } catch (error) {
        console.error("Error logging in user:", error);
        return res.status(500).json({success:false, message: "Internal server error"});
    }
}