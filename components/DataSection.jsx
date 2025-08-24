"use client"

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState } from "react"
import { UsersRound,Music,UserPen } from "lucide-react"
import { useQuery } from '@tanstack/react-query'

const fetchUsers = async () =>{
    const data = await fetch("/api/getData/getUsers")
    if (!data.ok) throw new Error('Eroare la fetch');
    const result = data.json()
    return result
}
const fetchSongsArtists = async () =>{
    const data = await fetch("/api/getData/getSongsArtists")
    if(!data.ok){throw new Error("Eroare la fetch")}
    const result = await data.json()
    return result
}
const fetchAllData = async () =>{
    const users = await fetchUsers()
    const SongsArtists = await fetchSongsArtists()
    return {users,SongsArtists}
}
export default function DataSection(){
    const { data, isLoading, error } = useQuery({
        queryKey: ['allData'],
        queryFn: fetchAllData,
    });
    if (isLoading) return <>
                <Card>
            <CardHeader>
                <CardTitle>Users</CardTitle>
                <CardAction><UsersRound /></CardAction>
            </CardHeader>
            <CardContent>
                Total Users 
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
    if (error) return <div>{error.message}</div>;

    return(
        <>
        <Card>
            <CardHeader>
                <CardTitle>Users</CardTitle>
                <CardAction><UsersRound /></CardAction>
            </CardHeader>
            <CardContent>
                Total Users : {data.users.data}
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Songs</CardTitle>
                <CardAction><Music /></CardAction>
            </CardHeader>
            <CardContent>
                <p>Total Songs: {data.SongsArtists.songsCount}</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Artists</CardTitle>
                <CardAction><UserPen /></CardAction>
            </CardHeader>
            <CardContent>
                <p>Total Artists: {data.SongsArtists.artistsCount}</p>
            </CardContent>
        </Card>    
        </>
    )
}