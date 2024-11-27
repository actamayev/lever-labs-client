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
					className="relative size-12"
					style={{ height: "54px", width: "54px" }}
				>
					<Sun
						className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
						style={{ width: "35px", height: "35px" }}
					/>
					<Moon
						className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
						style={{ width: "35px", height: "35px" }}
					/>
				</Button>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}

export default observer(NavTheme)
