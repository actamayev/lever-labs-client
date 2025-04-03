"use client"

import debounce from "lodash-es/debounce"
import { useState, useRef, useEffect } from "react"
import { Textarea } from "../../shadcn/ui/textarea"
import { Tabs, TabsList, TabsContent, TabsTrigger } from "../../shadcn/ui/tabs"
import useEditSandboxProjectNotes from "../../../hooks/sandbox/edit-sandbox-project-notes"

interface ProjectTabsProps {
	project: SandboxProject
	cppCode: string
}

export default function ProjectTabs({ project, cppCode }: ProjectTabsProps) {
	const [notes, setNotes] = useState(project.projectNotes || "")
	const editSandboxProjectNotes = useEditSandboxProjectNotes()

	// Create debounced save function - 500ms delay
	const debouncedSaveNotes = useRef(
		debounce((uuid: ProjectUUID, newNotes: string) => {
			editSandboxProjectNotes(uuid, newNotes)
		}, 500)
	).current

	// Clean up debounce on unmount
	useEffect(() => {
		return () => debouncedSaveNotes.cancel()
	}, [debouncedSaveNotes])

	// Update local state if projectNotes changes from external source
	useEffect(() => {
		setNotes(project.projectNotes || "")
	}, [project.projectNotes])

	const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const newNotes = e.target.value
		setNotes(newNotes)
		debouncedSaveNotes(project.projectUUID, newNotes)
	}

	return (
		<Tabs defaultValue="code" className="w-full h-full flex flex-col">
			<TabsList className="mb-2">
				<TabsTrigger value="code">Code</TabsTrigger>
				<TabsTrigger value="notes">Notes</TabsTrigger>
			</TabsList>

			<TabsContent value="code" className="flex-1 overflow-auto bg-polar p-4 rounded">
				<pre className="text-sm font-mono whitespace-pre-wrap">
					{cppCode || "// Your code will appear here"}
				</pre>
			</TabsContent>

			<TabsContent value="notes" className="flex-1">
				<Textarea
					placeholder="Add notes about your project here..."
					className="w-full h-full min-h-[300px] bg-polar p-4 resize-none"
					value={notes}
					onChange={handleNotesChange}
				/>
			</TabsContent>
		</Tabs>
	)
}
