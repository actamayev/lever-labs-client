import { useCallback } from "react"
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router"
import { Button } from "@/components/shadcn/ui/button"

export default function BackButton () {
	const navigate = useNavigate()

	const handleBack = useCallback(() => navigate(-1), [navigate])

	return (
		<Button
			variant="ghost"
			onClick={handleBack}
			className="flex items-center justify-center font-medium text-zinc-900 dark:text-zinc-100 !py-6 !px-2"
			size="lg"
		>
			<ArrowLeft className="!w-12 !h-12" />
		</Button>
	)
}
