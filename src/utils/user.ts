import bcrypt from "bcrypt";
import { UserAttributes } from "database/models/user";
import jwt  from "jsonwebtoken";


export async function hashPassword(password:string) {
  const saltRounds = 10;
  
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

export async function verifyPassword(password:string, hashedPassword:string) {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}

export async function generateJwtToken(user:UserAttributes,id:string){
    const token= jwt.sign(
        {
            user:user,id
        },
        process.env.JWT_SECRET || "Secret",
        { expiresIn: '24h' } 
    )
    return token
}

export  function verifyToken(token:string){
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET||"Secret");
        return decoded
      } catch (error) {
        console.error('Invalid token:', error);
      }
}