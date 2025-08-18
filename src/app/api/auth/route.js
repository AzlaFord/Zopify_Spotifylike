import createUser from "@/src/app/lib/auth";

async function POST(request) {
    const data = await request.json()
    const {nume, email, dataNastere, parola} = data
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    try{
        if(!nume){
            return new Response(JSON.stringify({message:"nu e completat capul cu numele"}),{
                status:400,
                headers:{"Content-Type":"application/json"}
            })
        }
        if(!email){
            return new Response(JSON.stringify({message:"nu e completat capul cu email"}),{
                status:400,
                headers:{"Content-Type":"application/json"}
            })
        }
        if (!emailRegex.test(email)) {
            return new Response(
                JSON.stringify({ message: "Email invalid" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        if(!dataNastere){
            return new Response(JSON.stringify({message:"nu e completat capul cu dataNastere"}),{
                status:400,
                headers:{"Content-Type":"application/json"}
            })
        }
        
        if(!parola){
            return new Response(JSON.stringify({message:"nu e completat capul cu parola"}),{
                status:400,
                headers:{"Content-Type":"application/json"}
            })
        }

        if (parola.length < 8) {
            return new Response(
                JSON.stringify({ message: "Parola trebe să aiba minim 8 caractere" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }
        const result = await createUser(data)
        return new Response(JSON.stringify({message:"a mers totul bine user creat",result}),{
            status:200,
            headers:{"Content-Type":"application/json"}
        })
    }catch(err){
        return new Response(JSON.stringify({message: err.message || String(err)}),{
            status:500,
            headers:{"Content-Type":"application/json"}
        })
    }
}