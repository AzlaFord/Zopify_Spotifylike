"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function DialogAddSong() {
  const [fileAudio, setAudio] = useState(null)
  const [fileCover, setCover] = useState(null)
  const [title, setTitle] = useState("")
  const [artist, setArtist] = useState("")
  const [album, setAlbum] = useState("")
  const [loading, setLoading] = useState(false)

  const submitSong = async (e) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData()
    formData.append("title", title)
    formData.append("album", album)
    formData.append("artist", artist)
    formData.append("fileAudio", fileAudio)
    formData.append("fileCover", fileCover)

    try {
      const res = await fetch("/api/uploadSong", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()
      if(data.ok){
        setLoading(false)
      }
    } catch (err) {
      alert("Error: " + err.message)
    } finally {
      setLoading(false) 
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="ml-3">Add Song</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={submitSong} encType="multipart/form-data">
          <DialogHeader>
            <DialogTitle>Add Music</DialogTitle>
            <DialogDescription className="mt-0.1 mb-1">Add a song to the database</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-1">
              <Label className="mt-3" htmlFor="Song">Title</Label>
              <Input
                id="Song"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="I Wonder"
                required
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="Album">Album</Label>
              <Input
                id="Album"
                name="album"
                value={album}
                onChange={(e) => setAlbum(e.target.value)}
                placeholder="Graduation"
                required
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="Artist">Artist</Label>
              <Input
                id="Artist"
                name="artist"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                placeholder="Kanye West"
                required
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="Cover">Cover Image</Label>
              <Input
                type="file"
                id="Cover"
                name="fileCover"
                onChange={(e) => setCover(e.target.files[0])}
                accept="image/*"
                required
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="songfile">Song File</Label>
              <Input
                type="file"
                id="songfile"
                name="fileAudio"
                onChange={(e) => setAudio(e.target.files[0])}
                accept="audio/*"
                required
              />
            </div>
          </div>
          <DialogFooter className="mt-3">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading ? "Uploading..." : "Done"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
