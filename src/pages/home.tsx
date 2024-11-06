import BlueDot from "../components/blue-dot"
import PageHelmet from "../components/helmet/page-helmet"

export default function Home() {
	return (
		<>
			<PageHelmet pageTitle="/" />
			<div>
				<div className="flex justify-center w-full mt-32">
					<div className="w-full max-w-3xl">
						<div className="flex flex-col items-center">
							<BlueDot />
							<div className="text-slate-800 dark:text-slate-50">
							Stay tuned, coming soon...
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
