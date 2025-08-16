import  bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

async function loginUser(email,parola) {
    try{
        const client = await clientPromise
        const db = client.db("Zopify").collection("users")

        const user = await db.findOne({ email })
        if (!user) return { success: false, message: "User nu a fost gasit" }

        const isMatch = await bcrypt.compare(parola, user.passwordHash)
        if (!isMatch) return { success: false, message: "parola gresita" }
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,            
            { expiresIn: "7d" }             
        );
        return { token, user: { email: user.email, username: user.username } };
    }catch(err){
        console.log(err)
    }
}
export default loginUser