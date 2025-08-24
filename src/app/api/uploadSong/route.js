import uploadSong from "../../lib/uploadSong";

export async function POST(request) {
  try {
    const formData = await request.formData();

    const fileAudio = formData.get("fileAudio");
    const fileCover = formData.get("fileCover");
    const title = formData.get("title");
    const artist = formData.get("artist");
    const album = formData.get("album");
    if (!fileAudio) {
      return new Response(JSON.stringify({ message: "Nu exista file audio" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (!fileCover) {
      return new Response(JSON.stringify({ message: "Nu exista file cover" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (!title) {
      return new Response(JSON.stringify({ message: "Nu exista titlu" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (!artist) {
      return new Response(JSON.stringify({ message: "Nu exista nume artist" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (!album) {
      return new Response(JSON.stringify({ message: "Nu exista album" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log(formData.get("title")); // verifică în consola serverului
    console.log(formData.get("fileAudio")); // ar trebui să fie File
    console.log(title,
      album,
      artist,
      fileAudio,
      fileCover,)
    const result = await uploadSong({
      title,
      album,
      artist,
      audioFile: fileAudio,
      coverFile: fileCover,
    });

    return new Response(JSON.stringify({ message: "A mers totul bine", result }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: err.message || String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
