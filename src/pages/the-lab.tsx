import PageHelmet from "../components/helmet/page-helmet"
import PipUUIDs from "../components/the-lab/pip-uuids"

export default function TheLab() {
	return (
		<>
			<PageHelmet pageTitle="/the-lab" />
			<div className="text-black dark:text-white text-3xl">
				The Lab
			</div>
			<PipUUIDs />
		</>
	)
}
