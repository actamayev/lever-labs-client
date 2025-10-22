"use client"

import { cn } from "../lib/shadcn/utils"

export function landingParagraph (additionalClasses?: string): string {
	return cn(
		"text-lg sm:text-base md:text-base leading-relaxed text-wolf",
		additionalClasses
	)
}

export function landingBulletTextParagraph (additionalClasses?: string): string {
	return cn(
		"text-base sm:text-base md:text-base leading-relaxed text-wolf mt-1",
		additionalClasses
	)
}

export function landingBulletTextTitle (additionalClasses?: string): string {
	return cn(
		"text-lg sm:text-xl font-semibold text-humpbackText",
		additionalClasses
	)
}

export function landingTableHeader (additionalClasses?: string): string {
	return cn(
		"p-2 sm:p-4 font-semibold text-lg sm:text-lg md:text-xl text-center bg-humpback bg-opacity-10",
		additionalClasses
	)
}

export function landingTableText (additionalClasses?: string): string {
	return cn(
		"text-sm sm:text-sm md:text-base text-center text-wolf",
		additionalClasses
	)
}

export function landingSensorCardHeaderText (additionalClasses?: string): string {
	return cn(
		"text-lg md:text-xl font-semibold text-question-text",
		additionalClasses
	)
}

export function landingSensorCardText (additionalClasses?: string): string {
	return cn(
		"text-sm md:text-base text-wolf",
		additionalClasses
	)
}
