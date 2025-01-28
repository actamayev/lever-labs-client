import { useLocation } from "react-router"
import { CircuitBoard, Cpu, Flag } from "lucide-react"
import { CustomHouse } from "../../icons/custom-house"

export default function GetCurrentElement () {
	const location = useLocation()

	const path = location.pathname
	if (path.startsWith("/lab/element-1")) {
		return (
			<><CircuitBoard className="!size-8"/>Element 1: Sensor Basics</>
		)
	}
	else if (path.startsWith("/lab/element-2")) {
		return (
			<><Cpu className="!size-8"/>Element 2: Combine & Create</>
		)
	}
	else if (path.startsWith("/lab/element-3")) {
		return (
			<><Flag className="!size-8"/>Element 3: Missions</>
		)
	}
	return (
		<><CustomHouse className="!size-8"/>Welcome</>
	)
}
