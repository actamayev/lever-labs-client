"use client"

import { LucideIcon } from "lucide-react"

// eslint-disable-next-line @typescript-eslint/naming-convention
export default function ShowIcon({ icon: Icon} : { icon: LucideIcon }): React.ReactNode {
	return (
		<div className="flex-shrink-0">
			<div className="bg-pipTheme w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xl">
				<Icon size={16} strokeWidth={2.75}/>
			</div>
		</div>
	)
}
