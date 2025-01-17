import { forwardRef, useCallback, useState } from "react"
import { LucideIcon, LucideProps } from "lucide-react"
import { CustomTree } from "../icons/custom-tree"
import { CustomSprout } from "../icons/custom-sprout"

const styles = `
  @keyframes fadeOut {
    0% { opacity: 1; transform: scale(1); }
    100% { opacity: 0; transform: scale(0.95); }
  }

  @keyframes fadeIn {
    0% { opacity: 0; transform: scale(1.05); }
    100% { opacity: 1; transform: scale(1); }
  }
`

export const GrowingTree: LucideIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
	const [isTree, setIsTree] = useState(false)
	const [isAnimating, setIsAnimating] = useState(false)

	const handleClick = useCallback(() => {
		if (isTree || isAnimating) return
		setIsAnimating(true)
		setTimeout(() => {
			setIsTree(true)
			setIsAnimating(false)
		}, 500) // Reduced to 500ms since we're doing two 500ms animations back-to-back
	}, [isAnimating, isTree])

	const Icon = isTree ? CustomTree : CustomSprout

	return (
		<>
			<style>{styles}</style>
			<div onClick={handleClick} style={{ cursor: isTree === false ? "pointer" : "" }}>
				<Icon
					{...props}
					ref={ref}
					className={`${props.className || ""} ${
						// eslint-disable-next-line no-nested-ternary
						isAnimating
							? isTree
								? "animate-[fadeIn_500ms_ease-in-out]"
								: "animate-[fadeOut_500ms_ease-in-out]"
							: ""
					}`}
				/>
			</div>
		</>
	)
})

GrowingTree.displayName = "GrowingTree"
