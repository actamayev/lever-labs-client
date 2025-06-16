"use client"

import Image from "next/image"
import { observer } from "mobx-react"
import isNull from "lodash-es/isNull"
import isEmpty from "lodash-es/isEmpty"
import { Pencil, Trash2, Save } from "lucide-react"
import { useState, useRef, useCallback } from "react"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogClose
} from "../../shadcn/ui/dialog"
import LoadingOval from "../../loading-oval"
import { TactileButton } from "../../shadcn/ui/tactile-button"
import { CustomUserCircle } from "../../icons/custom-user-circle"
import personalInfoClass from "../../../classes/personal-info-class"
import uploadProfilePicture from "../../../utils/personal-info/upload-profile-picture"
import removeCurrentProfilePicture from "../../../utils/personal-info/remove-current-profile-picture"

interface EditProfileImageDialogProps {
	isOpen: boolean
	onClose: () => void
}

// eslint-disable-next-line max-lines-per-function
function EditProfileImageDialog({ isOpen, onClose }: EditProfileImageDialogProps) {
	const fileInputRef = useRef<HTMLInputElement>(null)
	const [previewUrl, setPreviewUrl] = useState<string | null>(null)
	const [selectedImage, setSelectedImage] = useState<File | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const [pendingDelete, setPendingDelete] = useState(false)

	const [isHovered, setIsHovered] = useState(false)
	const handleMouseEnter = useCallback(() => setIsHovered(true), [])
	const handleMouseLeave = useCallback(() => setIsHovered(false), [])

	const imageStyle = isHovered ? { opacity: 0.8 } : { opacity: 1 }

	const handleOpenFileSelector = useCallback(() => {
		// If pending delete, cancel it when selecting a new image
		if (pendingDelete) {
			setPendingDelete(false)
		}
		fileInputRef.current?.click()
	}, [pendingDelete, fileInputRef])

	const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
		const files = e.target.files

		if (!files || isEmpty(files)) {
			return
		}

		const file = files[0]
		const maxFileSize = 10 * 1024 * 1024 // 10 MB in bytes

		if (file.size > maxFileSize) {
			alert("The selected file exceeds the maximum size limit of 10MB.")
			if (fileInputRef.current) {
				fileInputRef.current.value = "" // Reset the input
			}
			return
		}

		setSelectedImage(file)
		const newPreviewUrl = URL.createObjectURL(file)
		setPreviewUrl(newPreviewUrl)
		// Cancel any pending delete when a new image is selected
		setPendingDelete(false)

		if (fileInputRef.current) {
			fileInputRef.current.value = ""
		}
	}, [])

	const handleSave = useCallback(async () => {
		if (isLoading) return

		// Handle pending deletion
		if (pendingDelete) {
			setIsLoading(true)
			await removeCurrentProfilePicture(setIsLoading)
			setPendingDelete(false)
			onClose()
			return
		}

		// Handle new image upload
		if (selectedImage) {
			await uploadProfilePicture(selectedImage, setIsLoading)

			// Clean up the object URL to prevent memory leaks
			if (previewUrl) {
				URL.revokeObjectURL(previewUrl)
			}

			setSelectedImage(null)
			setPreviewUrl(null)
		}

		onClose()
	}, [isLoading, pendingDelete, selectedImage, previewUrl, onClose])

	const handleDelete = useCallback(() => {
		// If we have a preview but no saved profile picture, just clear the preview without marking for deletion
		if (previewUrl && !personalInfoClass.profilePictureUrl) {
			URL.revokeObjectURL(previewUrl)
			setPreviewUrl(null)
			setSelectedImage(null)
			// Don't set pendingDelete since we've already cleared the preview
			return
		}

		// Otherwise mark for deletion but don't delete yet
		setPendingDelete(true)

		// If we have a preview, clear it
		if (previewUrl) {
			URL.revokeObjectURL(previewUrl)
			setPreviewUrl(null)
			setSelectedImage(null)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [previewUrl, personalInfoClass.profilePictureUrl])

	// Determine which image to show
	const hasProfilePicture = !isNull(personalInfoClass.profilePictureUrl)
	const imageToShow = previewUrl ||
                  (pendingDelete ? null : personalInfoClass.profilePictureUrl)

	return (
		<Dialog
			open={isOpen}
			onOpenChange={(open) => {
				if (open) return
				// Clean up when dialog closes
				if (previewUrl) {
					URL.revokeObjectURL(previewUrl)
				}
				setPreviewUrl(null)
				setSelectedImage(null)
				setPendingDelete(false)
				onClose()
			}}
		>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Edit Profile Image</DialogTitle>
					<DialogClose />
				</DialogHeader>

				<div className="flex flex-col items-center justify-center py-6">
					<div className="relative mb-4">
						{imageToShow ? (
							<Image
								src={imageToShow}
								alt="Profile Image"
								width={128}
								height={128}
								className="w-32 h-32 rounded-full object-cover cursor-pointer"
								style={imageStyle}
								onClick={handleOpenFileSelector}
								onMouseEnter={handleMouseEnter}
								onMouseLeave={handleMouseLeave}
							/>
						) : (
							<CustomUserCircle
								className="w-32 h-32 rounded-full object-cover cursor-pointer text-questionText"
								style={imageStyle}
								onClick={handleOpenFileSelector}
								onMouseEnter={handleMouseEnter}
								onMouseLeave={handleMouseLeave}
							/>
						)}

						{/* Pencil icon for editing */}
						<div
							className="absolute top-2 right-1 bg-eel dark:bg-polar
							p-1 rounded-full cursor-pointer"
							onClick={handleOpenFileSelector}
						>
							<Pencil color="white" size={18} />
						</div>
					</div>

					<input
						ref={fileInputRef}
						type="file"
						onChange={handleImageChange}
						accept="image/jpeg, image/png"
						style={{ display: "none" }}
						max={1}
					/>
				</div>

				<DialogFooter className="flex flex-row justify-center sm:justify-center gap-4">
					{/* Show delete button if there's a profile picture OR a preview image, and not already pending delete */}
					{(hasProfilePicture || previewUrl) && !pendingDelete && (
						<TactileButton
							disabled={isLoading}
							onClick={handleDelete}
							className="bg-red-500"
							shadowColor="rgb(176 36 56)"
						>
							<Trash2 className="mr-2 h-4 w-4" />
							Delete
						</TactileButton>
					)}

					<TactileButton
						disabled={isLoading}
						onClick={handleSave}
					>
						{isLoading ? <LoadingOval /> : <Save className="mr-2 h-4 w-4" />}
						{pendingDelete ? "Confirm Delete" : "Save"}
					</TactileButton>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default observer(EditProfileImageDialog)
