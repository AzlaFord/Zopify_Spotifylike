import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function uploadSong({ title, album, artist, audioFile, coverFile }) {
    
    const timestamp = Date.now();
    const { data: audioData, error: audioError } = await supabaseAdmin.storage
    .from('MusicApp')
    .upload(`audio/${audioFile.name}`, audioFile)
    if (audioError) throw audioError
    const coverPath = `${timestamp}-${encodeURIComponent(coverFile.name)}`;
    const { data: coverData, error: coverError } = await supabaseAdmin.storage
    .from('MusicApp')
    .upload(`covers/${coverPath}`, coverFile)
    if (coverError) throw coverError
    
    const { data: audioDataUrl } = supabaseAdmin.storage
    .from('MusicApp')
    .getPublicUrl(`audio/${audioFile.name}`)
    const audioUrl = audioDataUrl.publicUrl
    
    const { data: coverDataUrl } = supabaseAdmin.storage
    .from('MusicApp')
    .getPublicUrl(`covers/${coverFile.name}`)
    const coverUrl = coverDataUrl.publicUrl

    console.log('audioUrl:', audioUrl)
    console.log('coverUrl:', coverUrl)

    const { data, error } = await supabaseAdmin.from('Songs').insert([
        { title, album, artist, audio_url: audioUrl, cover_url: coverUrl }
    ])
    if (error) throw error

    return data
}
