"use client"

import { useCallback } from "react"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/shadcn/ui/button"

export default function BackButton () {
	const router = useRouter()

	const handleBack = useCallback(() => router.back, [router])

	return (
		<Button
			variant="ghost"
			onClick={handleBack}
			className="flex items-center justify-center font-medium text-gray-900 dark:text-gray-100 !py-8 !px-2"
			size="lg"
		>
			<ArrowLeft className="!w-12 !h-12" />
		</Button>
	)
}
