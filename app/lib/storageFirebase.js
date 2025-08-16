import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import addSong from "./addSong";
const storage = getStorage();

async function storeFile(file) {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, 'songs/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Încărcarea este ' + progress + '% completă');
      },
      (error) => reject(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(resolve).catch(reject);
      }
    );
  });
}
async function uploadSongHandler(fileAudio, fileCover, title, artist, album) {
  try {
    const audioUrl = await storeFile(fileAudio);
    const coverUrl = await storeFile(fileCover);
    const result = await addSong(title, artist, album, audioUrl, coverUrl);
    return {success:true,result}
  } catch (err) {
    console.error(err);
    return { success: false, message: err.message };
  }
}
