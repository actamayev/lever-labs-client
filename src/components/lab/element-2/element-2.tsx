import NavigateThroughElementsButton from "../lab-structure/navigate-through-elements-button"

export default function Element2() {
	return (
		<div className="h-screen overflow-y-auto">
			<div className="fixed mt-6 ml-2 flex flex-row items-start gap-4 z-50">
				<NavigateThroughElementsButton />
			</div>
		</div>
	)
}
