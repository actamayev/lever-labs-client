"use client"

export default function OrComponent(): React.ReactNode {
	return (
		<div className="relative">
			<div className="absolute inset-0 flex items-center">
				<span className="w-full border-t-2 border-swan" />
			</div>
			<div className="relative flex justify-center text-xs">
				<span className="bg-background px-2 text-muted-foreground">
					OR
				</span>
			</div>
		</div>
	)
}
