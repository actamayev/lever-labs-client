/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from "lodash"
import { useCallback } from "react"
import { observer } from "mobx-react"
import { FaUserCircle } from "react-icons/fa"

interface Props {
	profileImageUrl: string | null
	onClickCreatorPicture?: (e: any) => void
	extraClasses: string
}

function ShowUserProfileImageOrDefaultImage(props: Props) {
	const { profileImageUrl, onClickCreatorPicture, extraClasses } = props

	const handleClick = useCallback((e: React.MouseEvent<HTMLElement, MouseEvent>) => {
		e.stopPropagation()
		if (onClickCreatorPicture) onClickCreatorPicture(e)
	}, [onClickCreatorPicture])

	if (_.isNull(profileImageUrl)) {
		return (
			<FaUserCircle
				className={`text-black dark:text-white ${extraClasses}`}
				onClick={(e) => handleClick(e as unknown as React.MouseEvent<HTMLElement, MouseEvent>)}
			/>
		)
	}

	return (
		<img
			src={profileImageUrl}
			alt="Creator's Profile"
			className={extraClasses}
			onClick={handleClick}
		/>
	)
}

export default observer(ShowUserProfileImageOrDefaultImage)
