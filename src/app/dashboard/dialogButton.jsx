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
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="ml-3" >Add Song</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Music</DialogTitle>
            <DialogDescription>
                Add color to the app
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="Song">Name</Label>
              <Input id="Song" name="Song" placeholder="SongName" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="Album">Album</Label>
              <Input id="Album" name="Album" placeholder="Graduation" />
            </div>            
            <div className="grid gap-3">
              <Label htmlFor="Artist">Artist</Label>
              <Input id="Artist" name="Artist" placeholder="Kanye West" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="Cover">Cover img</Label>
              <Input type="file" id="Cover" name="Cover" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="songfile">Song</Label>
              <Input type="file" id="songfile" name="songfile"  />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
