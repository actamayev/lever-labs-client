"use client"

import { observer } from "mobx-react"
import { useState, useCallback } from "react"
import Image from "next/image"
import EditProfileImageDialog from "./edit-profile-image-dialog"
import { usePersonalInfoContext } from "../../../contexts/personal-info-context"
import { CustomUserCircle } from "../../icons/custom-user-circle"

function ProfileImage() {
	const personalInfoClass = usePersonalInfoContext()
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [isHovered, setIsHovered] = useState(false)

	const handleMouseEnter = useCallback(() => setIsHovered(true), [])
	const handleMouseLeave = useCallback(() => setIsHovered(false), [])

	const handleOpenDialog = useCallback(() => {
		setIsDialogOpen(true)
	}, [])

	const handleCloseDialog = useCallback(() => {
		setIsDialogOpen(false)
	}, [])

	const imageStyle = isHovered ? { opacity: 0.8 } : { opacity: 1 }

	return (
		<div className="relative inline-block" style={{ minWidth: "128px", maxWidth: "128px" }}>
			{personalInfoClass.profilePictureUrl ? (
				<Image
					src={personalInfoClass.profilePictureUrl}
					className="w-32 h-32 rounded-full object-cover cursor-pointer"
					style={imageStyle}
					onClick={handleOpenDialog}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
					alt="Profile Picture"
					width={128}
					height={128}
				/>
			) : (
				<div className="text-black dark:text-white">
					<CustomUserCircle
						className="w-32 h-32 rounded-full object-cover cursor-pointer"
						style={imageStyle}
						onClick={handleOpenDialog}
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
					/>
				</div>
			)}

			<EditProfileImageDialog
				isOpen={isDialogOpen}
				onClose={handleCloseDialog}
			/>
		</div>
	)
}

export default observer(ProfileImage)
