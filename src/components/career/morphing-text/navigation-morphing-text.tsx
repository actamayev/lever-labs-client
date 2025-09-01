"use client"

import { useCallback, useEffect, useRef } from "react"
import { cn } from "@/lib/shadcn/utils"

interface NavigationMorphingTextProps {
	className?: string
	staticText: string
	morphingTexts: string[]
	currentIndex: number
	onAnimationStateChange?: (isAnimating: boolean) => void
}

const morphTime = 0.5  // Match original timing

// eslint-disable-next-line max-lines-per-function
export const NavigationMorphingText: React.FC<NavigationMorphingTextProps> = ({
	staticText,
	morphingTexts,
	currentIndex,
	className,
	onAnimationStateChange,
}) => {
	const text1Ref = useRef<HTMLSpanElement>(null)
	const text2Ref = useRef<HTMLSpanElement>(null)
	const morphRef = useRef(0)
	const cooldownRef = useRef(0)
	const timeRef = useRef(new Date())
	const targetIndexRef = useRef(currentIndex)
	const currentDisplayIndexRef = useRef(currentIndex)
	const isAnimatingRef = useRef(false)

	const setStyles = useCallback((fraction: number, fromIndex: number, toIndex: number) => {
		const [current1, current2] = [text1Ref.current, text2Ref.current]
		if (!current1 || !current2) return

		// Match original blur and opacity calculations exactly
		current2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`
		current2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`

		const invertedFraction = 1 - fraction
		current1.style.filter = `blur(${Math.min(8 / invertedFraction - 8, 100)}px)`
		current1.style.opacity = `${Math.pow(invertedFraction, 0.4) * 100}%`

		current1.textContent = morphingTexts[fromIndex % morphingTexts.length] || ""
		current2.textContent = morphingTexts[toIndex % morphingTexts.length] || ""
	}, [morphingTexts])

	const doMorph = useCallback(() => {
		morphRef.current += 0.016 // Approximate frame time for smooth animation
		cooldownRef.current = 0

		let fraction = morphRef.current / morphTime

		if (fraction > 1) {
			fraction = 1
		}

		const fromIndex = currentDisplayIndexRef.current
		const toIndex = targetIndexRef.current
		setStyles(fraction, fromIndex, toIndex)

		if (fraction === 1) {
			currentDisplayIndexRef.current = targetIndexRef.current
			isAnimatingRef.current = false
			onAnimationStateChange?.(false)
		}
	}, [setStyles, onAnimationStateChange])

	const doCooldown = useCallback(() => {
		morphRef.current = 0
		const [current1, current2] = [text1Ref.current, text2Ref.current]
		if (current1 && current2) {
			current2.style.filter = "none"
			current2.style.opacity = "100%"
			current1.style.filter = "none"
			current1.style.opacity = "0%"

			// Show current text
			current2.textContent = morphingTexts[currentDisplayIndexRef.current % morphingTexts.length] || ""
			current1.textContent = ""
		}
	}, [morphingTexts])

	// Trigger animation when currentIndex changes
	useEffect(() => {
		if (currentIndex !== targetIndexRef.current) {
			targetIndexRef.current = currentIndex
			isAnimatingRef.current = true
			morphRef.current = 0
			cooldownRef.current = 0
			onAnimationStateChange?.(true)
		}
	}, [currentIndex, onAnimationStateChange])

	useEffect(() => {
		let animationFrameId: number

		const animate = () => {
			animationFrameId = requestAnimationFrame(animate)

			const newTime = new Date()
			const dt = (newTime.getTime() - timeRef.current.getTime()) / 1000
			timeRef.current = newTime

			if (isAnimatingRef.current) {
				cooldownRef.current -= dt
				if (cooldownRef.current <= 0) {
					doMorph()
				} else {
					doCooldown()
				}
			} else {
				doCooldown()
			}
		}

		animate()
		return () => {
			cancelAnimationFrame(animationFrameId)
		}
	}, [doMorph, doCooldown])

	return (
		<div className={cn("leading-relaxed text-questionText text-center cursor-text", className)}>
			<div className="mb-4">
				{staticText}
			</div>
			<div
				className="relative [filter:url(#nav-threshold)]"
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
		</div>
	)
}
