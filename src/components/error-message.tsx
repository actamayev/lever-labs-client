import _ from "lodash"

interface Props {
	error: string
}

export default function ErrorMessage (props: Props) {
	const { error } = props

	if (_.isEmpty(error)) return null

	return (
		<div className="mt-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
			{error}
		</div>
	)
}
