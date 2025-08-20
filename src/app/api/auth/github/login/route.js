import { NextResponse } from "next/server"

export async function GET() {
  const redirectUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_ID}&scope=read:user user:email`
  return NextResponse.redirect(redirectUrl)
}
