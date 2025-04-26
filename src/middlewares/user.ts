import { NextFunction,Response,Request } from "express";
import { verifyToken } from "../utils/user";

export function authenticate(req:Request,res:Response,next:NextFunction){
    try{
        const authHeader=req.headers.authorization;
        if(!authHeader||!authHeader.startsWith('Bearer ')){
           return res.status(401).json({ message: 'Access denied. No token provided.' });
        }
        const token = authHeader!.split(' ')[1];

        const decoded=verifyToken(token) as any;

        req.user=decoded;
        next();
    }
    catch(error){
        return res.status(401).json({ message: 'Invalid token.' });

    }
}