"use client"

import { useCallback, useState, useEffect, useRef } from "react"
import { observer } from "mobx-react"
import { BotIcon, WifiHighIcon } from "lucide-react"
import { cn } from "../../lib/shadcn/utils"
import { TactileButton } from "../shadcn/ui/tactile-button"
import getDuolingoColors from "../../utils/get-duolingo-colors"
import requestToConnectToPip from "../../utils/pip/request-to-connect-to-pip"
import { PipUUID } from "@lever-labs/common-ts/types/utils"
import pipClass from "../../classes/pip-class"
import { RetrieveIsPipUUIDValidResponse } from "@lever-labs/common-ts/types/api"
import searchPipByUUIDUtil from "../../utils/pip/search-pip-by-uuid-util"
import { ACCEPTABLE_PIP_ID_CHARACTERS } from "@lever-labs/common-ts/types/utils/constants"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../shadcn/ui/input-otp"

// eslint-disable-next-line max-lines-per-function
function WifiConnectionSection(): React.ReactNode {
	const [isConnecting, setIsConnecting] = useState(false)
	const colors = getDuolingoColors("humpback")
	const sectionRef = useRef<HTMLDivElement>(null)

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
		const input = document.querySelector("input[autocomplete='one-time-code']") as HTMLInputElement
		if (input) {
			input.focus()
		}
	}, [])

	// Auto-focus the input when dialog opens or when WiFi tab becomes active
	useEffect((): (() => void) | void => {
		if (!pipClass.isConnectPipDialogOpen || !sectionRef.current) return

		const focusInput = (): void => {
			const input = document.querySelector("input[autocomplete='one-time-code']") as HTMLInputElement
			if (input) {
				input.focus()
			}
		}

		// Use IntersectionObserver to detect when the WiFi section becomes visible
		const intersectionObserver = new IntersectionObserver(
			(entries): void => {
				entries.forEach((entry): void => {
					if (entry.isIntersecting) {
						// Use double requestAnimationFrame for maximum speed
						requestAnimationFrame((): void => {
							requestAnimationFrame(focusInput)
						})
					}
				})
			},
			{ threshold: 0.1 }
		)

		intersectionObserver.observe(sectionRef.current)

		return (): void => {
			intersectionObserver.disconnect()
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
				return "bg-charging-green"
			case "connected to serial to you":
				return "bg-charging-green"
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
		<div ref={sectionRef} className="space-y-4">
			<div>
				<label htmlFor="pipUUID" className="block text-sm font-medium text-wolf mb-2">
					Pip ID
				</label>
				<div onClick={handleSlotClick} className="cursor-text">
					<InputOTP
						maxLength={5}
						value={pipClass.pipUUIDSearchTerm}
						onChange={handleInputChange}
						pattern={`[${ACCEPTABLE_PIP_ID_CHARACTERS}]`}
						onKeyDown={handleKeyDown}
						containerClassName="justify-center"
						autoComplete="one-time-code"
					>
						<InputOTPGroup className="gap-2">
							<InputOTPSlot
								index={0}
								className={cn(
									"w-12 h-14 text-xl border-2 border-swan rounded-lg",
									"transition-all"
								)}
							/>
							<InputOTPSlot
								index={1}
								className={cn(
									"w-12 h-14 text-xl border-2 border-swan rounded-lg",
									"transition-all"
								)}
							/>
							<InputOTPSlot
								index={2}
								className={cn(
									"w-12 h-14 text-xl border-2 border-swan rounded-lg",
									"transition-all"
								)}
							/>
							<InputOTPSlot
								index={3}
								className={cn(
									"w-12 h-14 text-xl border-2 border-swan rounded-lg",
									"transition-all"
								)}
							/>
							<InputOTPSlot
								index={4}
								className={cn(
									"w-12 h-14 text-xl border-2 border-swan rounded-lg",
									"transition-all"
								)}
							/>
						</InputOTPGroup>
					</InputOTP>
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
				<div className="border-2 border-swan rounded-lg p-4 space-y-3">
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
								<WifiHighIcon className="size-8! text-white mb-2" />
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
