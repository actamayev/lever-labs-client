import helmetData from "../../utils/helmet-data"

export default function PageHelmet({ pageTitle } : { pageTitle: PageNames }) {
	const helmetContent = helmetData[pageTitle]

	return <>{helmetContent || null}</>
}
