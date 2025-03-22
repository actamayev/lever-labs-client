interface Props {
	title: string
	children: React.ReactNode
}

export default function WorkbenchCardTemplate(props: Props) {
	const { title, children } = props
	return (
		<div className="shadow-sm p-4 mb-4 min-h-36 border-2 border-swan rounded-2xl text-eel">
			<h3 className="font-medium text-lg">{title}</h3>
			<div>
				{children}
			</div>
		</div>
	)
}
