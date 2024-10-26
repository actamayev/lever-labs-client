import { useEffect } from "react"
import TagManager from "react-gtm-module"

const tagManagerArgs = {
	gtmId: process.env.REACT_APP_GTM_ID as string
}

export default function useInitializeTagManager(): void {
	useEffect(() => {
		TagManager.initialize(tagManagerArgs)
	}, [])
}
