export function getGarageStatusClasses(status: GarageStatusValue): { className: string, shadowClass: string } {
	const baseClasses = "h-8 w-8 rounded-lg flex items-center justify-center duration-150"

	let statusClasses: string
	let shadowClass: string

	switch (status) {
		case "none":
			statusClasses = "bg-standardBackground text-wolf border border-swan"
			shadowClass = "shadow-swan"
			break
		case "all-on":
			statusClasses = "bg-chargingGreen text-standardBackground border border-chargingGreen"
			shadowClass = "shadow-chargingGreen-2"
			break
		case "all-off":
			statusClasses = "bg-cardinal text-standardBackground border border-cardinal"
			shadowClass = "shadow-cardinal-2"
			break
		case "mixed":
			statusClasses = "bg-standardBackground text-wolf border border-swan"
			shadowClass = "shadow-swan"
			break
		default:
			statusClasses = "bg-standardBackground text-wolf border border-swan"
			shadowClass = "shadow-swan"
	}

	return {
		className: `${baseClasses} ${statusClasses}`,
		shadowClass
	}
}
