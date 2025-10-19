"use client"

import { observer } from "mobx-react"
import { WifiHighIcon, UsbIcon } from "lucide-react"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogClose
} from "../shadcn/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../shadcn/ui/tabs"
import pipClass from "../../classes/pip-class"
import BrowserCompatibility from "./browser-compatibility"
import UsbConnectionSection from "./usb-connection-section"
import WifiConnectionSection from "./wifi-connection-section"

function ConnectToPipDialog(): React.ReactNode {
	return (
		<Dialog open={pipClass.isConnectPipDialogOpen} onOpenChange={pipClass.setIsConnectPipDialogOpen}>
			<DialogContent className="w-96 border-none" onClick={(e): void => e.stopPropagation()}>
				<DialogHeader>
					<DialogTitle className="text-2xl">Connect to Pip</DialogTitle>
					<DialogClose />
				</DialogHeader>
				<Tabs defaultValue="wifi" className="w-full">
					<TabsList className="mb-4 bg-polar w-full grid grid-cols-2">
						<TabsTrigger value="wifi" className="flex items-center justify-center gap-2">
							<WifiHighIcon className="h-4 w-4 mb-1" />
							WiFi
						</TabsTrigger>
						<TabsTrigger value="usb" className="flex items-center justify-center gap-2">
							<UsbIcon className="h-4 w-4" />
							USB
						</TabsTrigger>
					</TabsList>

					<TabsContent value="wifi">
						<WifiConnectionSection />
					</TabsContent>

					<TabsContent value="usb" className="space-y-4">
						<UsbConnectionSection />
						<BrowserCompatibility />
					</TabsContent>
				</Tabs>
			</DialogContent>
		</Dialog>
	)
}

export default observer(ConnectToPipDialog)
