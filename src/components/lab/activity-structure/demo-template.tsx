import ActivityHeader from "./activity-header/activity-header"

interface Props {
	children: React.ReactNode
}

export default function DemoTemplate(props: Props) {
	const { children } = props

	return (
		<div className="flex flex-col h-screen min-h-0">
			<ActivityHeader
				activityType="Demo"
				isDemo={true}
			/>

			<div className="flex-1 min-h-0 pt-20">
				{children}
			</div>
		</div>
	)
}
