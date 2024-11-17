import { useCallback, useRef, useState } from "react"
import { observer } from "mobx-react"
import AddPipModal from "./add-pip-modal/add-pip-modal"
import { usePipContext } from "../../contexts/pip-context"
import useRequestToConnectToPip from "../../hooks/pip/request-to-connect-to-pip"
import { useAuthContext } from "../../contexts/auth-context"
import useClickOutsideUseEffect from "../../hooks/click-outside/click-outside-use-effect"

// eslint-disable-next-line max-lines-per-function
function PipUUIDs() {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const [selectedPip, setSelectedPip] = useState<PipData | null>(null)
	const dropdownRef = useRef<HTMLDivElement>(null)
	const authClass = useAuthContext()
	const pipClass = usePipContext()
	const requestToConnectToPip = useRequestToConnectToPip()
	useClickOutsideUseEffect(dropdownRef, setIsDropdownOpen)

	const handleSelectPip = useCallback(async (pip: PipData) => {
		setSelectedPip(pip)
		if (pip.pipConnectionStatus === "online") {
			await requestToConnectToPip(pip)
			setIsDropdownOpen(false)
		}
		// TODO: If pip is connected already, make it disconnect
	}, [requestToConnectToPip])

	const getStatusColor = useCallback((status: PipConnectionStatus) => {
		switch (status) {
		case "inactive":
			return "bg-red-500"
		case "online":
			return "bg-blue-500"
		case "connected to other user":
			return "bg-purple-500"
		case "connected":
			return "bg-green-500"
		default:
			return "bg-slate-500"
		}
	}, [])

	if (authClass.isLoggedIn === false) return null

	return (
		<div
			className="relative mr-2"
			ref={dropdownRef}
		>
			<div
				className="flex items-center justify-between bg-slate-200 dark:bg-slate-700 text-black dark:text-white
				rounded-lg px-3 py-1.5 cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-600"
				onClick={() => setIsDropdownOpen((prev) => !prev)}
			>
				<div>{selectedPip?.pipName || "Connect your Pip"}</div>
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className={`h-5 w-5 transform transition-transform ${
							isDropdownOpen ? "rotate-180" : "rotate-0"
						}`}
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
					</svg>
				</div>
			</div>

			{/* Dropdown */}
			{isDropdownOpen && (
				<div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-lg shadow-lg z-50">
					{pipClass.pipData.map((pip) => (
						<div
							key={pip.pipUUID}
							className="flex items-center justify-between px-4 py-2 cursor-pointer
							hover:bg-slate-100 dark:hover:bg-slate-700"
							onClick={() => handleSelectPip(pip)}
						>
							<div className="flex items-center gap-2">
								{/* Status Indicator */}
								<span className={`h-3 w-3 rounded-full ${getStatusColor(pip.pipConnectionStatus)}`}/>
								<span className="text-black dark:text-white">{pip.pipName}</span>
							</div>
							<span className="text-sm text-slate-500">{pip.pipUUID}</span>
						</div>
					))}
					{/* Add Pip Option */}
					<div
						className="px-4 py-2 text-center text-black dark:text-white cursor-pointer
						hover:bg-slate-100 dark:hover:bg-slate-700"
						onClick={() => setIsModalOpen(true)}
					>
						+ Add Pip
					</div>
				</div>
			)}

			{/* Add Pip Modal */}
			{isModalOpen && <AddPipModal toggleModalOpen={() => setIsModalOpen(false)} />}
		</div>
	)
}

export default observer(PipUUIDs)
