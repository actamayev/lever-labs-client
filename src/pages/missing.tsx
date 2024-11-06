import { Link } from "react-router-dom"
import { FaHome } from "react-icons/fa"

export default function Missing() {
	return (
		<div className="text-center">
			<div className="text-lg text-slate-800 mb-8 dark:text-slate-200">
				Page Not Found
			</div>
			<Link to="/" className="inline-block">
				<div
					className="bg-blue-500 hover:bg-blue-600 text-white rounded focus:outline-none \
            		dark:text-slate-950 dark:bg-blue-400 dark:hover:bg-blue-500 inline-flex items-center px-4 py-2"
				>
					Return home <FaHome className="ml-2" size={20}/>
				</div>
			</Link>
		</div>
	)
}
