"use client"

import allHelmetData from "../../utils/helmet-data/all-helmet-data"

export default function PageHelmet({ pageTitle } : { pageTitle: PageNames }) {
	const helmetContent = allHelmetData[pageTitle]

	return <>{helmetContent || null}</>
}
