import { Link } from "react-router-dom"

export default function LogoHeaderSection() {
	return (
		<div className="inline-flex items-center flex-grow-0 flex-shrink-0 z-10">
			<Link
				to="/"
				className="flex items-center font-semibold text-3xl flex-shrink-0 text-zinc-950
				dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
			>
				<img
					src={"/favicon.svg"}
					alt="Logo"
					className="ml-1"
					style={{ height: "40px", verticalAlign: "middle" }}
				/>
				<span className="ml-2">Blue Dot Robots</span>
			</Link>
		</div>
	)
}
