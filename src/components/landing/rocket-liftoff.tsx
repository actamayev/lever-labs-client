import { forwardRef, useState } from "react"
import { LucideIcon, LucideProps } from "lucide-react"
import { CustomRocket } from "../icons/custom-rocket"

const styles = `
  @keyframes launch {
    0% { 
      transform: translate(0, 0) rotate(0deg);
      opacity: 1;
    }
    50% { 
      transform: translate(100px, -100px) rotate(45deg);
      opacity: 0;
    }
    50.1% {
      transform: translate(-100px, 100px) rotate(45deg);
      opacity: 0;
    }
    100% { 
      transform: translate(0, 0) rotate(0deg);
      opacity: 1;
    }
  }
`

export const RocketLiftoff: LucideIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
	const [isLaunching, setIsLaunching] = useState(false)

	const handleClick = () => {
		if (isLaunching) return
		setIsLaunching(true)
		setTimeout(() => {
			setIsLaunching(false)
		}, 2000) // Match animation duration
	}

	return (
		<>
			<style>{styles}</style>
			<div
				onClick={handleClick}
				style={{ cursor: "pointer" }}
				className="relative"
			>
				<CustomRocket
					{...props}
					ref={ref}
					className={`${props.className || ""} ${
						isLaunching ? "animate-[launch_2s_ease-in-out]" : ""
					}`}
				/>
			</div>
		</>
	)
})

RocketLiftoff.displayName = "RocketLiftoff"
