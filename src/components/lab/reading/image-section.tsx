import isEmpty from "lodash-es/isEmpty"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Props {
	images: string[]
	currentIndex: number
	onNavigate: (index: number) => void
}

export default function ImageSection (props: Props) {
	const { images, currentIndex, onNavigate } = props
	if (isEmpty(images)) return null

	return (
		<div className="relative h-full flex flex-col">
			<div className="flex-1 relative">
				<img
					src={images[currentIndex]}
					alt={`Content image ${currentIndex + 1}`}
					className="absolute inset-0 w-full h-full object-contain"
				/>
			</div>

			{images.length > 1 && (
				<div className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-4">
					<button
						onClick={() => onNavigate(currentIndex - 1)}
						disabled={currentIndex <= 0}
						className="p-2 rounded-full bg-gray-800/50 text-white disabled:opacity-50 disabled:cursor-not-allowed"
					>
						<ChevronLeft className="w-6 h-6" />
					</button>

					<button
						onClick={() => onNavigate(currentIndex + 1)}
						disabled={currentIndex >= images.length - 1}
						className="p-2 rounded-full bg-gray-800/50 text-white disabled:opacity-50 disabled:cursor-not-allowed"
					>
						<ChevronRight className="w-6 h-6" />
					</button>
				</div>
			)}
		</div>
	)
}
