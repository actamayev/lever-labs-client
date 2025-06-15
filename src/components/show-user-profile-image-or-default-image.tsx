"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react"
import { observer } from "mobx-react"
import { cn } from "../lib/shadcn/utils"
import { CustomUserCircle } from "./icons/custom-user-circle"
import isNull from "lodash-es/isNull"
import Image from "next/image"
import personalInfoClass from "../classes/personal-info-class"

interface Props {
	onClickCreatorPicture?: (e: any) => void
	extraClasses: string
}

function ShowUserProfileImageOrDefaultImage(props: Props) {
	const { onClickCreatorPicture, extraClasses } = props

	const handleClick = useCallback((e: React.MouseEvent<HTMLElement, MouseEvent>) => {
		e.stopPropagation()
		if (onClickCreatorPicture) onClickCreatorPicture(e)
	}, [onClickCreatorPicture])

	if (isNull(personalInfoClass.profilePictureUrl)) {
		return (
			<CustomUserCircle
				className={cn(
					"text-questionText duration-0",
					extraClasses
				)}
				onClick={(e) => handleClick(e as unknown as React.MouseEvent<HTMLElement, MouseEvent>)}
			/>
		)
	}

	return (
		<Image
			src={personalInfoClass.profilePictureUrl}
			alt="Creator's Profile"
			className={extraClasses}
			onClick={handleClick}
			loading="lazy"
			width={128}
			height={128}
		/>
	)
}

export default observer(ShowUserProfileImageOrDefaultImage)
