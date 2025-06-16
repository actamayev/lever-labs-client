"use client"

import Link from "next/link"
import { observer } from "mobx-react"
import { SandboxProject } from "@bluedotrobots/common-ts"
import { ArrowLeft, Star, NotebookPen } from "lucide-react"
import { cn } from "../../../lib/shadcn/utils"
import CustomTooltip from "../../custom-tooltip"
import ConnectUsbButton from "../../connect-usb-button"
import EditableProjectTitle from "./editable-project-title"
import personalInfoClass from "../../../classes/personal-info-class"
import useStarSandboxProject from "../../../hooks/sandbox/star-sandbox-project"
import useStopCurrentlyRunningCode from "../../../hooks/sandbox/stop-currently-running-code"
import setSandboxNotesOpenStatus from "../../../utils/personal-info/set-sandbox-notes-open-status"

// eslint-disable-next-line max-lines-per-function, complexity
function SandboxProjectHeader({ project } : { project: SandboxProject }) {
	const starSandboxProject = useStarSandboxProject()
	const stopCurrentlyRunningCode = useStopCurrentlyRunningCode()

	return (
		<div className="flex items-center justify-between px-4 border-b-2 py-3 border-swan" style={{ height: "74px" }}>
			<div className="flex flex-row items-center justify-center">
				<CustomTooltip
					tooltipTrigger={
						<Link href="/sandbox">
							<button
								className="flex items-center text-questionText hover:bg-polar p-2 rounded-lg mr-2"
								onClick={() => void stopCurrentlyRunningCode()}
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
							onClick={() => starSandboxProject(project.projectUUID)}
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
				<ConnectUsbButton />
				<CustomTooltip
					tooltipTrigger={
						<button
							onClick={setSandboxNotesOpenStatus}
							className={`p-2 rounded-md transition-none ${
								personalInfoClass.sandboxNotesOpen
									? "bg-standardBackgroundHover text-macaw"
									: "text-questionText hover:bg-polar"
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
