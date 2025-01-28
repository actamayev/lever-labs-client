import { ChevronLeft, ChevronRight } from "lucide-react"

interface ImageSectionProps {
  images: string[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}

export default function ImageSection ({
	images,
	currentIndex,
	onNavigate,
} : ImageSectionProps) {
	if (images.length === 0) {
		return (
			<div className="h-full flex items-center justify-center text-gray-500">
				No images available yet
			</div>
		)
	}

	return (
		<div className="relative h-full flex flex-col">
			{/* Image display */}
			<div className="flex-1 relative">
				<img
					src={images[currentIndex]}
					alt={`Content image ${currentIndex + 1}`}
					className="absolute inset-0 w-full h-full object-contain"
				/>
			</div>

			{/* Navigation controls */}
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
		</div>
	)
}
