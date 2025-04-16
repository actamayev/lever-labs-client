"use client"
import debounce from "lodash-es/debounce"
import { useState, useRef, useEffect, KeyboardEvent } from "react"
import { Input } from "../../shadcn/ui/input"
import useEditSandboxProjectName from "../../../hooks/sandbox/edit-sandbox-project-name"

// eslint-disable-next-line max-lines-per-function
export default function EditableProjectTitle({ project }: { project: SandboxProject }) {
	const [isEditing, setIsEditing] = useState(false)
	const [isHovering, setIsHovering] = useState(false)
	const [projectName, setProjectName] = useState(project.projectName || "Untitled Project")
	const [editingName, setEditingName] = useState("") // Temporary state for editing
	const inputRef = useRef<HTMLInputElement>(null)
	const measureRef = useRef<HTMLSpanElement>(null)
	const editProjectName = useEditSandboxProjectName()

	// Create a debounced function for updating the project name
	const debouncedUpdateName = useRef(
		debounce((uuid: ProjectUUID, name: string) => {
			editProjectName(uuid, name)
		}, 500)
	).current

	// Adjust input width based on content
	const adjustInputWidth = () => {
		if (inputRef.current && measureRef.current) {
			const width = measureRef.current.getBoundingClientRect().width
			inputRef.current.style.width = `${Math.max(width + 20)}px` // Add padding
		}
	}

	// Focus and adjust width when editing starts
	useEffect(() => {
		if (!isEditing || !inputRef.current) return

		// When entering edit mode, set the temporary editing state
		setEditingName(projectName)

		inputRef.current.focus()
		inputRef.current.select()
		adjustInputWidth()
	}, [isEditing, projectName])

	// Adjust width when editing value changes
	useEffect(() => {
		if (!isEditing) return
		adjustInputWidth()
	}, [editingName, isEditing])

	// Clean up the debounce on unmount
	useEffect(() => {
		return () => {
			debouncedUpdateName.cancel()
		}
	}, [debouncedUpdateName])

	// Update document title whenever projectName changes (not during editing)
	useEffect(() => {
		document.title = `${projectName} | Blue Dot Robots`
	}, [projectName])

	// Update local state when project prop changes
	useEffect(() => {
		if (project.projectName) {
			setProjectName(project.projectName)
		}
	}, [project.projectName])

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// Only update the temporary editing state
		setEditingName(e.target.value)
	}

	const saveChanges = (newName: string) => {
		// Only save if the name is not empty and has changed
		if (newName.trim() && newName !== projectName) {
			setProjectName(newName) // Update the displayed name
			debouncedUpdateName(project.projectUUID, newName) // Save to DB
		} else {
			// Revert to previous name if empty
			setEditingName(projectName)
		}
	}

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
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

	const handleBlur = () => {
		setIsEditing(false)
		saveChanges(editingName)
	}

	// Common styles for both viewing and editing states
	const commonStyles = "!text-xl font-medium leading-10 h-10 px-2 border-2 rounded"

	return (
		<div
			className="relative inline-flex items-center mr-2"
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
		>
			{/* Hidden span to measure text width */}
			<span
				ref={measureRef}
				className="absolute left-0 top-0 invisible whitespace-pre !text-xl font-medium"
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
					onClick={() => setIsEditing(true)}
					title="Click to edit project name"
				>
					{projectName}
				</div>
			)}
		</div>
	)
}
