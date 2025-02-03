import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router"
import { Button } from "@/components/shadcn/ui/button"

export default function BackButton () {
	const navigate = useNavigate()

	const handleBack = () => {
		navigate(-1)
	}

	return (
		<Button
			variant="ghost"
			onClick={handleBack}
			className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
		>
			<ArrowLeft className="w-4 h-4" />
			Back
		</Button>
	)
}
