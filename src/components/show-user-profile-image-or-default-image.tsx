"use client"

import { observer } from "mobx-react"
import { cn } from "../lib/shadcn/utils"
import { CustomUserCircle } from "./icons/custom-user-circle"
import isNull from "lodash-es/isNull"
import Image from "next/image"
import personalInfoClass from "../classes/personal-info-class"

function ShowUserProfileImageOrDefaultImage() {
	const extraClasses = "min-w-full min-h-full rounded-full object-cover"

	if (isNull(personalInfoClass.profilePictureUrl)) {
		return (
			<CustomUserCircle
				className={cn(
					"text-questionText duration-0",
					extraClasses
				)}
			/>
		)
	}

	return (
		<Image
			src={personalInfoClass.profilePictureUrl}
			alt="Creator's Profile"
			className={extraClasses}
			loading="lazy"
			width={128}
			height={128}
		/>
	)
}

export default observer(ShowUserProfileImageOrDefaultImage)
