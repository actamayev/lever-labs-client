"use client"

export function getGarageStatusClasses(status: GarageStatusValue): { className: string, shadowClass: string } {
	const baseClasses = "h-8 w-8 rounded-lg flex items-center justify-center duration-0"

	let statusClasses: string
	let shadowClass: string

	switch (status) {
		case "none":
			statusClasses = "bg-standard-background text-wolf border border-swan"
			shadowClass = "shadow-swan"
			break
		case "all-on":
			statusClasses = "bg-charging-green text-standard-background border border-charging-green"
			shadowClass = "shadow-charging-green-2"
			break
		case "all-off":
			statusClasses = "bg-cardinal text-standard-background border border-cardinal"
			shadowClass = "shadow-cardinal-2"
			break
		case "mixed":
			statusClasses = "bg-standard-background text-wolf border border-swan"
			shadowClass = "shadow-swan"
			break
		default:
			statusClasses = "bg-standard-background text-wolf border border-swan"
			shadowClass = "shadow-swan"
	}

	return {
		className: `${baseClasses} ${statusClasses}`,
		shadowClass
	}
}
