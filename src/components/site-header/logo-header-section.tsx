import { Link } from "react-router-dom"

export default function LogoHeaderSection() {
	return (
		<div className="inline-flex items-center flex-grow-0 flex-shrink-0 z-10">
			<Link
				to="/"
				className="flex items-center font-semibold text-3xl flex-shrink-0
				text-slate-950 hover:text-pipTheme dark:text-white dark:hover:text-slate-200"
			>
				<img
					src="/favicon.svg"
					alt="Logo"
					className="ml-1"
					style={{ height: "40px", verticalAlign: "middle" }}
				/>
				<span className="ml-2">Blue Dot Robots</span>
			</Link>
		</div>
	)
}
