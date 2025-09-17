"use client"

import Link from "next/link"
import { observer } from "mobx-react"
import { SandboxProject } from "@bluedotrobots/common-ts/types/sandbox"
import { ArrowLeft, Star, NotebookPen } from "lucide-react"
import { cn } from "../../../lib/shadcn/utils"
import CustomTooltip from "../../custom-tooltip"
import EditableProjectTitle from "./editable-project-title"
import personalInfoClass from "../../../classes/personal-info-class"
import starSandboxProject from "../../../utils/sandbox/star-sandbox-project"
import stopCurrentlyRunningCode from "../../../utils/sandbox/stop-currently-running-code"
import setSandboxNotesOpenStatus from "../../../utils/personal-info/set-sandbox-notes-open-status"
import stopPollingSensors from "../../../utils/pip/stop-polling-sensors"
import getDuolingoColors from "../../../utils/get-duolingo-colors"
import pipClass from "../../../classes/pip-class"
import BatteryWorkbench from "../../workbench/battery/battery-workbench"
import SoundWorkbench from "../../workbench/sound/sound-workbench"
import NetworkWorkbench from "../../workbench/network/network-workbench"
import ConnectToPipButton from "../../connect-pip/connect-to-pip-button"

function SandboxProjectHeader({ project } : { project: SandboxProject }): React.ReactNode {
	const leaveSandbox = (): void => {
		void stopCurrentlyRunningCode(true)
		void stopPollingSensors()
	}

	return (
		<div className="flex items-center justify-between px-4 border-b-2 py-3 border-swan" style={{ height: "74px" }}>
			<div className="flex flex-row items-center justify-center">
				<CustomTooltip
					tooltipTrigger={
						<Link href="/sandbox">
							<button
								className="flex items-center text-questionText hover:bg-polar p-2 rounded-lg mr-2"
								onClick={leaveSandbox}
							>
								<ArrowLeft size={30} className="mr-1" />
							</button>
						</Link>
					}
					tooltipContent="SANDBOX"
				/>

				<EditableProjectTitle project={project} />
				<CustomTooltip
					tooltipTrigger={
						<button
							onClick={(): Promise<void> => starSandboxProject(project.sandboxProjectUUID)}
							className={cn(
								"p-2 rounded-md transition-none hover:bg-polar",
								project.isStarred ? "text-bee" : ""
							)}
						>
							<Star
								size={30}
								className={project.isStarred ? "fill-bee" : ""}
							/>
						</button>
					}
					tooltipContent="STAR"
				/>
			</div>
			<div className="flex flex-row items-center justify-center space-x-4">
				{(!pipClass.selectedPip && !pipClass.pipPluggedInSerial) ? (
					<div className="h-1/2">
						<ConnectToPipButton
							colors={getDuolingoColors("humpback")}
							tactileButtonClasses="h-12 text-2xl"
							botIconClasses="!size-10"
						/>
					</div>
				) : (
					<div className="relative p-3 z-50">
						<div className="flex flex-row justify-between">
							<BatteryWorkbench />
							<NetworkWorkbench />
							<SoundWorkbench />
						</div>
					</div>
				)}
				<CustomTooltip
					tooltipTrigger={
						<button
							onClick={setSandboxNotesOpenStatus}
							className={`p-2 rounded-md transition-none border-2 ${
								personalInfoClass.sandboxNotesOpen
									? "bg-standardBackgroundHover text-macaw border-standardBackgroundHover"
									: "text-questionText hover:bg-polar border-swan"
							}`}
							title={personalInfoClass.sandboxNotesOpen ? "Hide Code" : "Show Code"}
						>
							<NotebookPen size={30} />
						</button>
					}
					tooltipContent={personalInfoClass.sandboxNotesOpen ? "CLOSE SIDE PANEL" : "OPEN SIDE PANEL"}
				/>
			</div>
		</div>
	)
}

export default observer(SandboxProjectHeader)
