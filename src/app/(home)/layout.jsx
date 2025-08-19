import "../../styles/globals.css"
export const metadata = {
  title:"Zopify",
  description:"Spotify like app"
}

import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export const iframeHeight = "800px"

export const description = "A sidebar with a header and a search form."
export default function RootLayout({ appsidebar, sidebarInset}) {
  return (
    <html lang="ro">
      <body className="[--header-height:calc(--spacing(14))]">
        <SidebarProvider className="flex flex-col">
          <SiteHeader />
          <div className="flex flex-1">
            {appsidebar}
            <SidebarInset>
              {sidebarInset}
            </SidebarInset>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
