"use client"

import { useMemo } from "react"
import personalInfoClass from "../../classes/personal-info-class"
import { SiteThemes } from "@bluedotrobots/common-ts"

export default function useDefaultSiteTheme (): SiteThemes {

	return useMemo(() => {
		return personalInfoClass.defaultSiteTheme
	}, [personalInfoClass.defaultSiteTheme])
}
