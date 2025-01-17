import { BlocklyWorkspace } from "react-blockly"
import { BlocklyWorkspaceProps } from "react-blockly/dist/BlocklyWorkspaceProps"

export default function BlocklyComponent (props: BlocklyWorkspaceProps) {
	return <BlocklyWorkspace {...props} />
}
