interface Props {
	error: string
}

export default function ErrorMessage (props: Props) {
	const { error } = props

	return (
		<div className="mt-2 bg-red-100 text-red-700 px-4 py-3 rounded relative">
			{error}
		</div>
	)
}
