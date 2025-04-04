import Image from "next/image"
import { observer } from "mobx-react"
import { Save, Trash2 } from "lucide-react"
import { useCallback, useState } from "react"
import LoadingOval from "../../loading-oval"
import useUploadProfilePicture from "../../../hooks/personal-info/upload-profile-picture"

interface Props {
	previewUrl: string
	handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	removeContent: () => void
	selectedImage: File | null
	editPictureCallback: () => void
	handleMouseEnter: () => void
	handleMouseLeave: () => void
	imageStyle: { opacity: number }
	fileInputRef: React.RefObject<HTMLInputElement>
}

function UploadProfilePicture(props: Props) {
	const {
		previewUrl,
		handleImageChange,
		removeContent,
		selectedImage,
		editPictureCallback,
		handleMouseEnter,
		handleMouseLeave,
		imageStyle,
		fileInputRef
	} = props
	const uploadProfilePicture = useUploadProfilePicture()
	const [isLoading, setIsLoading] = useState(false)

	const uploadProfilePictureCallback = useCallback(async() => {
		if (isLoading === true) return
		await uploadProfilePicture(selectedImage, setIsLoading)
		removeContent()
	}, [isLoading, removeContent, selectedImage, uploadProfilePicture])

	return (
		<div className="relative inline-block" style={{ minWidth: "128px", maxWidth: "128px" }}>
			<Image
				src={previewUrl}
				className="w-32 h-32 rounded-full object-cover cursor-pointer"
				onClick={editPictureCallback}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				style={imageStyle}
				alt="Profile Image"
				width={128}
				height={128}
			/>
			<div
				className="absolute top-2 right-2 bg-red-500 dark:bg-red-600 p-1 rounded-full \
					cursor-pointer hover:bg-red-600 dark:hover:bg-red-700"
				onClick={removeContent}
			>
				<Trash2 color="white" size={22} />
			</div>
			<div
				className={`absolute bottom-2 right-2 bg-green-500 dark:bg-green-600 p-1 rounded-full
					${isLoading ? "" : "hover:bg-green-600 dark:hover:bg-green-700 cursor-pointer"}`}
				onClick={uploadProfilePictureCallback}
			>
				{isLoading ? (
					<LoadingOval />
				) : (
					<Save color="white" size={22} />
				)}
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
	)
}

export default observer(UploadProfilePicture)
