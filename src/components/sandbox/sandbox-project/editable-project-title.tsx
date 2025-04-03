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
			inputRef.current.style.width = `${Math.max(width + 20)}px` // Add padding, minimum 120px
		}
	}

	// Focus and adjust width when editing starts
	useEffect(() => {
		if (!isEditing || !inputRef.current) return
		inputRef.current.focus()
		inputRef.current.select()
		adjustInputWidth()
	}, [isEditing])

	// Adjust width when project name changes
	useEffect(() => {
		if (!isEditing) return
		adjustInputWidth()
	}, [projectName, isEditing])

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
			debouncedUpdateName(project.projectUUID, newName)
		}
	}

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" || e.key === "Escape") {
			setIsEditing(false)
			// If escape was pressed, revert to the previous value
			if (e.key === "Escape") {
				setProjectName(project.projectName || "Untitled Project")
			}
			e.preventDefault()
		}
	}

	const handleBlur = () => {
		setIsEditing(false)
		// If the name is empty, revert to the default
		if (!projectName.trim()) {
			setProjectName(project.projectName || "Untitled Project")
		}
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
				{projectName}
			</span>

			{isEditing ? (
				<Input
					ref={inputRef}
					type="text"
					value={projectName}
					onChange={handleNameChange}
					onKeyDown={handleKeyDown}
					onBlur={handleBlur}
					className={`${commonStyles} border-blue-400 bg-inherit focus-visible:ring-0 focus-visible:ring-offset-0 py-0`}
					style={{ lineHeight: "2.5rem" }}
					autoFocus
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
