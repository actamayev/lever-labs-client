"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

export default function LandingNavigation(): React.ReactNode {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

	return (
		<nav className="relative py-4">
			<div className="flex items-center justify-between">
				{/* Logo */}
				<div className="flex items-center">
					<Link href="/" className="inline-block">
						<img
							className="h-8 text-black mt-1"
							src="/trmnl--glyph-black.svg"
							alt="TRMNL logo"
						/>
					</Link>
				</div>

				{/* Mobile menu button */}
				<Button
					variant="ghost"
					size="icon"
					className="md:hidden text-black hover:bg-gray-100"
					onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
					aria-label="Toggle menu"
				>
					<Menu className="h-6 w-6" />
				</Button>

				{/* Desktop navigation */}
				<div className="hidden md:flex items-center gap-2">
					<Button
						variant="ghost"
						size="sm"
						className="text-black hover:bg-gray-100 hover:text-black rounded-full font-medium tracking-tight"
						asChild
					>
						<Link href="/login">Login</Link>
					</Button>
					<Button
						variant="ghost"
						size="sm"
						className="text-black hover:bg-gray-100 hover:text-black rounded-full font-medium tracking-tight"
						asChild
					>
						<Link href="/signup">Sign up</Link>
					</Button>
				</div>
			</div>

			{/* Mobile menu dropdown */}
			{mobileMenuOpen && (
				<div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg mt-2 rounded-lg mx-4">
					<div className="flex flex-col gap-2 p-4">
						<Button
							variant="ghost"
							className="justify-start text-black hover:bg-gray-100"
							asChild
						>
							<Link href="/login">Login</Link>
						</Button>
						<Button
							variant="ghost"
							className="justify-start text-black hover:bg-gray-100"
							asChild
						>
							<Link href="/signup">Sign up</Link>
						</Button>
					</div>
				</div>
			)}
		</nav>
	)
}
