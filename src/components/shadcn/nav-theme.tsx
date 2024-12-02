import { observer } from "mobx-react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/shadcn/ui/button"
import { SidebarMenu, SidebarMenuItem } from "@/components/shadcn/ui/sidebar"
import useSetDefaultSiteTheme from "../../hooks/personal-info/set-default-site-theme"

function NavTheme() {
	const setDefaultSiteTheme = useSetDefaultSiteTheme()

	return (
		<SidebarMenu>
			<SidebarMenuItem className="flex justify-center">
				<Button
					variant="ghost"
					size="icon"
					onClick={setDefaultSiteTheme}
					className="!h-[54px] !w-[54px] !min-w-[54px] relative group-data-[collapsible=icon]:!h-[54px]
					group-data-[collapsible=icon]:!w-[54px] transition-all duration-300"
				>
					<Sun
						className="!h-[35px] !w-[35px] !min-w-[35px] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
					/>
					<Moon
						className="!h-[35px] !w-[35px] !min-w-[35px] absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
					/>
				</Button>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}

export default observer(NavTheme)
