import truncate from "lodash-es/truncate"
import { Helmet } from "react-helmet-async"

interface Props {
	pageTitleData: string
	description: string
	url: string
	needsBlueDotSuffix?: boolean
}

export default function BasicHelmet(props: Props) {
	const { pageTitleData, description, url, needsBlueDotSuffix = true } = props
	const truncatedTitle = truncate(pageTitleData, { length: 50 }) + (needsBlueDotSuffix ? " | Blue Dot Robots" : "")
	const truncatedDescription = truncate(description, { length: 155})

	return (
		<Helmet>
			<title>{truncatedTitle}</title>
			<meta property="og:title" content={truncatedTitle} />
			<meta name="twitter:title" content={truncatedTitle} />

			<meta name="description" content={truncatedDescription}/>
			<meta property="og:description" content={truncatedDescription}/>
			<meta name="twitter:description" content={truncatedDescription}/>

			<meta property="og:url" content={url} />
			<link rel="canonical" href={url} />
		</Helmet>
	)
}
