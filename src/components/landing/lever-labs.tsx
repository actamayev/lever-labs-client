"use client"

import Image from "next/image"

export default function LeverLabs(): React.ReactNode {
	return (
		<div className="flex justify-center">
			<Image
				src="/favicon.svg"
				alt="Lever Labs Logo"
				width={320}
				height={320}
				className="size-52 sm:size-52 md:size-64 lg:size-80"
			/>
		</div>
	)
}
