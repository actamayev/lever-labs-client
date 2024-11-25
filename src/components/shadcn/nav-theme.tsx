import _ from "lodash"
import { observer } from "mobx-react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/shadcn/ui/button"
import { SidebarMenu, SidebarMenuItem } from "@/components/shadcn/ui/sidebar"
import useSetDefaultSiteTheme from "../../hooks/personal-info/set-default-site-theme"

function NavTheme() {
	const setDefaultSiteTheme = useSetDefaultSiteTheme()

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<Button variant="outline" size="icon" onClick={setDefaultSiteTheme}>
					<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
					<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
				</Button>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}

export default observer(NavTheme)
