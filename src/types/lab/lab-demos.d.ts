import { LucideIcon } from "lucide-react"

declare global {
	interface Demo {
		demoTitle: string
		demoDescription: string
		demoIcon: LucideIcon
		// demoOnclickEndpoint: () => Promise<AxiosResponse<DemoResponse | NonSuccessResponse>>
	}
}

export {}
