/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState } from "react"
import QuizSection from "./quiz-section"
import ImageSection from "./image-section"
import ContentManager from "./content-manager"

export default function ReadingContainer ({ blocks } : { blocks: ContentBlock[] }) {
	const [readingState, setReadingState] = useState<ReadingState>({
		revealedBlocks: [blocks[0].id], // First block always visible
		completedQuizzes: [],
		availableImages: [],
		currentImageIndex: -1,
	})

	const handleContinue = (blockId: string) => {
		const currentBlock = blocks.find(block => block.id === blockId)
		const nextBlock = blocks[blocks.findIndex(b => b.id === blockId) + 1] as ContentBlock | undefined

		if (currentBlock?.action.imageChange) {
			setReadingState(prev => ({
				...prev,
				availableImages: [...prev.availableImages, ...currentBlock.action.imageChange!.images],
				currentImageIndex: currentBlock.action.imageChange!.autoSelect ?? prev.currentImageIndex,
			}))
		}

		if (nextBlock) {
			setReadingState(prev => ({
				...prev,
				revealedBlocks: [...prev.revealedBlocks, nextBlock.id],
			}))
		}
	}

	const handleQuizComplete = (blockId: string) => {
		const nextBlock = blocks[blocks.findIndex(b => b.id === blockId) + 1] as ContentBlock | undefined

		setReadingState(prev => ({
			...prev,
			completedQuizzes: [...prev.completedQuizzes, blockId],
			revealedBlocks: nextBlock ? [...prev.revealedBlocks, nextBlock.id] : prev.revealedBlocks,
		}))
	}

	return (
		<div className="h-full flex">
			{/* Reading section - 3/5 width, scrollable */}
			<div className="w-3/5 h-full overflow-y-auto border-r">
				<ContentManager
					blocks={blocks}
					readingState={readingState}
					onContinue={handleContinue}
					onQuizComplete={handleQuizComplete}
				/>
			</div>

			{/* Right section - 2/5 width */}
			<div className="w-2/5 h-full flex flex-col">
				{/* Image section - 2/5 height */}
				<div className="h-2/5 border-b">
					<ImageSection
						images={readingState.availableImages}
						currentIndex={readingState.currentImageIndex}
						onNavigate={(index) => setReadingState(prev => ({ ...prev, currentImageIndex: index }))}
					/>
				</div>

				{/* Quiz section - 3/5 height */}
				<div className="h-3/5 overflow-y-auto">
					<QuizSection
						blocks={blocks}
						readingState={readingState}
						onQuizComplete={handleQuizComplete}
					/>
				</div>
			</div>
		</div>
	)
}
