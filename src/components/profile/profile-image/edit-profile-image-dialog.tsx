"use client"

import { useState, useRef, useCallback } from "react"
import { observer } from "mobx-react"
import Image from "next/image"
import { Pencil, Trash2, Save } from "lucide-react"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogClose
} from "../../shadcn/ui/dialog"
import { Button } from "../../shadcn/ui/button"
import { CustomUserCircle } from "../../icons/custom-user-circle"
import { usePersonalInfoContext } from "../../../contexts/personal-info-context"
import useUploadProfilePicture from "../../../hooks/personal-info/upload-profile-picture"
import useRemoveCurrentProfilePicture from "../../../hooks/personal-info/remove-current-profile-picture"
import LoadingOval from "../../loading-oval"

interface EditProfileImageDialogProps {
	isOpen: boolean
	onClose: () => void
}

// eslint-disable-next-line max-lines-per-function
function EditProfileImageDialog({ isOpen, onClose }: EditProfileImageDialogProps) {
	const personalInfoClass = usePersonalInfoContext()
	const fileInputRef = useRef<HTMLInputElement>(null)
	const [previewUrl, setPreviewUrl] = useState<string | null>(null)
	const [selectedImage, setSelectedImage] = useState<File | null>(null)
	const [isLoading, setIsLoading] = useState(false)

	const uploadProfilePicture = useUploadProfilePicture()
	const removeCurrentProfilePicture = useRemoveCurrentProfilePicture()

	const handleOpenFileSelector = useCallback(() => {
		fileInputRef.current?.click()
	}, [fileInputRef])

	const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
		const files = e.target.files

		if (!files || files.length === 0) {
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

		if (fileInputRef.current) {
			fileInputRef.current.value = ""
		}
	}, [])

	const handleSave = useCallback(async () => {
		if (isLoading) return

		if (!selectedImage) return onClose()
		await uploadProfilePicture(selectedImage, setIsLoading)

		// Clean up the object URL to prevent memory leaks
		if (previewUrl) {
			URL.revokeObjectURL(previewUrl)
		}

		setSelectedImage(null)
		setPreviewUrl(null)
		onClose()
	}, [isLoading, selectedImage, uploadProfilePicture, previewUrl, onClose])

	const handleDelete = useCallback(async () => {
		if (isLoading) return

		// If we have a preview, just clear it
		if (previewUrl) {
			URL.revokeObjectURL(previewUrl)
			setPreviewUrl(null)
			setSelectedImage(null)
			return
		}

		// Otherwise, remove the current profile picture
		setIsLoading(true)
		await removeCurrentProfilePicture(setIsLoading)
		onClose()
	}, [isLoading, previewUrl, removeCurrentProfilePicture, onClose])

	// Determine which image to show
	const imageToShow = previewUrl || personalInfoClass.profilePictureUrl

	return (
		<Dialog open={isOpen} onOpenChange={(open) => {
			if (!open) {
				// Clean up when dialog closes
				if (previewUrl) {
					URL.revokeObjectURL(previewUrl)
					setPreviewUrl(null)
					setSelectedImage(null)
				}
				onClose()
			}
		}}>
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
								className="w-32 h-32 rounded-full object-cover"
							/>
						) : (
							<CustomUserCircle
								className="w-32 h-32 rounded-full object-cover text-black dark:text-white"
							/>
						)}

						{/* Pencil icon for editing */}
						<div
							className="absolute top-0 right-0 bg-primary p-1 rounded-full cursor-pointer hover:bg-primary/80"
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
					<Button
						variant="destructive"
						disabled={isLoading}
						onClick={handleDelete}
					>
						{isLoading ? <LoadingOval /> : <Trash2 className="mr-2 h-4 w-4" />}
						Delete
					</Button>

					<Button
						variant="default"
						disabled={isLoading}
						onClick={handleSave}
					>
						{isLoading ? <LoadingOval /> : <Save className="mr-2 h-4 w-4" />}
						Save
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default observer(EditProfileImageDialog)
