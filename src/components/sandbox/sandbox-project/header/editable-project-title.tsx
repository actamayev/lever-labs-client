"use client"
import { SandboxProject } from "@lever-labs/common-ts/types/sandbox"
import { useState, useRef, useEffect, KeyboardEvent } from "react"
import { Input } from "../../../ui/input"
import editSandboxProjectName from "../../../../utils/sandbox/edit-sandbox-project-name"

// eslint-disable-next-line max-lines-per-function
export default function EditableProjectTitle({ project }: { project: SandboxProject }): React.ReactNode {
	const [isEditing, setIsEditing] = useState(false)
	const [isHovering, setIsHovering] = useState(false)
	const [projectName, setProjectName] = useState(project.projectName || "Untitled Project")
	const [editingName, setEditingName] = useState("") // Temporary state for editing
	const inputRef = useRef<HTMLInputElement>(null)
	const measureRef = useRef<HTMLSpanElement>(null)

	// Adjust input width based on content
	const adjustInputWidth = (): void => {
		if (inputRef.current && measureRef.current) {
			const width = measureRef.current.getBoundingClientRect().width
			inputRef.current.style.width = `${Math.max(width + 20)}px` // Add padding
		}
	}

	// Focus and adjust width when editing starts
	useEffect((): void => {
		if (!isEditing || !inputRef.current) return

		// When entering edit mode, set the temporary editing state
		setEditingName(projectName)

		// Use a small timeout to ensure the input is ready before focusing and selecting
		// This helps ensure consistent selection behavior, especially with the default name
		setTimeout((): void => {
			if (inputRef.current) {
				inputRef.current.focus()
				inputRef.current.select()
				adjustInputWidth()
			}
		}, 10)
	}, [isEditing, projectName])

	// Adjust width when editing value changes
	useEffect((): void => {
		if (!isEditing) return
		adjustInputWidth()
	}, [editingName, isEditing])

	// Handle beforeunload warning - only show if user is still editing
	useEffect((): () => void => {
		const handleBeforeUnload = (e: BeforeUnloadEvent): void => {
			if (isEditing) {
				e.preventDefault()
				e.returnValue = "Changes you made may not be saved."
			}
		}

		if (isEditing) {
			window.addEventListener("beforeunload", handleBeforeUnload)
		}

		return (): void => {
			window.removeEventListener("beforeunload", handleBeforeUnload)
		}
	}, [isEditing])

	// Update document title whenever projectName changes (not during editing)
	useEffect((): void => {
		document.title = `${projectName} | Lever Labs`
	}, [projectName])

	// Update local state when project prop changes
	useEffect((): void => {
		if (project.projectName) {
			setProjectName(project.projectName)
		}
	}, [project.projectName])

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		// Only update the temporary editing state
		setEditingName(e.target.value)
	}

	const saveChanges = (newName: string): void => {
		// Only save if the name is not empty and has changed
		if (newName.trim() && newName !== projectName) {
			setProjectName(newName) // Update the displayed name
			editSandboxProjectName(project.sandboxProjectUUID, newName) // Save to DB immediately
		} else {
			// Revert to previous name if empty
			setEditingName(projectName)
		}
	}

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
		if (e.key === "Enter") {
			setIsEditing(false)
			saveChanges(editingName)
			e.preventDefault()
		} else if (e.key === "Escape") {
			setIsEditing(false)
			setEditingName(projectName) // Discard changes
			e.preventDefault()
		}
	}

	const handleBlur = (): void => {
		setIsEditing(false)
		saveChanges(editingName)
	}

	// Common styles for both viewing and editing states
	const commonStyles = "text-xl! font-medium leading-10 h-10 px-2 border-2 rounded"

	return (
		<div
			className="relative inline-flex items-center mr-2"
			onMouseEnter={(): void => setIsHovering(true)}
			onMouseLeave={(): void => setIsHovering(false)}
		>
			{/* Hidden span to measure text width */}
			<span
				ref={measureRef}
				className="absolute left-0 top-0 invisible whitespace-pre text-xl! font-medium"
			>
				{isEditing ? editingName : projectName}
			</span>

			{isEditing ? (
				<Input
					ref={inputRef}
					type="text"
					value={editingName}
					onChange={handleNameChange}
					onKeyDown={handleKeyDown}
					onBlur={handleBlur}
					className={`${commonStyles} border-blue-400 bg-inherit focus-visible:ring-0 focus-visible:ring-offset-0 py-0`}
					style={{ lineHeight: "2.5rem" }}
					autoFocus
					maxLength={50}
				/>
			) : (
				<div
					className={`${commonStyles} flex items-center cursor-pointer ${
						isHovering ? "border-eel" : "border-transparent"
					}`}
					onClick={(): void => setIsEditing(true)}
					title="Click to edit project name"
				>
					{projectName}
				</div>
			)}
		</div>
	)
}
