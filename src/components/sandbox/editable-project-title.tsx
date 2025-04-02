"use client"

import debounce from "lodash-es/debounce"
import { useState, useRef, useEffect, KeyboardEvent } from "react"
import useEditSandboxProjectName from "../../hooks/sandbox/edit-sandbox-project-name"

interface EditableProjectTitleProps {
	projectUUID: ProjectUUID
	initialName: string | null
}

export default function EditableProjectTitle({ projectUUID, initialName }: EditableProjectTitleProps) {
	const [isEditing, setIsEditing] = useState(false)
	const [isHovering, setIsHovering] = useState(false)
	const [projectName, setProjectName] = useState(initialName || "Untitled Project")
	const inputRef = useRef<HTMLInputElement>(null)
	const editProjectName = useEditSandboxProjectName()

	// Create a debounced function for updating the project name
	// This will only send the API request after the user stops typing for 500ms
	const debouncedUpdateName = useRef(
		debounce((uuid: ProjectUUID, name: string) => {
			editProjectName(uuid, name)
		}, 500)
	).current

	// Focus the input when entering edit mode
	useEffect(() => {
		if (isEditing && inputRef.current) {
			inputRef.current.focus()
			inputRef.current.select()
		}
	}, [isEditing])

	// Clean up the debounce on unmount
	useEffect(() => {
		return () => {
			debouncedUpdateName.cancel()
		}
	}, [debouncedUpdateName])

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newName = e.target.value
		setProjectName(newName)

		// Trigger the debounced update
		if (newName.trim()) {
			debouncedUpdateName(projectUUID, newName)
		}
	}

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		// Exit edit mode on Enter or Escape
		if (e.key === "Enter" || e.key === "Escape") {
			setIsEditing(false)

			// If escape was pressed, revert to the previous value
			if (e.key === "Escape") {
				setProjectName(initialName || "Untitled Project")
			}

			e.preventDefault()
		}
	}

	const handleBlur = () => {
		setIsEditing(false)

		// If the name is empty, revert to the default
		if (!projectName.trim()) {
			setProjectName(initialName || "Untitled Project")
		}
	}

	return (
		<div
			className="relative h-10"
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
		>
			{isEditing ? (
				<input
					ref={inputRef}
					type="text"
					value={projectName}
					onChange={handleNameChange}
					onKeyDown={handleKeyDown}
					onBlur={handleBlur}
					className="text-xl font-medium w-full max-w-md outline-none border-2 border-blue-400 px-2 py-1 rounded"
					autoFocus
				/>
			) : (
				<h1
					className={`text-xl font-medium truncate max-w-md cursor-pointer px-2 py-1 ${
						isHovering ? "border-2 border-gray-300 rounded" : "border-2 border-transparent"
					}`}
					onClick={() => setIsEditing(true)}
					title="Click to edit project name"
				>
					{projectName}
				</h1>
			)}
		</div>
	)
}
