import clientPromise from "./mongodb"

async function userExists(email) {
    const client = await clientPromise
    const db = client.db("Zopify")
    const users = db.collection("users")

    const exists = await users.findOne({email:email})

    if(exists){
        return {success:false,message:"email exista deja"}
    }else{
        return {success:true,message:"email nu exista"}
    }
}
export default userExists