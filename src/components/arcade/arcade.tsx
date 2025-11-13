import WorkbenchLayout from "../layouts/workbench-layout"

export default function Arcade(): React.ReactNode {
	return (
		<WorkbenchLayout preventElasticScroll={true}>
			<div className="flex flex-col items-center justify-center h-full">
				<h1>Arcade</h1>
			</div>
		</WorkbenchLayout>
	)
}
