import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import clientPromise from "@/src/app/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(req) {
  const url = new URL(req.url)
  const code = url.searchParams.get("code")

  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_ID,
      client_secret: process.env.GITHUB_SECRET,
      code,
    }),
  })

  const tokenData = await tokenRes.json()
  const accessToken = tokenData.access_token

  const userRes = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  const ghUser = await userRes.json()

  const client = await clientPromise
  const db = client.db("Zopify")

  let user = await db.collection("users").findOne({ email: ghUser.email })

  if (!user) {
    const insert = await db.collection("users").insertOne({
      email: ghUser.email,
      nume: ghUser.login,   
      githubId: ghUser.id,
      createdAt: new Date()
    })
    user = {
      _id: insert.insertedId,
      email: ghUser.email,
      nume: ghUser.login
    }
  }

  const myJwt = jwt.sign(
    {
      id: user._id.toString(),
      email: user.email,
      nume: user.nume,           
      avatar: ghUser.avatar_url,  
    }, 
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  )

  const response = NextResponse.redirect("http://localhost:3000")
  response.cookies.set("token", myJwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24,
  })

  return response
}
