"use client"

import * as Blockly from "blockly"
import { observer } from "mobx-react"
import { usePathname } from "next/navigation"
import { BlocklyWorkspace } from "react-blockly"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { BlocklyJson } from "@lever-labs/common-ts/types/sandbox"
import { cn } from "../../lib/utils"
import personalInfoClass from "../../classes/personal-info-class"
import initializeBlocks from "../../utils/blockly/initialize-blocks"
import getWorkspaceConfig, { darkTheme, lightTheme } from "../../utils/blockly/workspace-config"
import { toolboxConfig } from "../../utils/blockly/toolbox-config"

interface LearnMiniSandboxProps {
	blocklyJson: BlocklyJson
	className?: string
}

// eslint-disable-next-line max-lines-per-function
function LearnMiniSandbox({ blocklyJson, className = "" }: LearnMiniSandboxProps): React.ReactNode {
	const isDarkMode = personalInfoClass.defaultSiteTheme === "dark"
	const containerRef = useRef<HTMLDivElement>(null)
	const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null)
	const pathname = usePathname()
	const [isCentered, setIsCentered] = useState(false)
	const [isCentering, setIsCentering] = useState(false)
	const [blocksInitialized, setBlocksInitialized] = useState(false)
	const isCalculatingScaleRef = useRef(false)
	const lastScaleCalculationRef = useRef<number>(0)

	const workspaceConfiguration = useMemo((): Blockly.BlocklyOptions => {
		return getWorkspaceConfig(isDarkMode, true, 1, true)
	}, [isDarkMode])

	const calculateOptimalScale = useCallback((): number => {
		// Prevent multiple simultaneous calculations
		if (isCalculatingScaleRef.current) {
			return lastScaleCalculationRef.current || 1
		}

		isCalculatingScaleRef.current = true

		const workspace = workspaceRef.current
		const container = containerRef.current

		if (!workspace || !container) {
			isCalculatingScaleRef.current = false
			return 1
		}

		const blocks = workspace.getAllBlocks()
		if (blocks.length === 0) {
			isCalculatingScaleRef.current = false
			return 1
		}

		// Get current scale before any changes
		const currentScale = workspace.getScale()

		// Temporarily reset to scale 1.0 to get accurate unscaled content metrics
		// This ensures we always calculate from workspace coordinates, not view coordinates
		if (Math.abs(currentScale - 1) > 0.01) {
			workspace.setScale(1)
			Blockly.svgResize(workspace)
		}

		// Force Blockly to resize and recalculate metrics before getting them
		Blockly.svgResize(workspace)

		// Get container dimensions
		const containerRect = container.getBoundingClientRect()
		const containerWidth = containerRect.width
		const containerHeight = containerRect.height

		if (containerWidth <= 0 || containerHeight <= 0) {
			isCalculatingScaleRef.current = false
			return 1
		}

		// Use Blockly's MetricsManager to get content dimensions (at scale 1.0)
		const metricsManager = workspace.getMetricsManager()
		const contentMetrics = metricsManager.getContentMetrics()

		const contentWidth = contentMetrics.width
		const contentHeight = contentMetrics.height

		// If no valid content dimensions, return default scale
		if (!contentWidth || !contentHeight || contentWidth <= 0 || contentHeight <= 0) {
			isCalculatingScaleRef.current = false
			return 1
		}

		// Add padding (use 85% of container to leave margins)
		const paddingFactor = 0.85
		const availableWidth = containerWidth * paddingFactor
		const availableHeight = containerHeight * paddingFactor

		// Calculate scale ratios for both dimensions
		const scaleX = availableWidth / contentWidth
		const scaleY = availableHeight / contentHeight

		// Use the smaller scale to ensure everything fits
		const optimalScale = Math.min(scaleX, scaleY, 1) // Cap at 1 to avoid zooming in

		// Set minimum scale to 0.3 (matching minScale in config) and maximum to 1
		const finalScale = Math.max(0.3, Math.min(optimalScale, 1))

		// Store the result for potential concurrent calls
		lastScaleCalculationRef.current = finalScale
		isCalculatingScaleRef.current = false

		return finalScale
	}, [])

	const centerWorkspace = useCallback((): void => {
		setIsCentering(true)
		const workspace = workspaceRef.current
		if (!workspace) {
			setIsCentering(false)
			return
		}

		// Calculate optimal scale based on block size and container size
		// This will temporarily reset to scale 1.0 to get accurate metrics
		const optimalScale = calculateOptimalScale()

		// Get current scale for comparison (after calculateOptimalScale, it might be 1.0)
		const currentScale = workspace.getScale()

		// Only set scale if it's meaningfully different (avoid unnecessary updates)
		if (Math.abs(currentScale - optimalScale) > 0.01) {
			// Set the scale and center the workspace
			workspace.setScale(optimalScale)

			// Force a resize after setting scale to ensure metrics are updated
			Blockly.svgResize(workspace)
		}

		// Small delay before centering to ensure scale is applied
		setTimeout((): void => {
			if (workspaceRef.current) {
				workspaceRef.current.scrollCenter()
			}
		}, 10)

		setIsCentered(true)
		setIsCentering(false)
	}, [calculateOptimalScale])

	const handleWorkspaceChange = useCallback((workspace: Blockly.WorkspaceSvg): void => {
		workspaceRef.current = workspace

		// Center workspace after blocks are loaded
		if (workspace.getAllBlocks().length > 0 && !isCentered) {
			setTimeout((): void => {
				centerWorkspace()
			}, 100)
		}
	}, [isCentered, centerWorkspace])

	useEffect((): void => {
		setIsCentered(false)
	}, [blocklyJson])

	// Reset isCentered when pathname changes (navigation)
	useEffect((): void => {
		setIsCentered(false)
	}, [pathname])

	// Add effect to center workspace after blocks are loaded
	useEffect((): () => void => {
		if (isCentered || isCentering || !blocksInitialized) return (): void => {}

		// Use a longer delay and multiple attempts to ensure blocks are fully rendered
		const timer = setTimeout((): void => {
			const workspace = workspaceRef.current
			if (!workspace) return

			const blocks = workspace.getAllBlocks()
			if (blocks.length === 0) return

			// Force resize to ensure metrics are calculated
			Blockly.svgResize(workspace)

			// Try multiple times with increasing delays to ensure metrics are ready
			const attemptScale = (attempt: number): void => {
				if (attempt > 3) {
					centerWorkspace() // Try anyway
					return
				}

				const metricsManager = workspace.getMetricsManager()
				const contentMetrics = metricsManager.getContentMetrics()

				if (contentMetrics.width > 0 && contentMetrics.height > 0) {
					centerWorkspace()
				} else {
					setTimeout((): void => attemptScale(attempt + 1), 100 * attempt)
				}
			}

			attemptScale(1)
		}, 300) // Initial delay to ensure blocks are rendered

		return (): void => clearTimeout(timer)
	}, [centerWorkspace, blocklyJson, isCentered, isCentering, pathname, blocksInitialized])

	useEffect((): void => {
		if (workspaceRef.current) {
			workspaceRef.current.setTheme(isDarkMode ? darkTheme : lightTheme)
		}
	}, [isDarkMode])

	useEffect((): () => void => {
		if (!containerRef.current) return (): void => {}

		const resizeObserver = new ResizeObserver((): void => {
			const workspace = workspaceRef.current
			if (!workspace || isCentering) return // Don't recalculate while centering

			// Recalculate scale when container resizes
			if (workspace.getAllBlocks().length > 0) {
				// Use a small delay to ensure resize is processed
				setTimeout((): void => {
					if (!workspaceRef.current || isCentering) return

					const optimalScale = calculateOptimalScale()
					const currentScale = workspaceRef.current.getScale()

					if (Math.abs(currentScale - optimalScale) > 0.01) {
						workspaceRef.current.setScale(optimalScale)
						Blockly.svgResize(workspaceRef.current)
						workspaceRef.current.scrollCenter()
					}
				}, 150)
			}
		})

		resizeObserver.observe(containerRef.current)

		return (): void => {
			resizeObserver.disconnect()
		}
	}, [calculateOptimalScale, isCentering])

	useEffect((): void => {
		const initBlocks = async (): Promise<void> => {
			await initializeBlocks()
			setBlocksInitialized(true)
		}
		void initBlocks()
	}, [])

	if (!blocksInitialized) {
		return (
			<div className={cn("relative z-0 rounded-3xl overflow-hidden h-full flex-1 flex items-center justify-center", className)}>
				<p className="text-gray-500">Loading blocks...</p>
			</div>
		)
	}

	return (
		<div
			ref={containerRef}
			className={cn("relative z-0 rounded-3xl overflow-hidden h-full flex-1", className)}
		>
			<BlocklyWorkspace
				key={`${blocksInitialized}-${JSON.stringify(blocklyJson)}`}
				initialJson={blocklyJson}
				toolboxConfiguration={toolboxConfig}
				workspaceConfiguration={workspaceConfiguration}
				className="h-full duration-0"
				onWorkspaceChange={handleWorkspaceChange}
			/>
		</div>
	)
}

export default observer(LearnMiniSandbox)
