import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { ScrollArea } from "@/components/ui/scroll-area"
export default function SideBarInset(){
    return(<>
        <div className="flex flex-1 flex-col gap-4 p-4 relative">
            <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                <div className="bg-muted/100 aspect-video rounded-xl" ></div>
                <div className="bg-muted/100 aspect-video rounded-xl" ></div>
                <div className="bg-muted/100 aspect-video rounded-xl" />
                <div className="bg-muted/100 aspect-video rounded-xl" />
            </div>
            <ScrollArea className="bg-muted/100 flex-1 rounded-xl md:min-h-min mb-[5vh]">
                <div className="grid auto-rows-min  gap-1 md:grid-cols-4 m-2">
                    
                    {
                    Array.from({ length: 4 }).map((_, index) => (
                        <Card  key={index}>
                        <CardHeader>
                            <CardTitle>SONG {index + 1}</CardTitle>
                            <CardDescription>Album</CardDescription>
                            <CardAction>Play action</CardAction>
                        </CardHeader>
                        <CardContent>aaaaaaaaaaaa
                        </CardContent>
                        <CardContent>aaaaaaaaaaaa
                        </CardContent>
                        <CardFooter>
                            <p>Artist</p>
                        </CardFooter>
                        </Card>
                    ))
                    }
                </div>
            </ScrollArea>
        </div>
        <div className="sticky bottom-0 left-0 right-0 bg-muted/90 border py-7 shadow-sm min-h-[7vh] md:max-h-[6vh]" />
    </>)
}