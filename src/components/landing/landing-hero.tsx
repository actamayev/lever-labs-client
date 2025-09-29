"use client"

import Image from "next/image"

export default function LandingHero(): React.ReactNode {
	return (
		<section className="relative w-full h-screen overflow-hidden">
			{/* Image covers the viewport; excess is cropped */}
			<div className="absolute inset-0">
				<Image
					src="/trmnl-hero.jpg"
					alt="TRMNL style hero"
					fill
					sizes="100vw"
					quality={100}
					priority
					style={{ objectFit: "cover", objectPosition: "center 35%" }}
				/>
			</div>
		</section>
	)
}
