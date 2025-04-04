import _ from "lodash"
import Image from "next/image"
import { observer } from "mobx-react"
import { Save, Trash2, XCircle } from "lucide-react"
import { useCallback, useMemo, useState } from "react"
import { CustomUserCircle } from "../../icons/custom-user-circle"
import { usePersonalInfoContext } from "../../../contexts/personal-info-context"
import useRemoveCurrentProfilePicture from "../../../hooks/personal-info/remove-current-profile-picture"

interface Props {
	handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	fileInputRef: React.RefObject<HTMLInputElement>
	handleMouseEnter: () => void
	handleMouseLeave: () => void
	imageStyle: { opacity: number }
	editPictureCallback: () => void
}

function ShowCurrentProfilePicture(props: Props) {
	const { handleImageChange, fileInputRef, handleMouseEnter, handleMouseLeave, imageStyle, editPictureCallback } = props
	const personalInfoClass = usePersonalInfoContext()
	const removeCurrentProfilePicture = useRemoveCurrentProfilePicture()
	const [isDeletingCurrentPicture, setIsDeletingCurrentPicture] = useState(false)

	const toggleIsDeletingPicture = useCallback(() => {
		setIsDeletingCurrentPicture(prevState => !prevState)
	}, [])

	const removeCurrentProfilePictureCallback = useCallback(async() => {
		await removeCurrentProfilePicture(setIsDeletingCurrentPicture)
	}, [removeCurrentProfilePicture])

	const profilePictureUrl = useMemo(() => {
		return personalInfoClass.profilePictureUrl
	}, [personalInfoClass.profilePictureUrl])

	return (
		<div className="relative inline-block" style={{ minWidth: "128px", maxWidth: "128px" }}>
			{(profilePictureUrl && isDeletingCurrentPicture === false) ? (
				<>
					<Image
						src={profilePictureUrl}
						className="w-32 h-32 rounded-full object-cover cursor-pointer"
						style={imageStyle}
						onClick={editPictureCallback}
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
						alt="Profile Picture"
						width={128}
						height={128}
					/>
					<div
						className="absolute top-2 right-2 bg-red-500 dark:bg-red-600 p-1 rounded-full \
							cursor-pointer hover:bg-red-600 dark:hover:bg-red-700"
						onClick={toggleIsDeletingPicture}

					>
						<Trash2 color="white" size={22} />
					</div>
				</>
			) : (
				<>
					<div className="text-black dark:text-white">
						<CustomUserCircle
							className="w-32 h-32 rounded-full object-cover cursor-pointer"
							style={imageStyle}
							onClick={editPictureCallback}
							onMouseEnter={handleMouseEnter}
							onMouseLeave={handleMouseLeave}
						/>
					</div>
					{!_.isNull(profilePictureUrl) && (
						<>
							<div
								className="absolute top-2 right-2 bg-red-500 dark:bg-red-600 p-1 rounded-full \
									cursor-pointer hover:bg-red-600 dark:hover:bg-red-700"
								onClick={toggleIsDeletingPicture}

							>
								<XCircle color="white" size={22} />
							</div>
							<div
								className="absolute bottom-2 right-2 bg-green-500 dark:bg-green-600 p-1 rounded-full
									cursor-pointer hover:bg-green-600 dark:hover:bg-green-700"
								onClick={removeCurrentProfilePictureCallback}

							>
								<Save color="white" size={22} />
							</div>
						</>
					)}
				</>
			)}
			<input
				ref={fileInputRef}
				type="file"
				onChange={handleImageChange}
				accept="image/jpeg, image/png"
				style={{ display: "none" }}
				max={1}
			/>
		</div>
	)
}

export default observer(ShowCurrentProfilePicture)
