"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react"
import { observer } from "mobx-react"
import { cn } from "../lib/shadcn/utils"
import { CustomUserCircle } from "./icons/custom-user-circle"
import isNull from "lodash-es/isNull"
import Image from "next/image"

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

	if (isNull(profileImageUrl)) {
		return (
			<CustomUserCircle
				className={cn(
					"text-questionText transition-all duration-300",
					extraClasses
				)}
				onClick={(e) => handleClick(e as unknown as React.MouseEvent<HTMLElement, MouseEvent>)}
			/>
		)
	}

	return (
		<Image
			src={profileImageUrl}
			alt="Creator's Profile"
			className={extraClasses}
			onClick={handleClick}
			loading="lazy"
		/>
	)
}

export default observer(ShowUserProfileImageOrDefaultImage)
