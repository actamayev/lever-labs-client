"use client"

import * as Blockly from "blockly"
import { observer } from "mobx-react"
import { BlocklyWorkspace } from "react-blockly"
import { useEffect, useMemo, useRef } from "react"
import { BlocklyJson } from "@bluedotrobots/common-ts"
import { cn } from "../../../lib/shadcn/utils"
import personalInfoClass from "../../../classes/personal-info-class"
import initializeBlocks from "../../../utils/blockly/initialize-blocks"
import useSensorPollingUseEffect from "../../../utils/sandbox/sensor-polling-use-effect"
import getWorkspaceConfig, { darkTheme, lightTheme } from "../../../utils/blockly/workspace-config"

interface Props {
	blocklyJson: BlocklyJson
	extraClasses?: string
}

// eslint-disable-next-line max-lines-per-function
function ViewOnlySandbox(props: Props) {
	const {
		blocklyJson,
		extraClasses = "h-1/2",
	} = props
	const isDarkMode = personalInfoClass.defaultSiteTheme === "dark"
	const containerRef = useRef<HTMLDivElement>(null)
	const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null)
	useSensorPollingUseEffect()

	const workspaceConfiguration = useMemo(() => {
		return getWorkspaceConfig(isDarkMode, true)
	}, [isDarkMode])

	useEffect(() => {
		if (workspaceRef.current) {
			workspaceRef.current.setTheme(isDarkMode ? darkTheme : lightTheme)
		}
	}, [isDarkMode])

	useEffect(() => initializeBlocks(), [])

	return (
		<div
			ref={containerRef}
			className={cn("relative z-0 rounded-lg overflow-hidden border-2 border-swan", extraClasses)}
		>
			<BlocklyWorkspace
				initialJson={blocklyJson}
				workspaceConfiguration={workspaceConfiguration}
				className="h-full duration-0"
			/>
		</div>
	)
}

export default observer(ViewOnlySandbox)
