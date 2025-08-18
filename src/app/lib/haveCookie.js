import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export function getUserFromCookie(){
    const token = cookies().get("token")?.value
    if(!token){return {success:false,message:"nu exista cookie"}}
    try{
        const user = jwt.verify(token,process.env.JWT_SECRET)
        return {success:true,user}
    }catch(err){
        return {success:false,message:err.message}
    }
}