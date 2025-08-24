import dataTable from "@/src/app/lib/dataTable"

export async function GET(request) {
    try{
        const result = await dataTable()
        if(result.success){
            return new Response(JSON.stringify({message:"a mers totul bine ",data: result.data}),{
                status:200,
                headers:{"Content-Type":"application/json"}
            })
        }else{
            return new Response(JSON.stringify({message:"ceva nu e bine "}),{
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