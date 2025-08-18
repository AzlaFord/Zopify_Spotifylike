import loginUser from "@/src/app/lib/login";

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
        return new Response(JSON.stringify({message:"a mers bine",token:result.token}),{
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