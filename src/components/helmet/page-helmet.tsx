import helmetData from "../../utils/helmet-data"

interface Props {
	pageTitle: StaticPageNames
}

export default function PageHelmet(props: Props) {
	const { pageTitle } = props
	const helmetContent = helmetData[pageTitle]

	return <>{helmetContent || null}</>
}
