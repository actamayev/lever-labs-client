interface Props {
	title: string
	customStyles?: object
	children: React.ReactNode
}

export default function AuthTemplate(props: Props) {
	const { title, children, customStyles = {} } = props

	return (
		<div className="flex justify-center">
			<div
				className="bg-white dark:bg-zinc-800 border rounded-lg p-5 mx-auto border-zinc-100 dark:border-zinc-700"
				style={customStyles}
			>
				<h1 className="flex mx-auto mb-4 text-5xl font-extrabold leading-none tracking-tight text-zinc-950 dark:text-zinc-200">
					{title}
				</h1>
				{children}
			</div>
		</div>
	)
}
