import ClientQueryProvider from "@/components/ClientProvider"
import "../../styles/globals.css"

import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function RootLayout({ appsidebar, sidebarInset}) {

  return (
    <ClientQueryProvider>
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
    </ClientQueryProvider>

  );
}
