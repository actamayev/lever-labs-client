"use client"

import {
	SidebarMenu,
	SidebarMenuItem,
} from "@/components/shadcn/ui/sidebar"
import Link from "next/link"

export default function SidebarLogo() {
	return (
		<SidebarMenu>
			<SidebarMenuItem className="flex justify-start">
				<Link
					href="/career-quest"
					className="flex items-center justify-start rounded-lg mt-1"
				>
					<div className="flex aspect-square items-start justify-start">
						<div className="flex">
							<div
								className="size-14 rounded-full"
								style={{ backgroundColor: "rgb(0,61,165)" }}
							/>
						</div>
					</div>
				</Link>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
