"use client"

import { useMemo } from "react"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import { SiteThemes } from "@bluedotrobots/common-ts"

export default function useDefaultSiteTheme (): SiteThemes {
	const personalInfoClass = usePersonalInfoContext()

	return useMemo(() => {
		return personalInfoClass.defaultSiteTheme
	}, [personalInfoClass.defaultSiteTheme])
}
