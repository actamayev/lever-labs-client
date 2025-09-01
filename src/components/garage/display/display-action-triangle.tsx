import { useMemo } from "react"
import { TriangleIcon } from "lucide-react"
import { cn } from "../../../lib/shadcn/utils"

interface DisplayActionTriangleProps {
	applyToBuffer: () => void
	isEmpty: boolean
	isActive: boolean
}

export default function DisplayActionTriangle(props: DisplayActionTriangleProps): React.ReactNode {
	const { applyToBuffer, isEmpty, isActive } = props

	const triangleStyles = useMemo((): string => {
		if (isActive) {
			return "text-chargingGreen fill-chargingGreen"
		}
		if (isEmpty) {
			return "fill-standardBackground text-hare"
		}
		return "text-macaw fill-macaw"
	}, [isActive, isEmpty])

	return (
		<button
			onClick={applyToBuffer}
			disabled={isEmpty}
			className={cn("transition-all duration-200",
				!isEmpty
					? "hover:scale-110 cursor-pointer"
					: "cursor-not-allowed"
			)}
			title={isEmpty ? "Apply entered text" : "Enter text first"}
		>
			<TriangleIcon
				className={cn(
					"transition-colors duration-200 rotate-90",
					triangleStyles
				)}
				style={{ width: "60px", height: "60px" }}
				strokeWidth={1.5}
			/>
		</button>
	)
}
