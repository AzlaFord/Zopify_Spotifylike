import clientPromise from "./mongodb"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

async function createUser(nume, email, dataNastere, parola) {
  try {
    const client = await clientPromise
    const db = client.db("Zopify")
    const users = db.collection("users")

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(parola, salt)

    const result = await users.insertOne({
      nume,
      email,
      dataNastere,
      passwordHash: hash,
      createdAt: new Date(),
    });

    const token = jwt.sign(
      { userId: result.insertedId, email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return { success: true, userId: result.insertedId, token };
  } catch (err) {
    return { success: false, message: err.message || String(err) };
  }
}
export default createUser