import NavigateThroughElementsButton from "../lab-structure/navigate-through-elements-button"

export default function Element3() {
	return (
		<div className="h-screen overflow-y-auto">
			<div className="fixed mt-4 flex items-center gap-2 ml-2">
				<NavigateThroughElementsButton />
			</div>
		</div>
	)
}
