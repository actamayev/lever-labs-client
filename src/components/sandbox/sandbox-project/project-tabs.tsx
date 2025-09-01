"use client"

import { observer } from "mobx-react"
import debounce from "lodash-es/debounce"
import { useRef, useEffect, useState, useMemo } from "react"
import { ProjectUUID } from "@bluedotrobots/common-ts"
import { Textarea } from "../../shadcn/ui/textarea"
import SandboxChatInterface from "./sandbox-chat-interface"
import sandboxClass from "../../../classes/sandbox-class"
import { Tabs, TabsList, TabsContent, TabsTrigger } from "../../shadcn/ui/tabs"
import editSandboxProjectNotes from "../../../utils/sandbox/edit-sandbox-project-notes"

function ProjectTabs({ projectUUID }: { projectUUID: ProjectUUID }): React.ReactNode {
	const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
	const cppCode = useMemo((): string => {
		return sandboxClass.getCppCode(projectUUID)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [projectUUID, sandboxClass.sandboxProjects.get(projectUUID)?.cppCode])

	// Create debounced save function - 500ms delay
	const debouncedSaveNotes = useRef(
		debounce(async (uuid: ProjectUUID, newNotes: string): Promise<void> => {
			try {
				await editSandboxProjectNotes(uuid, newNotes)
				setHasUnsavedChanges(false) // Clear unsaved changes flag on successful save
			} catch (error) {
				// Keep unsaved changes flag true if save failed
				console.error("Failed to save notes:", error)
			}
		}, 500)
	).current

	// Clean up debounce on unmount
	useEffect((): () => void => {
		return (): void => debouncedSaveNotes.cancel()
	}, [debouncedSaveNotes])

	// Handle beforeunload warning
	useEffect((): () => void => {
		const handleBeforeUnload = (e: BeforeUnloadEvent): void => {
			if (hasUnsavedChanges) {
				e.preventDefault()
				e.returnValue = "Changes you made may not be saved."
			}
		}

		if (hasUnsavedChanges) {
			window.addEventListener("beforeunload", handleBeforeUnload)
		}

		return (): void => {
			window.removeEventListener("beforeunload", handleBeforeUnload)
		}
	}, [hasUnsavedChanges])

	const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
		const newNotes = e.target.value
		sandboxClass.updateProjectNotes(projectUUID, newNotes)
		setHasUnsavedChanges(true) // Set unsaved changes flag when user types
		debouncedSaveNotes(projectUUID, newNotes)
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
					value={sandboxClass.getProjectNotes(projectUUID) || ""}
					onChange={handleNotesChange}
				/>
			</TabsContent>

			<TabsContent value="chat" className="flex-1 min-h-0" data-chat-section="true">
				<SandboxChatInterface projectUUID={projectUUID} />
			</TabsContent>
		</Tabs>
	)
}

export default observer(ProjectTabs)
