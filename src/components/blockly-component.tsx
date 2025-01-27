import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import * as Blockly from "blockly"
import { observer } from "mobx-react"
import { BlocklyWorkspace } from "react-blockly"
import { cppGenerator } from "../utils/cpp/cpp-generator"
import getWorkspaceConfig from "../utils/blockly/workspace-config"
import useDefaultSiteTheme from "../hooks/memos/default-site-theme"

const initialXml = `
    <xml xmlns="https://developers.google.com/blockly/xml"/>
`

interface Props {
	toolboxConfig: Blockly.utils.toolbox.ToolboxDefinition
	setCppCode: React.Dispatch<React.SetStateAction<string>>

}

function EnhancedBlocklyComponent (props: Props) {
	const { toolboxConfig, setCppCode } = props
	const [blocklyXml, setBlocklyXml] = useState(initialXml)
	const defaultSiteTheme = useDefaultSiteTheme()
	const isDarkMode = defaultSiteTheme === "dark"
	const containerRef = useRef<HTMLDivElement>(null)
	const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null)

	const workspaceConfiguration = useMemo(() => {
		return getWorkspaceConfig(isDarkMode)
	}, [isDarkMode])

	useEffect(() => {
		if (!containerRef.current) return

		const resizeObserver = new ResizeObserver(() => {
			if (workspaceRef.current) {
				Blockly.svgResize(workspaceRef.current)
			}
		})

		resizeObserver.observe(containerRef.current)

		return () => {
			resizeObserver.disconnect()
		}
	}, [])

	const handleWorkspaceChange = useCallback((workspace: Blockly.WorkspaceSvg) => {
		workspaceRef.current = workspace
		const newXml = Blockly.Xml.domToText(
			Blockly.Xml.workspaceToDom(workspace)
		)
		const cppCode = cppGenerator.workspaceToCode(workspace)

		setBlocklyXml(newXml)
		setCppCode(cppCode)
	}, [setCppCode])

	return (
		<div
			ref={containerRef}
			className="h-1/2 relative z-0 rounded-lg overflow-hidden border border-border"
		>
			<BlocklyWorkspace
				toolboxConfiguration={toolboxConfig}
				initialXml={blocklyXml}
				workspaceConfiguration={workspaceConfiguration}
				className="h-full transition-all duration-300"
				onWorkspaceChange={handleWorkspaceChange}
			/>
		</div>
	)
}

export default observer(EnhancedBlocklyComponent)
