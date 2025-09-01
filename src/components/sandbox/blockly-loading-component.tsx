"use client"

export default function BlocklyLoadingComponent(): React.ReactNode {
	return (
		<div className="relative z-0 rounded-b-3xl overflow-hidden border-b-2 border-swan animate-pulse flex-1">
			<div className="w-full h-full bg-standardBackground  flex flex-col">
			</div>
		</div>
	)
}
