interface Props {
	children: React.ReactNode
}

export default function WorkbenchCardTemplate(props: Props) {
	const { children } = props
	return (
		<div className="shadow-sm p-4 mb-4 min-h-24 border-2 border-swan rounded-2xl text-eel">
			{children}
		</div>
	)
}
