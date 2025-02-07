import { LucideIcon } from "lucide-react"

declare global {
	interface Demo {
		demoTitle: DemoNames
		demoDescription: string
		demoIcon: LucideIcon
		// demoOnclickEndpoint: () => Promise<AxiosResponse<AllCommonResponses>>
	}
}

export {}
