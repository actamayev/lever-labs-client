"use client"

import Image from "next/image"
import { observer } from "mobx-react"
import isNull from "lodash-es/isNull"
import { CustomUserCircle } from "./icons/custom-user-circle"
import personalInfoClass from "../classes/personal-info-class"

function ShowUserProfileImageOrDefaultImage() {
	const classes = "text-questionText min-w-full min-h-full rounded-full object-cover"

	if (isNull(personalInfoClass.profilePictureUrl)) {
		return (
			<CustomUserCircle className={classes} />
		)
	}

	return (
		<Image
			src={personalInfoClass.profilePictureUrl}
			alt="Creator's Profile"
			className={classes}
			loading="lazy"
			width={128}
			height={128}
		/>
	)
}

export default observer(ShowUserProfileImageOrDefaultImage)
