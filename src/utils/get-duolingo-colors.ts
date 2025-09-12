"use client"

export interface DuolingoColorVariants {
	bg: string
	bg1: string
	bg2: string
	bg3: string
	hoverBg: string
	hoverBg1: string
	hoverBg2: string
	hoverBg3: string
	text: string
	text1: string
	text2: string
	text3: string
	border: string
	border1: string
	border2: string
	border3: string
	ring: string
	ring1: string
	ring2: string
	ring3: string
	shadow: string
	shadow1: string
	shadow2: string
	shadow3: string
	hoverShadow: string
}

export default function getDuolingoColors(baseColor: DuolingoColors): DuolingoColorVariants {
	return {
		// Main background (base color)
		bg: `bg-${baseColor}`,

		// Variant backgrounds
		bg1: `bg-${baseColor}-1`,  // For coding concepts
		bg2: `bg-${baseColor}-2`,  // For components
		bg3: `bg-${baseColor}-3`,  // For additional elements

		// Hover backgrounds
		hoverBg: `hover:bg-${baseColor}`,
		hoverBg1: `hover:bg-${baseColor}-1`,
		hoverBg2: `hover:bg-${baseColor}-2`,
		hoverBg3: `hover:bg-${baseColor}-3`,

		// Text colors
		text: `text-${baseColor}`,
		text1: `text-${baseColor}-1`,
		text2: `text-${baseColor}-2`,
		text3: `text-${baseColor}-3`,

		// Border colors
		border: `border-${baseColor}`,
		border1: `border-${baseColor}-1`,
		border2: `border-${baseColor}-2`,
		border3: `border-${baseColor}-3`,

		// Ring colors
		ring: `ring-${baseColor}`,
		ring1: `ring-${baseColor}-1`,
		ring2: `ring-${baseColor}-2`,
		ring3: `ring-${baseColor}-3`,

		shadow: `shadow-${baseColor}`,
		shadow1: `shadow-${baseColor}-1`,
		shadow2: `shadow-${baseColor}-2`,
		shadow3: `shadow-${baseColor}-3`,

		hoverShadow: `hover:shadow-${baseColor}-3`,
	}
}
