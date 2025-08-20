"use client"

import { SidebarMenuButton } from "./sidebar"
import { Avatar,AvatarImage,AvatarFallback } from "@radix-ui/react-avatar"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { SearchForm } from "@/components/search-form"
import { ChevronsUpDown } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query"
async function fetchUser() {
    const res = await fetch("/api/me")
    if (!res.ok) throw new Error("ceva nu a mers bine la fetch user/me")
    const data = await res.json()
    return data
}

export function SiteHeaderDashboard() {
  const {theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), []);
  const { data: userData } = useQuery({
      queryKey: ["user"],
      queryFn: fetchUser
  })
  if (!mounted) {
    return null;
  }
  return (
    <header
      className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
        <Breadcrumb className="hidden sm:block">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>DashBoard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground  ">
            <Avatar className="h-10 w-10 rounded-lg">
              <AvatarFallback className="rounded-lg">Caaa</AvatarFallback>
              <AvatarImage className="w-full sm:mx-auto sm:w-auto" src={'https://pbs.twimg.com/profile_images/1701878932176351232/AlNU3WTK_400x400.jpg'} alt={userData?.user?.nume} />
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{userData?.user?.nume}</span>
              <span className="truncate text-xs">{userData?.user?.email}</span>
            </div>
        </SidebarMenuButton>

        <Button variant="outline" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? (
            <Sun  />
          ) : (
            <Moon />
          )}
        </Button>
      </div>
    </header>
  );
}
