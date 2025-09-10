/**
 * Helper to create image content for career quest
 * @param filename - Just the filename, e.g. "pip-intro.jpg"
 * @param subfolder - Optional subfolder under /images/career-quest/, e.g. "meet-pip"
 * @param options - Optional width, height, alt text
 */
export function createImage(
	filename: string,
	subfolder?: string,
	options?: { width?: number; height?: number; alt?: string }
): RightContent {
	const path = subfolder
		? `/images/career-quest/${subfolder}/${filename}`
		: `/images/career-quest/${filename}`

	return {
		type: "image",
		src: path,
		alt: options?.alt || `Career quest image: ${filename}`,
		width: options?.width || 800,
		height: options?.height || 600
	}
}
