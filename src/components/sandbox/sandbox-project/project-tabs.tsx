"use client"

import { observer } from "mobx-react"
import debounce from "lodash-es/debounce"
import { useRef, useEffect } from "react"
import { ProjectUUID, SandboxProject } from "@bluedotrobots/common-ts"
import { Textarea } from "../../shadcn/ui/textarea"
import SandboxChatInterface from "./sandbox-chat-interface"
import { Tabs, TabsList, TabsContent, TabsTrigger } from "../../shadcn/ui/tabs"
import editSandboxProjectNotes from "../../../utils/sandbox/edit-sandbox-project-notes"
import sandboxClass from "../../../classes/sandbox-class"

interface ProjectTabsProps {
	project: SandboxProject
	cppCode: string
}

function ProjectTabs({ project, cppCode }: ProjectTabsProps) {
	// Create debounced save function - 500ms delay
	const debouncedSaveNotes = useRef(
		debounce((uuid: ProjectUUID, newNotes: string) => {
			void editSandboxProjectNotes(uuid, newNotes)
		}, 500)
	).current

	// Clean up debounce on unmount
	useEffect(() => {
		return () => debouncedSaveNotes.cancel()
	}, [debouncedSaveNotes])

	const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const newNotes = e.target.value
		sandboxClass.updateProjectNotes(project.projectUUID, newNotes)
		debouncedSaveNotes(project.projectUUID, newNotes)
	}

	return (
		<Tabs defaultValue="code" className="w-full h-full flex flex-col">
			<TabsList className="mb-2 bg-polar">
				<TabsTrigger value="code">Code</TabsTrigger>
				<TabsTrigger value="notes">Notes</TabsTrigger>
				<TabsTrigger value="chat">Chat</TabsTrigger>
			</TabsList>

			<TabsContent value="code" className="flex-1 overflow-auto bg-polar p-4 rounded">
				<pre className="text-sm font-mono whitespace-pre-wrap">
					{cppCode || "// Your code will appear here"}
				</pre>
			</TabsContent>

			<TabsContent value="notes" className="flex-1" data-notes-section="true">
				<Textarea
					placeholder="Add notes about your project here..."
					className="w-full h-full min-h-[300px] bg-polar p-4 resize-none border-none rounded"
					value={project.projectNotes || ""}
					onChange={handleNotesChange}
				/>
			</TabsContent>

			<TabsContent value="chat" className="flex-1 min-h-0" data-chat-section="true">
				<SandboxChatInterface
					projectUUID={project.projectUUID}
					cppCode={cppCode}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default observer(ProjectTabs)
