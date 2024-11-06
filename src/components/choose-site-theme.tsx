import { observer } from "mobx-react"
import { FaMoon } from "react-icons/fa"
import { IoMdSunny } from "react-icons/io"
import { useLocation } from "react-router-dom"
import { useAuthContext } from "../contexts/auth-context"
import HoverOutlineComponent from "./hover-outline-component"
import useDefaultSiteTheme from "../hooks/memos/default-site-theme"
import useSetDefaultSiteTheme from "../hooks/personal-info/set-default-site-theme"

function ChooseSiteTheme() {
	const location = useLocation()
	const authClass = useAuthContext()
	const defaultSiteTheme = useDefaultSiteTheme()
	const setDefaultSiteTheme = useSetDefaultSiteTheme()

	if (authClass.isLoggedIn === false && location.pathname === "/") return null

	return (
		<HoverOutlineComponent
			id="theme-toggler"
			onClickAction={setDefaultSiteTheme}
			classes="relative flex items-center justify-center text-black dark:text-white"
		>
			{defaultSiteTheme === "light"
				? (<IoMdSunny />)
				: (<FaMoon />)
			}
		</HoverOutlineComponent>
	)
}

export default observer(ChooseSiteTheme)
