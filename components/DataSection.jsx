import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { UsersRound,Music,UserPen } from "lucide-react"
export default function DataSection(){
    return(
        <>
        <Card>
            <CardHeader>
                <CardTitle>Users</CardTitle>
                <CardAction><UsersRound /></CardAction>
            </CardHeader>
            <CardContent>
                Total Users :
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Songs</CardTitle>
                <CardAction><Music /></CardAction>
            </CardHeader>
            <CardContent>
                <p>Total Songs:</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Artists</CardTitle>
                <CardAction><UserPen /></CardAction>
            </CardHeader>
            <CardContent>
                <p>Total Artists:</p>
            </CardContent>
        </Card>    
        </>
    )
}