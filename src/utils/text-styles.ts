import { cn } from "../lib/shadcn/utils"

export function landingParagraph (additionalClasses?: string): string {
	return cn(
		"text-lg sm:text-base md:text-base leading-relaxed text-lightLandingPageText",
		additionalClasses
	)
}

export function landingBulletTextParagraph (additionalClasses?: string): string {
	return cn(
		"text-sm sm:text-base md:text-base leading-relaxed text-lightLandingPageText",
		additionalClasses
	)
}

export function landingBulletTextTitle (additionalClasses?: string): string {
	return cn(
		"text-lg sm:text-xl font-semibold text-pipThemeText",
		additionalClasses
	)
}

export function landingTableHeader (additionalClasses?: string): string {
	return cn(
		"p-2 sm:p-4 font-semibold text-md sm:text-lg md:text-xl text-center bg-pipTheme bg-opacity-10",
		additionalClasses
	)
}

export function landingTableText (additionalClasses?: string): string {
	return cn(
		"text-sm sm:text-sm md:text-base text-center text-lightLandingPageText",
		additionalClasses
	)
}

export function landingSensorCardText (additionalClasses?: string): string {
	return cn(
		"text-sm sm:text-sm md:text-base text-center text-lightLandingPageText",
		additionalClasses
	)
}
