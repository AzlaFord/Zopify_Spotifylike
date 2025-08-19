import getUserFromCookie from "../../lib/haveCookie";

export async function GET() {
  const result = await getUserFromCookie();

  return new Response(JSON.stringify(result), {
    status: result.success ? 200 : 401,
    headers: { "Content-Type": "application/json" },
  });
}
