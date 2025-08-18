import "../styles/globals.css"
export const metadata = {
  title:"Zopify",
  description:"Spotify like app"
}

export default function RootLayout({ children}) {
  return (
    <html lang="ro">
      <body>{children}</body>
    </html>
  );
}
