/* eslint-disable @typescript-eslint/explicit-function-return-type */
/**
 * Generate Tailwind background classes for different color variants
 */
export const getDuolingoColors = (baseColor: DuolingoColors) => {
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

		shadow: `shadow-${baseColor}-2`,
		hoverShadow: `hover:shadow-${baseColor}-3`,
	}
}

/**
 * Get progress bar colors (lighter variants work well for progress)
 */
export const getProgressColors = (baseColor: DuolingoColors) => {
	return {
		background: `bg-${baseColor}-2`,    // Darker background
		fill: `bg-${baseColor}-1`,          // Lighter fill
		highlight: `bg-${baseColor}`,       // Main color for highlight
	}
}
