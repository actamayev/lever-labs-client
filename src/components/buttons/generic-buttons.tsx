import { BlueTactileButton } from "./tactile-buttons"

interface Props {
	loading: boolean
	title: string
}

export default function AuthButton(props: Props) {
	const { loading, title } = props

	return (
		<BlueTactileButton
			type="submit"
			disabled={loading}
			shadowHeight={4}
			className="w-full h-12 my-2"
		>
			{title}
		</BlueTactileButton>
	)
}
