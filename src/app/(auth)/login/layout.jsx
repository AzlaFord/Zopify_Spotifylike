export const metadata = {
  title:"Login",
  description:"App"
}


export default function RootLayout({ children}) {
  return (
    <html lang="ro">
      <body >
        {children}
      </body>
    </html>
  );
}
