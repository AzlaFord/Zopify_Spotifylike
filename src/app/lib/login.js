import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import clientPromise from "./mongodb";

async function loginUser({ email, parola }) {
    try {
        const client = await clientPromise;
        const db = client.db("Zopify").collection("users");

        const user = await db.findOne({ email });
        if (!user) return { success: false, message: "User nu a fost gasit" };

        const isMatch = await bcrypt.compare(parola, user.passwordHash);
        if (!isMatch) return { success: false, message: "Parola gresita" };

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        return {
            success: true,
            token,
            user: { email: user.email, nume: user.nume, prenume: user.prenume }
        };

    } catch (err) {
        return { success: false, message: err.message || String(err) };
    }
}

export default loginUser;
