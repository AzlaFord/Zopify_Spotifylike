import "../../styles/globals.css"
export const metadata = {
  title:"Login",
  description:"Spotify like app"
}


export default function RootLayout({ children }) {
  return (
    <html lang="ro">
      <body >
        {children}
      </body>
    </html>
  );
}
