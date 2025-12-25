"use client"

import Link from "next/link"
import { useCallback } from "react"
import { observer } from "mobx-react"
import { SandboxProject } from "@actamayev/lever-labs-common-ts/types/sandbox"
import { ArrowLeft, Star, NotebookPen, Share2 } from "lucide-react"
import { cn } from "../../../../lib/utils"
import CustomTooltip from "../../../custom-tooltip"
import EditableProjectTitle from "./editable-project-title"
import personalInfoClass from "../../../../classes/personal-info-class"
import starSandboxProject from "../../../../utils/sandbox/star-sandbox-project"
import stopCurrentlyRunningCode from "../../../../utils/sandbox/stop-currently-running-code"
import setSandboxNotesOpenStatus from "../../../../utils/personal-info/set-sandbox-notes-open-status"
import stopPollingSensors from "../../../../utils/pip/stop-polling-sensors"
import getDuolingoColors from "../../../../utils/get-duolingo-colors"
import pipClass from "../../../../classes/pip-class"
import ConnectToPipButton from "../../../connect-pip/connect-to-pip-button"
import SandboxBatterySection from "./sandbox-battery-section"
import NetworkWorkbench from "../../../workbench/network/network-workbench"
import ShareSandboxDialog from "./share-sandbox-dialog"
import sandboxClass from "../../../../classes/sandbox-class"

function SandboxProjectHeader({ project } : { project: SandboxProject }): React.ReactNode {
	const leaveSandbox = useCallback((): void => {
		void stopCurrentlyRunningCode(true)
		void stopPollingSensors()
	}, [])

	return (
		<div className="flex items-center justify-between px-4 border-b-2 py-3 border-swan" style={{ height: "74px" }}>
			<div className="flex flex-row items-center justify-center">
				<CustomTooltip
					tooltipTrigger={
						<Link href="/sandbox">
							<button
								className="flex items-center text-question-text hover:bg-polar p-2 rounded-lg mr-2"
								onClick={leaveSandbox}
							>
								<ArrowLeft size={30} className="mr-1" />
							</button>
						</Link>
					}
					tooltipContent="SANDBOX"
				/>

				<EditableProjectTitle project={project} isEditable={project.isMyProject} />
				{project.isMyProject && (
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
				)}
			</div>
			<div className="flex flex-row items-center justify-center space-x-4">
				{pipClass.selectedPip ? (
					<div className="flex flex-row gap-8">
						<SandboxBatterySection />
						<NetworkWorkbench isSandboxPage={true} />
					</div>
				) : (
					<div className="h-1/2">
						<ConnectToPipButton
							colors={getDuolingoColors("humpback")}
							tactileButtonClasses="h-12 text-2xl"
							botIconClasses="size-10!"
						/>
					</div>
				)}
				<CustomTooltip
					tooltipTrigger={
						<button
							onClick={(): void => sandboxClass.openShareDialog(project.sandboxProjectUUID)}
							className="p-2 rounded-md transition-none border-2 text-question-text hover:bg-polar border-swan"
						>
							<Share2 size={30} />
						</button>
					}
					tooltipContent="SHARE"
				/>
				<CustomTooltip
					tooltipTrigger={
						<button
							onClick={setSandboxNotesOpenStatus}
							className={`p-2 rounded-md transition-none border-2 ${
								personalInfoClass.sandboxNotesOpen
									? "bg-standard-background-hover text-macaw border-standard-background-hover"
									: "text-question-text hover:bg-polar border-swan"
							}`}
							title={personalInfoClass.sandboxNotesOpen ? "Hide Code" : "Show Code"}
						>
							<NotebookPen size={30} />
						</button>
					}
					tooltipContent={personalInfoClass.sandboxNotesOpen ? "CLOSE SIDE PANEL" : "OPEN SIDE PANEL"}
				/>
			</div>
			<ShareSandboxDialog />
		</div>
	)
}

export default observer(SandboxProjectHeader)
