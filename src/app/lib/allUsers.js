import clientPromise from "./mongodb";

export default async function getUsers(){
    const client = await clientPromise
    const db = client.db("Zopify")
    
    const usersCount = await db.collection("users").countDocuments()
    return { success:true,message:"totul a mers bine",data:usersCount}
}