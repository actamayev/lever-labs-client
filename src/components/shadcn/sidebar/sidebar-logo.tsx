"use client"

import {
	SidebarMenu,
	SidebarMenuItem,
} from "@/components/shadcn/ui/sidebar"
import Image from "next/image"
import Link from "next/link"

export default function SidebarLogo() {
	return (
		<SidebarMenu>
			<SidebarMenuItem className="flex justify-start">
				<Link
					href="/lab"
					className="flex !h-16 !w-16 !min-w-[64px] items-center
						justify-center rounded-lg group-data-[collapsible=icon]:!h-16 group-data-[collapsible=icon]:!w-16"
				>
					<div className="flex aspect-square !h-16 !w-16 items-center justify-center">
						<Image
							src="/favicon.svg"
							alt="Logo"
							className="!h-16 !w-16"
							loading="lazy"
							width={32}
							height={32}
						/>
					</div>
				</Link>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
