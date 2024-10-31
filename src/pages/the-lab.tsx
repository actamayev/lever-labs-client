import PipUUIDs from "../components/the-lab/pip-uuids"
import PageHelmet from "../components/helmet/page-helmet"
import useRetrievePipInfoUseEffect from "../hooks/pip/retrieve-pip-info"

export default function TheLab() {
	useRetrievePipInfoUseEffect()

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
