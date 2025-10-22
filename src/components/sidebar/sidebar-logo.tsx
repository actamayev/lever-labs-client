"use client"

import Link from "next/link"
import Image from "next/image"
import {
	SidebarMenu,
	SidebarMenuItem,
} from "@/components/ui/sidebar"
import { PageToNavigateAfterLogin } from "../../utils/constants/page-constants"

export default function SidebarLogo(): React.ReactNode {
	return (
		<SidebarMenu>
			<SidebarMenuItem className="flex justify-start">
				<Link
					href={PageToNavigateAfterLogin}
					className="flex items-center justify-start rounded-lg mt-1"
				>
					<div className="flex aspect-square items-start justify-start">
						<div className="flex">
							<Image
								src="/favicon.svg"
								alt="Logo"
								width={56}
								height={56}
								className="size-14"
								priority
							/>
						</div>
					</div>
				</Link>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
