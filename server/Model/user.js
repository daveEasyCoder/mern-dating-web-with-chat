import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    gender:{type:String,default:''},
    age:{type:String,default:''},
    height:{type:String,default:''},
    skinColor:{type:String,default:''},
    job:{type:String,default:''},
    hobbies:{type:String,default:''},

    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    likedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    matches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

    bio: { type: String, default: '' }, 
    location: { type: String, default: '' },
    photos: [{ type: String }], // array of image URLs
    profilePicture: { type: String, default: '' }, // main profile image
    lookingFor: { type: String, default: '' }, // e.g., "Friendship", "Dating", "Marriage"

},{timestamps:true})

const User = mongoose.model('User', userSchema);

export default User;