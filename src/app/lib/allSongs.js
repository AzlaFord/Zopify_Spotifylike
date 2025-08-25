import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function countSongs() {
  try {

    const { count: songCount, error: SongError } = await supabaseAdmin
      .from("Songs")
      .select("*", { count: "exact", head: true });
    if (SongError) throw SongError;

    const { data, error: artistError } = await supabaseAdmin
      .from("Songs")
      .select("artist"); 
    if (artistError) throw artistError;

    const uniqueArtists = [...new Set(data.map(a => a.artist))];
    const artistCount = uniqueArtists.length;

    return {
      success: true,
      message: "totul a mers bine",
      songs: songCount,
      artists: artistCount
    };
  } catch (err) {
    return { success: false, message: err.message };
  }
}
