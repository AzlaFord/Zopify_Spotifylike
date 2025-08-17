import clientPromise from "./mongodb";

async function addSong(title,artist,album,audioUrl,coverUrl) {
    try{
        const client = await clientPromise
        const db = client.db("Zopify").collection("songs")

        const result = await db.insertOne({
            title,
            artist,
            album,
            audioUrl,
            coverUrl
        })
        return {success: true,songId: result.insertedId}
    }catch(err){
        console.error(err)
    }
}
export default addSong