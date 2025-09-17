"use client"

import { useState } from "react"
import { Wifi } from "lucide-react"
import { observer } from "mobx-react"
import { Button } from "../../../shadcn/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../../shadcn/ui/dialog"

interface ForgetNetworkDialogProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	networkSSID: string
	onConfirm: () => Promise<void>
}

function ForgetNetworkDialog({ open, onOpenChange, networkSSID, onConfirm }: ForgetNetworkDialogProps): React.ReactNode {
	const [isProcessing, setIsProcessing] = useState(false)

	const handleForget = async (): Promise<void> => {
		setIsProcessing(true)
		try {
			await onConfirm()
			onOpenChange(false)
		} catch (error) {
			console.error("Failed to forget network:", error)
		} finally {
			setIsProcessing(false)
		}
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader className="text-center flex flex-col items-center">
					<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-macaw">
						<Wifi className="h-8 w-8 text-white" />
					</div>
					<DialogTitle className="text-xl font-semibold">
						Forget Wi-Fi Network "{networkSSID}"?
					</DialogTitle>
					<DialogDescription className="text-sm text-muted-foreground mt-2 text-center">
						Your Pip will no longer join this Wi-Fi network.
					</DialogDescription>
				</DialogHeader>

				<div className="flex flex-col sm:flex-row gap-2 justify-center items-center pt-6">
					<Button
						variant="outline"
						onClick={(): void => onOpenChange(false)}
						disabled={isProcessing}
						className="w-full sm:w-auto"
					>
						Cancel
					</Button>
					<Button
						variant="destructive"
						onClick={handleForget}
						disabled={isProcessing}
						className="w-full sm:w-auto"
					>
						{isProcessing ? "Forgetting..." : "Forget"}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default observer(ForgetNetworkDialog)
