"use client"

import { forwardRef } from "react"
import { Search, X } from "lucide-react"
import { Input } from "../shadcn/ui/input"
import { Button } from "../shadcn/ui/button"

interface BlocklySearchBarProps {
	searchTerm: string
	onSearchChange: (term: string) => void
}

const BlocklySearchBar = forwardRef<HTMLInputElement, BlocklySearchBarProps>(
	({ searchTerm, onSearchChange }, ref): React.ReactNode => {
		return (
			<div className="relative">
				<div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-eel">
					<Search size={16} />
				</div>
				<Input
					ref={ref}
					type="text"
					placeholder="Search for blocks"
					value={searchTerm}
					onChange={(e): void => onSearchChange(e.target.value)}
					className="w-full px-4 py-2 pl-10 pr-12 rounded-t-xl border-2 border-swan rounded-b-none"
				/>
				{searchTerm && (
					<Button
						variant="ghost"
						size="sm"
						onClick={(): void => onSearchChange("")}
						className="absolute right-1 top-1/2 transform -translate-y-1/2 size-6 p-0 hover:bg-swan"
					>
						<X size={16} />
					</Button>
				)}
			</div>
		)
	})

BlocklySearchBar.displayName = "BlocklySearchBar"

export default BlocklySearchBar
