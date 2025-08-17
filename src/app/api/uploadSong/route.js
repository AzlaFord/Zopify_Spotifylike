import uploadSongHandler from "@/src/app/lib/storageFirebase";

async function POST(request) {
    try{

        const formData = await request.formData();
        const fileAudio = formData.get("fileAudio");
        const fileCover = formData.get("fileCover");
        const title = formData.get("title");
        const artist = formData.get("artist");
        const album = formData.get("album");

        if(!fileAudio){
            return new Response(JSON.stringify({message:"nu exista file audio"}),{
                status:400,
                headers:{"Content-Type":"application/json"}
            })
        }
        if(!fileCover){
            return new Response(JSON.stringify({message:"nu exista file Cover"}),{
                status:400,
                headers:{"Content-Type":"application/json"}
            })
        }
        if(!title){
            return new Response(JSON.stringify({message:"nu exista Titlu"}),{
                status:400,
                headers:{"Content-Type":"application/json"}
            })
        }
        if(!artist){
            return new Response(JSON.stringify({message:"nu exista nume artist"}),{
                status:400,
                headers:{"Content-Type":"application/json"}
            })
        }
        if(!album){
            return new Response(JSON.stringify({message:"nu exista album"}),{
                status:400,
                headers:{"Content-Type":"application/json"}
            })
        }

        const result = await uploadSongHandler(fileAudio, fileCover, title, artist, album)
        return new Response(JSON.stringify({message:"a mers totul bine ",result}),{
            status:200,
            headers:{"Content-Type":"application/json"}
        })
    }catch(err){
        return new Response(JSON.stringify({message:err.message || String(err) }),{
            status:500,
            headers:{"Content-Type":"application/json"}
        })
    }

}