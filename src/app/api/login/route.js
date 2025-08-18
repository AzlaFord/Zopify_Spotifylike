import loginUser from "@/src/app/lib/login";
import { cookies } from "next/headers";

export async function POST(request) {
    const data = await request.json()
    const {email,parola} = data
    try{

        if(!email){
            return new Response(JSON.stringify({message:"nu ai introdus email"}),{
                status:400,
                headers:{"Content-Type":"application/json"}
            })
        }
        if(!parola){
            return new Response(JSON.stringify({message:"nu ai introdus parola"}),{
                status:400,
                headers:{"Content-Type":"application/json"}
            })
        }
        
        const result = await loginUser(email,parola)


        if (result.success) {
            const cookieStore = await cookies()
            cookieStore.set("token", result.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60 * 24 * 7 
            });

            return new Response(
                JSON.stringify({ success: true, message: "a mers bine" }),
                { status: 200, headers: { "Content-Type": "application/json" } }
            );
        } else {
            return new Response(
                JSON.stringify({ message: result.message || "Email sau parola incorecta" }),
                { status: 401, headers: { "Content-Type": "application/json" } }
            );
        }

    }catch(err){
        return new Response(JSON.stringify({message: err.message || String(err)}),{
            status:500,
            headers:{"Content-Type":"application/json"}
        })
    }
}