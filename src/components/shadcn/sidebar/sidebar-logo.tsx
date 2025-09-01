"use client"

import Link from "next/link"
import {
	SidebarMenu,
	SidebarMenuItem,
} from "@/components/shadcn/ui/sidebar"
import { PageToNavigateAfterLogin } from "../../../utils/constants/page-constants"

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
