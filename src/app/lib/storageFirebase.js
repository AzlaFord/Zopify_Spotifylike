import addSong from "./addSong";
import { bucket } from "./firebase";
import fs from "fs";
import path from "path";

async function storeFileServerSide(file) {
  const tempPath = path.join("/tmp", file.name);
  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(tempPath, buffer);

  await bucket.upload(tempPath, {
    destination: `songs/${file.name}`,
    metadata: { contentType: file.type },
  });

  const url = `https://storage.googleapis.com/${bucket.name}/songs/${file.name}`;

  fs.unlinkSync(tempPath);

  return url;
}

async function uploadSongHandler(fileAudio, fileCover, title, artist, album) {
  try {
    const audioUrl = await storeFileServerSide(fileAudio);
    const coverUrl = await storeFileServerSide(fileCover);
    const result = await addSong(title, artist, album, audioUrl, coverUrl);

    return { success: true, songId: result.insertedId, audioUrl, coverUrl };
  } catch (err) {
    console.error(err);
    return { success: false, message: err.message };
  }
}

export default uploadSongHandler;
