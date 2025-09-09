"use client"

import Image from "next/image"
import { observer } from "mobx-react"
import { Pencil } from "lucide-react"
import { useState, useCallback } from "react"
import EditProfileImageDialog from "./edit-profile-image-dialog"
import { CustomUserCircle } from "../../icons/custom-user-circle"
import personalInfoClass from "../../../classes/personal-info-class"
import { Avatar, AvatarFallback } from "../../shadcn/ui/avatar"

function ProfileImage(): React.ReactNode {
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [isHovered, setIsHovered] = useState(false)

	const handleMouseEnter = useCallback((): void => setIsHovered(true), [])
	const handleMouseLeave = useCallback((): void => setIsHovered(false), [])

	const handleOpenDialog = useCallback((): void => {
		setIsDialogOpen(true)
	}, [])

	const handleCloseDialog = useCallback((): void => {
		setIsDialogOpen(false)
	}, [])

	const imageStyle = isHovered ? { opacity: 0.8 } : { opacity: 1 }
	const profilePictureUrl = personalInfoClass.profilePictureUrl

	return (
		<div className="relative inline-block" style={{ minWidth: "128px", maxWidth: "128px" }}>
			<Avatar className="w-full h-full">
				{profilePictureUrl ? (
					<Image
						src={profilePictureUrl}
						className="w-32 h-32 rounded-full object-cover cursor-pointer"
						style={imageStyle}
						onClick={handleOpenDialog}
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
						alt="Profile Picture"
						width={128}
						height={128}
						priority
					/>
				) : (
					<AvatarFallback className="bg-standardBackground text-questionText">
						<CustomUserCircle
							className="w-full h-full cursor-pointer"
							style={imageStyle}
							onClick={handleOpenDialog}
							onMouseEnter={handleMouseEnter}
							onMouseLeave={handleMouseLeave}
						/>
					</AvatarFallback>
				)}
			</Avatar>
			<div
				className="absolute top-2 right-1 bg-eel dark:bg-polar
				p-1 rounded-full cursor-pointer"
				onClick={handleOpenDialog}
			>
				<Pencil color="white" size={18} />
			</div>

			<EditProfileImageDialog
				isOpen={isDialogOpen}
				onClose={handleCloseDialog}
			/>
		</div>
	)
}

export default observer(ProfileImage)
