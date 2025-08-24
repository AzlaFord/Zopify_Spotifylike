import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)
export default async function dataTable(){
    try{
        const {data ,error} = await supabaseAdmin.from("Songs").select("title,album,artist,cover_url")
        if (error) throw error
        return {success:true,message:"a mers totul bine",data}
    }catch(err){
        return {success:false,message:err.message}
    }
}