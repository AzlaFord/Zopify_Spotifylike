"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"
import "../../styles/globals.css"

const metadata = {
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
  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
        <div className="[--header-height:calc(--spacing(14))]">
          <SidebarProvider className="flex flex-col">
            <SiteHeader />
            <div className="flex flex-1">
              {appsidebar}
              <SidebarInset>
                {sidebarInset}
              </SidebarInset>
            </div>
          </SidebarProvider>
        </div>
    </QueryClientProvider>
  );
}
