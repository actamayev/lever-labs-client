import { FaEye, FaEyeSlash } from "react-icons/fa"
import HoverOutlineComponent from "../hover-outline-component"

interface Props {
	showPassword: boolean
	setShowPassword: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ShowOrHidePasswordButton (props: Props) {
	const { showPassword, setShowPassword } = props

	return (
		<HoverOutlineComponent
			onClickAction={() => setShowPassword(!showPassword)}
			classes="absolute flex items-center justify-center right-0.5"
			top="39%"
		>
			<div className="text-black dark:text-white">
				{showPassword ?
					<FaEye  /> :
					<FaEyeSlash  />
				}
			</div>
		</HoverOutlineComponent>
	)
}
