"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/shadcn/ui/button"
import setDefaultSiteTheme from "../../utils/personal-info/set-default-site-theme"

export default function FooterThemeToggle(): React.ReactNode {
	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={setDefaultSiteTheme}
			className="!h-8 !w-8 !min-w-8 relative text-questionText"
		>
			<Sun className="!h-6 !w-6 !min-w-6 rotate-0 scale-100 transition-all dark:-rotate-80 dark:scale-0"/>
			<Moon className="!h-6 !w-6 !min-w-6 absolute rotate-80 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
		</Button>
	)
}
