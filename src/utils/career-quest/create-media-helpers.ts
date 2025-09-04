// utils/career-quest/media-helpers.ts
// Simple helpers for creating image and video content

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

/**
   * Helper to create video content for career quest
   * @param filename - Just the filename, e.g. "pip-demo.mp4"
   * @param subfolder - Optional subfolder under /videos/career-quest/, e.g. "meet-pip"
   * @param options - Optional video settings
   */
export function createVideo(
	filename: string,
	subfolder?: string,
	options?: {
		poster?: string;
		autoplay?: boolean;
		loop?: boolean;
		muted?: boolean
	}
): RightContent {
	const path = subfolder
		? `/videos/career-quest/${subfolder}/${filename}`
		: `/videos/career-quest/${filename}`

	return {
		type: "video",
		src: path,
		poster: options?.poster,
		autoplay: options?.autoplay || false,
		loop: options?.loop || false,
		muted: options?.muted !== false // Default to true unless explicitly set to false
	}
}
