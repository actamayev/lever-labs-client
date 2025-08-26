"use client"

import { useCallback, useRef, useEffect } from "react"
import { cn } from "@/lib/shadcn/utils"

interface NavigationMorphingTextProps {
  className?: string
  staticText: string
  morphingTexts: string[]
  currentIndex: number
}

const SvgFilters: React.FC = () => (
	<svg
		id="nav-morphing-filters"
		className="fixed h-0 w-0"
		preserveAspectRatio="xMidYMid slice"
	>
		<defs>
			<filter id="nav-threshold">
				<feColorMatrix
					in="SourceGraphic"
					type="matrix"
					values="1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 255 -140"
				/>
			</filter>
		</defs>
	</svg>
)

export const NavigationMorphingText: React.FC<NavigationMorphingTextProps> = ({
	staticText,
	morphingTexts,
	currentIndex,
	className,
}) => {
	const text1Ref = useRef<HTMLSpanElement>(null)
	const text2Ref = useRef<HTMLSpanElement>(null)
	const isTransitioningRef = useRef(false)
	const prevIndexRef = useRef(currentIndex)

	const setMorphStyles = useCallback((fraction: number, fromIndex: number, toIndex: number) => {
		const [current1, current2] = [text1Ref.current, text2Ref.current]
		if (!current1 || !current2) return

		// current2 fades in (shows toIndex text)
		current2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`
		current2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`

		// current1 fades out (shows fromIndex text)
		const invertedFraction = 1 - fraction
		current1.style.filter = `blur(${Math.min(8 / invertedFraction - 8, 100)}px)`
		current1.style.opacity = `${Math.pow(invertedFraction, 0.4) * 100}%`

		// Set the text content
		current1.textContent = morphingTexts[fromIndex % morphingTexts.length] || ""
		current2.textContent = morphingTexts[toIndex % morphingTexts.length] || ""
	}, [morphingTexts])

	const setStaticStyles = useCallback((index: number) => {
		const [current1, current2] = [text1Ref.current, text2Ref.current]
		if (!current1 || !current2) return

		// Show current text in current2, hide current1
		current1.style.filter = "none"
		current1.style.opacity = "0%"
		current2.style.filter = "none"
		current2.style.opacity = "100%"

		current2.textContent = morphingTexts[index % morphingTexts.length] || ""
		current1.textContent = ""
	}, [morphingTexts])

	// Handle index changes with morphing animation
	useEffect(() => {
		if (currentIndex === prevIndexRef.current || isTransitioningRef.current) return

		isTransitioningRef.current = true
		const fromIndex = prevIndexRef.current
		const toIndex = currentIndex

		let startTime: number | null = null
		const morphDuration = 800 // ms

		const animate = (timestamp: number) => {
			if (!startTime) startTime = timestamp
			const elapsed = timestamp - startTime
			const fraction = Math.min(elapsed / morphDuration, 1)

			// Use easing for smoother transition
			const easedFraction = fraction < 0.5
				? 2 * fraction * fraction
				: 1 - Math.pow(-2 * fraction + 2, 2) / 2

			setMorphStyles(easedFraction, fromIndex, toIndex)

			if (fraction < 1) {
				requestAnimationFrame(animate)
			} else {
				// Animation complete
				setStaticStyles(toIndex)
				isTransitioningRef.current = false
				prevIndexRef.current = currentIndex
			}
		}

		requestAnimationFrame(animate)
	}, [currentIndex, setMorphStyles, setStaticStyles])

	// Initial setup
	useEffect(() => {
		setStaticStyles(currentIndex)
		prevIndexRef.current = currentIndex
	}, [setStaticStyles, currentIndex, morphingTexts])

	return (
		<div className={cn("leading-relaxed text-questionText text-center cursor-text", className)}>
			<div className="mb-4">
				{staticText}
			</div>
			<div
				className="relative [filter:url(#nav-threshold)_blur(0.6px)]"
				style={{ minHeight: "1.5em" }}
			>
				<span
					className="absolute inset-x-0 top-0 m-auto inline-block w-full"
					ref={text1Ref}
				/>
				<span
					className="absolute inset-x-0 top-0 m-auto inline-block w-full"
					ref={text2Ref}
				/>
			</div>
			<SvgFilters />
		</div>
	)
}
