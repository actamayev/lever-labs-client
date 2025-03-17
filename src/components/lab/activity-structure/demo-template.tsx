"use client"

interface Props {
	children: React.ReactNode
}

export default function DemoTemplate(props: Props) {
	const { children } = props

	return (
		<div className="flex flex-col h-screen min-h-0">
			<div className="flex-1 min-h-0 pt-24">
				{children}
			</div>
		</div>
	)
}
