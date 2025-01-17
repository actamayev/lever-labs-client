import { ReactSVG } from "react"
import { createLucideIcon } from "lucide-react"

export function createIconFromSvg(name: string, svg: string) {
	// Parse the SVG string to get path elements
	const parser = new DOMParser()
	const doc = parser.parseFromString(svg, "image/svg+xml")
	const paths = Array.from(doc.querySelectorAll("path"))

	// Convert paths to Lucide format
	const pathData = paths.map(path => {
		const attributes: Record<string, string> = {
			d: path.getAttribute("d") || "",
		}

		// Only add non-null attributes
		const stroke = path.getAttribute("stroke")
		const fill = path.getAttribute("fill")

		if (stroke) attributes.stroke = stroke
		if (fill) attributes.fill = fill

		return ["path", attributes] as [keyof ReactSVG, Record<string, string>]
	})

	return createLucideIcon(name, pathData)
}
