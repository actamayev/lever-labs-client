export default function rgbToHex(r: number, g: number, b: number): HexColor {
	// Ensure values are in valid range (0-255)
	r = Math.max(0, Math.min(255, Math.round(r)))
	g = Math.max(0, Math.min(255, Math.round(g)))
	b = Math.max(0, Math.min(255, Math.round(b)))

	// Convert to hex and pad with zeros if needed
	const hexR = r.toString(16).padStart(2, "0")
	const hexG = g.toString(16).padStart(2, "0")
	const hexB = b.toString(16).padStart(2, "0")

	// Return the hex color string
	return `#${hexR}${hexG}${hexB}`.toUpperCase() as HexColor
}
