import  bcrypt from "bcryptjs";
import clientPromise from "./mongodb";

const salt = await bcrypt.genSalt(10);
const hash = await bcrypt.hash("B4c0/\/", salt);
bcrypt.compareSync("B4c0/\/", hash);

async function createUser(nume, prenume, email, dataNastere, parola) {
    try{
        const client = await clientPromise
        const db = client.db("spotifyClone").collection("users")

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(parola, salt);

        await db.insertOne({
            nume,
            prenume,
            email,
            dataNastere,
            passwordHash: hash,
            createdAt: new Date()
        })
    }catch(err){
        console.error(err)
    }

}

export default createUser;
