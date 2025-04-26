import { UserAttributes, UserCreationAttributes } from "../database/models/user";
import { generateJwtToken, hashPassword, verifyPassword } from "../utils/user";
import { db } from "../database/models/index";
import { Request, Response } from "express";
import { ProfileAttributes } from "../database/models/userProfile";
import cloudinary from "../utils/cloudinary";

const User=db.User; 
const Profile=db.Profile

export async function userSignup(req:Request,res:Response) {
    const {
        username,
        email,
        password,
        userRole,
    } = req.body;

    const hashedPassword = await hashPassword(password);

    try {
        const user = await User.create({
            username: username, 
            email: email,
            password: hashedPassword,
            userRole: userRole
        });
        const userProfile=await Profile.create({
            userName:username,
            telephone:'',
            profileImage:'',
            address:'',
            bio:'',
            userId:user.id
        }as ProfileAttributes)

        const token = await generateJwtToken(user, user.id);
        
        res.status(201).json({ user, token,message:"Account created successfully!" });
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Internal server error"});
    }
}

export async function userLogin(req:Request,res:Response) {
    try{
        const {username,password}=req.body;

        const user=await User.findOne({where:{username:username}})
    
        if(!user){
            return res.status(400).json({message:"User not found! Create an account"})
        }
    
        const isPasswordCorrect= await verifyPassword(password,user.password)
    
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid password or userName! Try again "})
        }
    
        const token=await generateJwtToken(user,user.id)
        return res.status(200).json({token:token,message:"Login Successful"})
    }

    catch(error){
        console.error(error);

        return res.status(500).json({message:"An error occured"});
    }
}

export async function updateProfile(req:Request,res:Response) {
    try{
        const userId=(req.user as UserAttributes).id;
        const userProfile=await Profile.findOne({where:{userId:userId}});
        if (!userProfile){
            return res.status(400).json({message:"User not found!"})
        }
        const {
            userName,
            telephone,
            address,
            bio
        }=req.body
    
        const file =req.file as Express.Multer.File;
        let image='';
    
    
        if (file) {
            const result = await cloudinary.uploader.upload(file.path);
            image = result.secure_url;
          }
    
        userProfile.userName=userName;
        userProfile.telephone=telephone;
        userProfile.profileImage=image;
        userProfile.address=address;
        userProfile.bio=bio;
        await userProfile.save();
    
    
        return res.status(200).json({message:"Profile updated successfully",updatedProfile:userProfile})
    }
    catch(error){
        console.error(error);

        return res.status(500).json({message:"An error occured"});
    }
}

export async function getProfile(req:Request,res:Response) {
    try{
        const userId=(req.user as UserAttributes).id;
        const myProfile=await Profile.findOne({where:{userId:userId}})
        
        return res.status(200).json({message:"my Profile",profile:myProfile})
    }
    catch(error){
        console.error(error);
        return res.status(500).json({message:"Internal Server Error"})
    }
}