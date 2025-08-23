import { supabase } from './supabaseClient'

export default async function uploadSong({ title, album,artist, audioFile, coverFile }) {
    const { data: audioData, error: audioError } = await supabase.storage
        .from('Songs')
        .upload(`audio/${audioFile.name}`, audioFile)
    if (audioError) throw audioError
    const { data: coverData, error: coverError } = await supabase.storage
        .from('songs')
        .upload(`covers/${coverFile.name}`, coverFile)
    if (coverError) throw coverError
    const audioUrl = supabase.storage.from('Songs').getPublicUrl(`audio/${audioFile.name}`).publicUrl
    const coverUrl = supabase.storage.from('Songs').getPublicUrl(`covers/${coverFile.name}`).publicUrl
    const { data, error } = await supabase.from('songs').insert([
        { title,album, artist, audio_url: audioUrl, cover_url: coverUrl }
    ])
    if (error) throw error
    return data
}