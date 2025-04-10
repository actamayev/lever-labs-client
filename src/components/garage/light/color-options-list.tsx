import React from "react"
import Swatch from "@uiw/react-color-swatch"
import { hsvaToRgba, RgbaColor, rgbaToHex } from "@uiw/color-convert"
import useColorChange from "../../../hooks/garage/color-change"


export default function ColorOptionsList() {
	const handleColorChange = useColorChange()

	const colors: RgbaColor[] = [
		{ r: 255, g: 0, b: 0, a: 1 },     // Red
		{ r: 255, g: 255, b: 0 , a: 1 },  // Yellow
		{ r: 0, g: 255, b: 0 , a: 1 },   // Green
		{ r: 0, g: 255, b: 255 , a: 1 },   // Green
		{ r: 0, g: 0, b: 255 , a: 1 },  // Blue
		{ r: 255, g: 0, b: 255 , a: 1 },  // Violet
		{ r: 158, g: 158, b: 158 , a: 1 }, // Gray
		{ r: 0, g: 0, b: 0, a: 1 }        // Black
	]

	return (
		<div className="border-2 p-1 border-hare rounded-xl mt-2">
			<Swatch
				colors={colors.map(color => rgbaToHex(color))}
				rectProps={{
					style: {
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						margin: "2px",
						borderRadius: "4px",
					},
				}}
				onChange={(hsvColor) => handleColorChange(hsvaToRgba(hsvColor))}
			/>
		</div>
	)
}
