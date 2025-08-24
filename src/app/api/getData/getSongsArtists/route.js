import countSongs from "@/src/app/lib/allSongs"

export async function GET(request) {
    try{
        const result = await countSongs()
        if(result.success){
            return new Response(JSON.stringify({message:"a mers totul bine",songsCount:result.songs,artistsCount:result.artists}),{
                status:200,
                headers:{"Content-Type":"application/json"}
            })
        }else{
            return new Response(JSON.stringify({message:result.message}),{
                status:400,
                headers:{"Content-Type":"application/json"}
            })            
        }
    }catch(err){
        return new Response(JSON.stringify({message:err.message}),{
            status:500,
            headers:{"Content-Type":"application/json"}
        })
    }    
}