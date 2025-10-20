"use client"

import { useCallback, useState } from "react"
import { observer } from "mobx-react"
import { BotIcon, WifiHighIcon } from "lucide-react"
import { OTPInput } from "input-otp"
import { cn } from "../../lib/shadcn/utils"
import { TactileButton } from "../shadcn/ui/tactile-button"
import getDuolingoColors from "../../utils/get-duolingo-colors"
import requestToConnectToPip from "../../utils/pip/request-to-connect-to-pip"
import { PipUUID } from "@lever-labs/common-ts/types/utils"
import pipClass from "../../classes/pip-class"
import { RetrieveIsPipUUIDValidResponse } from "@lever-labs/common-ts/types/api"
import searchPipByUUIDUtil from "../../utils/pip/search-pip-by-uuid-util"
import { ACCEPTABLE_PIP_ID_CHARACTERS } from "@lever-labs/common-ts/types/utils/constants"

// eslint-disable-next-line max-lines-per-function
function WifiConnectionSection(): React.ReactNode {
	const [isConnecting, setIsConnecting] = useState(false)
	const colors = getDuolingoColors("humpback")

	const handleInputChange = useCallback(async (value: string): Promise<void> => {
		// Manually filter to only allowed characters
		const filteredValue = value
			.split("")
			.filter((char): boolean => ACCEPTABLE_PIP_ID_CHARACTERS.includes(char))
			.join("")

		pipClass.setPipUUIDSearchTerm(filteredValue)
		pipClass.setSearchResult(null)
		pipClass.setErrorMessage("")

		if (filteredValue.length === 5) {
			await searchPipByUUIDUtil(filteredValue)
		}
	}, [])

	const handleSlotClick = useCallback((): void => {
		console.log("Slot clicked!")
		const input = document.querySelector("[data-input-otp]") as HTMLInputElement
		console.log("Found input:", input)
		if (input) {
			input.focus()
			console.log("Focused input")
		}
	}, [])

	const handleConnectToPip = useCallback(async (): Promise<void> => {
		if (!pipClass.searchResult) return

		setIsConnecting(true)
		try {
			await requestToConnectToPip(pipClass.searchResult.pipUUID as PipUUID)
		} catch (error) {
			console.error("Error connecting to pip:", error)
		}
		setIsConnecting(false)
	}, [])

	const handleKeyDown = useCallback((e: React.KeyboardEvent): void => {
		if (e.key !== "Escape") return
		pipClass.setIsConnectPipDialogOpen(false)
		pipClass.setPipUUIDSearchTerm("")
		pipClass.setSearchResult(null)
		pipClass.setErrorMessage("")
		pipClass.setIsSearching(false)
		setIsConnecting(false)
	}, [])

	const getStatusBgColor = (status: RetrieveIsPipUUIDValidResponse): string => {
		switch (status.pipConnectionStatus) {
			case "offline":
				return "bg-cardinal"
			case "online":
			case "connected online to another user":
				return "bg-macaw"
			case "connected to serial to another user":
				return "bg-beetle"
			case "connected online to you":
				return "bg-chargingGreen"
			case "connected to serial to you":
				return "bg-chargingGreen"
			default:
				return "bg-cardinal"
		}
	}

	const getStatusText = (status: RetrieveIsPipUUIDValidResponse): string => {
		switch (status.pipConnectionStatus) {
			case "offline":
				return "Offline"
			case "online":
			case "connected online to another user":
				return "Online"
			case "connected to serial to another user":
				return "Connected to another user via USB"
			case "connected to serial to you":
				return "Connected to you via USB"
			case "connected online to you":
				return "Connected"
			default:
				return "Unknown status"
		}
	}

	return (
		<div className="space-y-4">
			<div>
				<label htmlFor="pipUUID" className="block text-sm font-medium text-wolf mb-2">
					Pip ID
				</label>
				<div onClick={handleSlotClick} className="cursor-text">
					<OTPInput
						value={pipClass.pipUUIDSearchTerm}
						onChange={handleInputChange}
						maxLength={5}
						pattern={`[${ACCEPTABLE_PIP_ID_CHARACTERS}]`}
						onKeyDown={handleKeyDown}
						containerClassName="flex gap-2 justify-center"
						render={({ slots }): React.ReactNode => (
							<>
								{slots.map((slot, idx): React.ReactNode => (
									<div
										key={idx}
										className={cn(
											"relative w-12 h-14 text-xl",
											"flex items-center justify-center",
											"border-2 border-swan rounded-lg",
											"transition-all",
											slot.isActive && "border-humpback"
										)}
									>
										{slot.char !== null && <div>{slot.char}</div>}
										{slot.hasFakeCaret && (
											<div className="absolute inset-0 flex items-center justify-center">
												<div className="w-px h-8 bg-humpback animate-pulse" />
											</div>
										)}
									</div>
								))}
							</>
						)}
					/>
				</div>
				{pipClass.isSearching && (
					<p className="text-sm text-wolf mt-2">Searching...</p>
				)}
			</div>

			{pipClass.errorMessage && (
				<div className="text-cardinal text-sm">
					{pipClass.errorMessage}
				</div>
			)}

			{pipClass.searchResult && (
				<div className="border rounded-lg p-4 space-y-3">
					<div className="flex items-center gap-3">
						<BotIcon className="h-6 w-6 text-wolf" />
						<div className="flex-1">
							<div className="font-medium text-wolf">
								{pipClass.searchResult.pipName}
							</div>
							<div className="text-sm text-wolf opacity-75">
								{pipClass.searchResult.pipUUID}
							</div>
						</div>
						<div className={cn(
							"px-3 py-1 rounded-full text-white text-sm font-medium",
							getStatusBgColor(pipClass.searchResult)
						)}>
							{getStatusText(pipClass.searchResult)}
						</div>
					</div>

					{(
						pipClass.searchResult.pipConnectionStatus === "online" ||
						pipClass.searchResult.pipConnectionStatus === "connected online to another user"
					) && (
						<TactileButton
							onClick={handleConnectToPip}
							className={cn("w-full h-10 rounded-xl text-lg text-white", colors.bg)}
							shadowHeight={4}
							shadowClass={colors.shadow2}
							disabled={isConnecting}
						>
							<div className="flex items-center justify-center gap-2">
								<WifiHighIcon className="!size-8 text-white mb-2" />
								{isConnecting ? "CONNECTING..." : "CONNECT"}
							</div>
						</TactileButton>
					)}
				</div>
			)}
		</div>
	)
}

export default observer(WifiConnectionSection)
