
import "../../styles/globals.css"
import { columns, Payment } from "./columns"
import { DataTable } from "./data-table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SiteHeaderDashboard } from "@/components/ui/site-headerDashbaord"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import DataSection from "@/components/DataSection"

async function getData() {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/getData/getDataTable`; 
  const data = await fetch(url)
  if(!data.ok){
    throw new Error("nu am mers ceva bine")
  }
  const result = await data.json()
  return result
}

export default async function Dashboard(){
    const data = await getData();

    return (
        <>
        <div className="[--header-height:calc(--spacing(14))]">
            <SidebarProvider className="flex flex-col">
                <div className="flex flex-1">
                <SidebarInset>
                <SiteHeaderDashboard />    
                <div className="flex flex-1 flex-col gap-4 p-4 relative">
                    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                        <DataSection/>
                    </div>
                    <ScrollArea className="bg-muted/100 flex-1 rounded-xl md:min-h-min mb-[5vh]">
                        <div className="grid auto-rows-min  gap-1 md:grid-cols-1 m-2">
                            <DataTable columns={columns} data={data.data} />
                        </div>
                    </ScrollArea>
                </div>
                </SidebarInset>
                </div>
            </SidebarProvider>
        </div>        
        </>
    )
}