"use client"

import { useCallback, useState } from "react"
import { observer } from "mobx-react"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogClose
} from "../shadcn/ui/dialog"
import { Input } from "../shadcn/ui/input"
import { cn } from "../../lib/shadcn/utils"
import { TactileButton } from "../shadcn/ui/tactile-button"
import getDuolingoColors from "../../utils/get-duolingo-colors"
import searchForPipByUUID from "../../utils/pip/search-for-pip-by-uuid"
import requestToConnectToPip from "../../utils/pip/request-to-connect-to-pip"
import { PipUUID } from "@bluedotrobots/common-ts/types/utils"
import { PipConnectionStatus } from "@bluedotrobots/common-ts/types/pip"
import { BotIcon } from "lucide-react"
import pipClass from "../../classes/pip-class"

interface PipSearchResult {
	pipName: string
	pipConnectionStatus: PipConnectionStatus
	pipUUID: string
	isSomeoneConnectedToPip: boolean
}

// eslint-disable-next-line max-lines-per-function, complexity
function ConnectToPipDialog(): React.ReactNode {
	const [pipUUID, setPipUUID] = useState("")
	const [searchResult, setSearchResult] = useState<PipSearchResult | null>(null)
	const [errorMessage, setErrorMessage] = useState("")
	const [isSearching, setIsSearching] = useState(false)
	const [isConnecting, setIsConnecting] = useState(false)
	const colors = getDuolingoColors("humpback")

	const handleClose = useCallback((): void => {
		pipClass.setIsConnectPipDialogOpen(false)
		setPipUUID("")
		setSearchResult(null)
		setErrorMessage("")
		setIsSearching(false)
		setIsConnecting(false)
	}, [])

	const handleInputChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
		const value = e.target.value
		const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

		// Filter to only allowed characters
		const filteredValue = value
			.split("")
			.filter((char): boolean => characters.includes(char))
			.slice(0, 5) // Maximum 5 characters
			.join("")

		setPipUUID(filteredValue)
		setSearchResult(null)
		setErrorMessage("")

		// Auto-search when 5 characters are entered
		if (filteredValue.length !== 5) return
		setIsSearching(true)
		try {
			const result = await searchForPipByUUID(filteredValue as PipUUID)
			if (!result) {
				setErrorMessage("We couldn't find a Pip with that ID. Could you double check your ID?")
			} else {
				setSearchResult({
					pipName: result.pipName || filteredValue,
					pipConnectionStatus: result.pipConnectionStatus,
					pipUUID: filteredValue,
					isSomeoneConnectedToPip: result.isSomeoneConnectedToPip
				})
			}
		} catch (error) {
			console.error("Error searching for pip:", error)
			setErrorMessage("We couldn't find a Pip with that ID. Could you double check your ID?")
		}
		setIsSearching(false)
	}, [])

	const handleConnectToPip = useCallback(async (): Promise<void> => {
		if (!searchResult) return

		setIsConnecting(true)
		try {
			await requestToConnectToPip(searchResult.pipUUID as PipUUID)
			handleClose()
		} catch (error) {
			console.error("Error connecting to pip:", error)
		}
		setIsConnecting(false)
	}, [searchResult, handleClose])

	const handleKeyDown = useCallback((e: React.KeyboardEvent): void => {
		if (e.key === "Escape") {
			handleClose()
		}
	}, [handleClose])

	const getStatusBgColor = (status: PipConnectionStatus): string => {
		switch (status) {
			case "offline":
				return "bg-cardinal"
			case "connected":
				return "bg-chargingGreen"
			case "updating firmware":
			default:
				return "bg-macaw"
		}
	}

	const getStatusText = (status: PipConnectionStatus): string => {
		switch (status) {
			case "offline":
				return "Offline"
			case "connected":
				return "Online"
			case "updating firmware":
				return "Updating"
			default:
				return "Online"
		}
	}

	return (
		<Dialog open={pipClass.isConnectPipDialogOpen} onOpenChange={pipClass.setIsConnectPipDialogOpen}>
			<DialogContent className="w-96 border-none" onClick={(e): void => e.stopPropagation()}>
				<DialogHeader>
					<DialogTitle className="text-2xl">Connect to Pip</DialogTitle>
					<DialogClose />
				</DialogHeader>
				<div className="space-y-4">
					<div>
						<label htmlFor="pipUUID" className="block text-sm font-medium text-wolf mb-2">
							Pip ID
						</label>
						<Input
							id="pipUUID"
							value={pipUUID}
							onChange={handleInputChange}
							placeholder="Enter 5-character Pip ID"
							className="w-full !text-xl h-10"
							onKeyDown={handleKeyDown}
							autoFocus
							maxLength={5}
							disabled={isSearching || isConnecting}
						/>
						{isSearching && (
							<p className="text-sm text-wolf mt-2">Searching...</p>
						)}
					</div>

					{errorMessage && (
						<div className="text-cardinal text-sm">
							{errorMessage}
						</div>
					)}

					{searchResult && (
						<div className="border rounded-lg p-4 space-y-3">
							<div className="flex items-center gap-3">
								<BotIcon className="h-6 w-6 text-wolf" />
								<div className="flex-1">
									<div className="font-medium text-wolf">
										{searchResult.pipName}
									</div>
									<div className="text-sm text-wolf opacity-75">
										{searchResult.pipUUID}
									</div>
								</div>
								<div className={cn(
									"px-3 py-1 rounded-full text-white text-sm font-medium",
									getStatusBgColor(searchResult.pipConnectionStatus)
								)}>
									{getStatusText(searchResult.pipConnectionStatus)}
								</div>
							</div>

							{searchResult.pipConnectionStatus === "connected" && !searchResult.isSomeoneConnectedToPip && (
								<TactileButton
									onClick={handleConnectToPip}
									className={cn("w-full h-10 rounded-xl text-lg text-white", colors.bg)}
									shadowHeight={4}
									shadowClass={colors.shadow2}
									disabled={isConnecting}
								>
									{isConnecting ? "CONNECTING..." : "CONNECT"}
								</TactileButton>
							)}
							{searchResult.pipConnectionStatus === "connected" && searchResult.isSomeoneConnectedToPip && (
								<div className="text-center text-wolf text-sm">
									Someone else is already connected to this Pip
								</div>
							)}
							{searchResult.pipConnectionStatus === "offline" && (
								<div className="text-center text-wolf text-sm">
									This Pip is currently offline
								</div>
							)}
						</div>
					)}
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default observer(ConnectToPipDialog)
