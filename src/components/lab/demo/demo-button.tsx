export default function DemoButton({ demo } : { demo: Demo }) {
	// const demoButtonOnClick = useDemoButtonOnClick()

	// const handleDemoClick = useCallback((demoEndpoint: () => Promise<AxiosResponse<DemoResponse | NonSuccessResponse>>) => {
	// 	return async (e: React.MouseEvent) => {
	// 		e.preventDefault()
	// 		await demoButtonOnClick(demoEndpoint)
	// 	}
	// }, [demoButtonOnClick])

	return (
		<button
			className="p-0 border border-zinc-200 dark:border-zinc-700 rounded-lg
                bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100
                dark:hover:bg-zinc-800 transition-colors text-left flex items-stretch"
		>
			{/* Left Icon Section */}
			<div className="flex items-center justify-center w-24 border-r
                border-zinc-200 dark:border-zinc-700">
				<demo.demoIcon className="h-12 w-12 text-zinc-700 dark:text-zinc-300" />
			</div>

			{/* Content Section */}
			<div className="flex-1 p-4">
				<h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-2">
					{demo.demoTitle}
				</h3>
				<p className="text-zinc-600 dark:text-zinc-400">
					{demo.demoDescription}
				</p>
			</div>
		</button>
	)
}
