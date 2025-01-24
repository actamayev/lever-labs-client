import { observer } from "mobx-react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/shadcn/ui/button"
import { usePipContext } from "../../../contexts/pip-context"
import useTypedNavigate from "../../../hooks/navigate/typed-navigate"

interface Props {
    videoTitle: string
    ytVideoId: string
	ytVideoTitle: string
    nextPageLink: LabPages
    whereToGoOnExist: PageNames
    isNextPageDemo?: boolean
}

function LabVideoComponent(props: Props) {
	const { videoTitle, ytVideoId, nextPageLink, ytVideoTitle, whereToGoOnExist, isNextPageDemo = false } = props
	const pipClass = usePipContext()
	const navigate = useTypedNavigate()

	const isNextButtonDisabled = isNextPageDemo && !pipClass.doesUserHaveAPip

	return (
		<div className="h-screen relative">
			<div className="h-full flex flex-col items-center">
				{/* Header area with back button and title */}
				<div className="w-full max-w-7xl relative mt-12">
					<Button
						variant="ghost"
						className="absolute left-0 !text-2xl"
						onClick={() => navigate(whereToGoOnExist)}
					>
						<ArrowLeft className="mr-2 !h-6 !w-6" />
                        Back
					</Button>
					<h2 className="text-4xl font-semibold text-center">{videoTitle}</h2>
				</div>

				{/* Video container with separator */}
				<div className="w-full max-w-4xl flex-1 flex flex-col items-center justify-center">
					<div className="w-full">
						<div className="relative aspect-video">
							<iframe
								className="w-full h-full rounded-xl"
								src={`https://www.youtube.com/embed/${ytVideoId}`}
								title={ytVideoTitle}
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
							/>
						</div>
						<div className="w-full h-1 dark:bg-zinc-700 bg-zinc-300 rounded-full mt-8" />
					</div>
				</div>

				{/* Next button */}
				<div className="w-full max-w-7xl relative">
					<Button
						className="absolute bottom-4 right-4 !text-2xl"
						onClick={() => navigate(nextPageLink)}
						disabled={isNextButtonDisabled}
					>
                        Next
						<ArrowRight className="ml-2 !h-6 !w-6" />
					</Button>
				</div>
			</div>
		</div>
	)
}

export default observer(LabVideoComponent)
