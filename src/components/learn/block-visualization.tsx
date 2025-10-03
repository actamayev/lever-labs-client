"use client"

import Image from "next/image"
import { CodingBlock } from "@lever-labs/common-ts/types/learn"
import { getBlockImagePath } from "../../utils/blockly/get-block-image-path"

interface BlockVisualizationProps {
	codingBlock: CodingBlock
	className?: string
}

export default function BlockVisualization({ codingBlock, className = "" }: BlockVisualizationProps): React.ReactNode {
	const imagePath = getBlockImagePath(codingBlock)

	return (
		<div className={`relative ${className}`}>
			<Image
				src={imagePath}
				alt={`Block ${codingBlock.blockName}`}
				fill
				className="object-contain"
				onError={(_e): void => {
					console.error(`Failed to load image: ${imagePath}`)
				}}
			/>
		</div>
	)
}
