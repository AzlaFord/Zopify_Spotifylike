import "../styles/globals.css";

export const metadata = {
  title: "Zopify",
  description: "Spotify like app",
};

import ThemeProvider from "@/components/ui/theme-provider";

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}