import _ from "lodash"
import { observer } from "mobx-react"
import { useRef, useState, useCallback } from "react"
import ShowCurrentProfilePicture from "./show-current-profile-picture"
import UploadProfilePicture from "./upload-profile-picture"

function ProfilePicture() {
	const [isHovered, setIsHovered] = useState(false)
	const [previewUrl, setPreviewUrl] = useState<null | string>(null)
	const [selectedImage, setSelectedImage] = useState<File | null>(null)
	const fileInputRef = useRef<HTMLInputElement>(null)

	const removeContent = useCallback(() => {
		setSelectedImage(null)
		setPreviewUrl(null)
	}, [setPreviewUrl])

	const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
		const files = e.target.files

		if (_.isNull(files) || _.isEmpty(files)) {
			removeContent()
		} else {
			const file = files[0]
			const maxFileSize = 10 * 1024 * 1024 // 10 MB in bytes

			if (file.size > maxFileSize) {
				alert("The selected file exceeds the maximum size limit of 150MB.")
				if (fileInputRef.current) {
					fileInputRef.current.value = "" // Reset the input
				}
				return // Exit the function if the file is too large
			}
			setSelectedImage(file)

			const newPreviewUrl = URL.createObjectURL(file)
			setPreviewUrl(newPreviewUrl)
		}

		if (_.isNull(fileInputRef.current)) return
		fileInputRef.current.value = ""
	}, [removeContent])

	const editPictureCallback = useCallback(() => {
		fileInputRef.current?.click()
	}, [fileInputRef])

	const handleMouseEnter = useCallback(() => setIsHovered(true), [])

	const handleMouseLeave = useCallback(() => setIsHovered(false), [])

	const imageStyle = isHovered ? { opacity: 0.8 } : { opacity: 1 }

	if (_.isNull(previewUrl)) {
		return (
			<ShowCurrentProfilePicture
				handleImageChange = {handleImageChange}
				fileInputRef={fileInputRef}
				handleMouseEnter={handleMouseEnter}
				handleMouseLeave={handleMouseLeave}
				imageStyle={imageStyle}
				editPictureCallback={editPictureCallback}
			/>
		)
	}

	return (
		<UploadProfilePicture
			previewUrl={previewUrl}
			handleImageChange={handleImageChange}
			removeContent={removeContent}
			selectedImage={selectedImage}
			editPictureCallback={editPictureCallback}
			handleMouseEnter={handleMouseEnter}
			handleMouseLeave={handleMouseLeave}
			imageStyle={imageStyle}
			fileInputRef={fileInputRef}
		/>
	)
}

export default observer(ProfilePicture)
