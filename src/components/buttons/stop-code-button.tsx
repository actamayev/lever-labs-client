import { cn } from "@/lib/utils"
import { SquarePause } from "lucide-react"
import { TactileButton } from "./tactile-button"
import stopCurrentlyRunningCode from "../../utils/sandbox/stop-currently-running-code"

interface Props {
	className?: string
	pauseClasses?: string
}

export default function StopCodeButton({ className, pauseClasses }: Props): React.ReactNode {
	return (
		<TactileButton
			className={cn(
				"flex items-center justify-center h-full w-auto",
				"bg-cardinal rounded-xl text-4xl duration-0 gap-3",
				className
			)}
			shadowColor="rgb(150, 50, 75)"
			onClick={(): Promise<void> => stopCurrentlyRunningCode(false)}
		>
			<SquarePause className={cn("fill-current self-center", pauseClasses)} />
			<span className="self-center">STOP</span>
		</TactileButton>
	)
}
