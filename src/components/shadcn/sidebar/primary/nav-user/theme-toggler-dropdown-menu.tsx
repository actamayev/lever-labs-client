import { observer } from "mobx-react"
import { Moon, Sun } from "lucide-react"
import { DropdownMenuItem } from "../../../ui/dropdown-menu"
import useSetDefaultSiteTheme from "../../../../../hooks/personal-info/set-default-site-theme"

function ThemeTogglerDropdownMenu() {
	const setDefaultSiteTheme = useSetDefaultSiteTheme()

	return (
		<DropdownMenuItem
			onSelect={(event) => {
				event.preventDefault()
				setDefaultSiteTheme()
			}}
			className="hover:cursor-pointer my-1.5"
		>
			<div className="mr-2 relative !h-[25px] !w-[25px] !min-w-[25px]">
				<Sun className="h-full w-full scale-100 transition-all dark:scale-0" />
				<Moon className="absolute top-0 h-full w-full scale-0 transition-all dark:scale-100" />
			</div>
			<span className="text-base">Toggle theme</span>
		</DropdownMenuItem>
	)
}

export default observer(ThemeTogglerDropdownMenu)
