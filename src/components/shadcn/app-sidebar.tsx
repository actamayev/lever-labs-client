import { memo, useCallback, useMemo, useState } from "react"
import { IconType } from "react-icons"
import NavUser from "@/components/shadcn/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/shadcn/ui/sidebar"
import { Link, useLocation } from "react-router-dom"
import { HiBeaker } from "react-icons/hi"
import { TbSandbox } from "react-icons/tb"
import NavTheme from "./nav-theme"
import useTypedNavigate from "../../hooks/navigate/typed-navigate"

interface NavData {
  title: string
  url: StaticPageNames
  icon: IconType
  isActive: boolean
}

// This is sample navData
const navData: NavData[] = [
  {
    title: "Sandbox",
    url: "/sandbox",
    icon: TbSandbox,
    isActive: true,
  },
  {
    title: "Lab",
    url: "/lab",
    icon: HiBeaker,
    isActive: false,
  }
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navigate = useTypedNavigate()
  const location = useLocation()

  const getTitle = useMemo(() => {
    if (location.pathname === "/sandbox") return "Sandbox"
    else if (location.pathname === "/lab") return "Lab"
    else return ""
  }, [location.pathname])

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
      {...props}
    >
      {/* This is the first sidebar */}
      {/* We disable collapsible and adjust width to icon. */}
      {/* This will make the sidebar appear as icons. */}
      <Sidebar
        collapsible="none"
        className="!w-[calc(var(--sidebar-width-icon)_+_1px)] border-r"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link
                to="/"
                className="flex items-center flex-shrink-0 dark:text-white"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                  <img
                    src="/favicon.svg"
                    alt="Logo"
                    className="h-8 w-8" // This will make the logo fill the container
                  />
                </div>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {navData.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={{
                        children: item.title,
                        hidden: false,
                      }}
                      onClick={() => navigate(item.url)}
                      isActive={location.pathname === item.url}
                      className="px-2.5 md:px-2"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <NavTheme />
          <NavUser />
        </SidebarFooter>
      </Sidebar>

      {/* This is the second sidebar */}
      {/* We disable collapsible and let it fill remaining space */}
      <Sidebar collapsible="none" className="hidden flex-1 md:flex">
        <SidebarHeader className="gap-3.5 border-b p-4">
          <div className="flex w-full items-center justify-between">
            <div className="text-base font-medium text-foreground">
              {getTitle}
            </div>
          </div>
          <SidebarInput placeholder="Type to search..." />
        </SidebarHeader>
      </Sidebar>
    </Sidebar>
  )
}
