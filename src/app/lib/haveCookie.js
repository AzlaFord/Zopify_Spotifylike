import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import clientPromise from "./mongodb"
import { ObjectId } from "mongodb"

export default async function getUserFromCookie(){
    const cookiesStore = await cookies()
    const token = cookiesStore.get("token")?.value
    if(!token){return {success:false,message:"nu exista cookie"}}
    try{
        const payload = jwt.verify(token,process.env.JWT_SECRET)
        const client = await clientPromise
        const db = client.db("Zopify")
        const user = await db.collection("users").findOne({ _id: new ObjectId(payload.id) })

        if (!user) return { success: false, message: "User not found" };

        return {success:true,user}
    }catch(err){
        return {success:false,message:err.message}
    }
}
