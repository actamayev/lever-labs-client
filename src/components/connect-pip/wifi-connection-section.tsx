"use client"

import { useCallback, useState } from "react"
import { observer } from "mobx-react"
import { BotIcon, WifiHighIcon } from "lucide-react"
import { Input } from "../shadcn/ui/input"
import { cn } from "../../lib/shadcn/utils"
import { TactileButton } from "../shadcn/ui/tactile-button"
import getDuolingoColors from "../../utils/get-duolingo-colors"
import requestToConnectToPip from "../../utils/pip/request-to-connect-to-pip"
import { PipUUID } from "@lever-labs/common-ts/types/utils"
import pipClass from "../../classes/pip-class"
import { RetrieveIsPipUUIDValidResponse } from "@lever-labs/common-ts/types/api"
import searchPipByUUIDUtil from "../../utils/pip/search-pip-by-uuid-util"

// eslint-disable-next-line max-lines-per-function
function WifiConnectionSection(): React.ReactNode {
	const [isConnecting, setIsConnecting] = useState(false)
	const colors = getDuolingoColors("humpback")

	const handleInputChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
		const value = e.target.value
		const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

		// Filter to only allowed characters
		const filteredValue = value
			.split("")
			.filter((char): boolean => characters.includes(char))
			.slice(0, 5) // Maximum 5 characters
			.join("")

		pipClass.setPipUUIDSearchTerm(filteredValue)
		pipClass.setSearchResult(null)
		pipClass.setErrorMessage("")

		// Auto-search when 5 characters are entered
		if (filteredValue.length !== 5) return
		await searchPipByUUIDUtil(filteredValue, (): void => {
			// Only blur the input if we found a result
			e.target.blur()
		})
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
				<Input
					id="pipUUID"
					value={pipClass.pipUUIDSearchTerm}
					onChange={handleInputChange}
					placeholder="Enter 5-character Pip ID"
					className="w-full !text-xl h-10"
					onKeyDown={handleKeyDown}
					autoFocus
					maxLength={5}
					autoComplete="one-time-code"
				/>
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
