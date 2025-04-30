"use client"

import { useCallback } from "react"
import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import fireConfetti from "../fire-confetti"
import { usePipContext } from "../../contexts/pip-context"
import useToastOptions from "../../components/toast-options"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { useApiClientContext } from "../../contexts/blue-dot-api-client-context"
import { useSerialManagerContext } from "../../contexts/serial-manager-context"
import { CppParser, MessageBuilder } from "@bluedotrobots/common-ts"

export default function useSendCppToPip(): (
	cppCode: string,
	rect: DOMRect
) => Promise<void> {
	const pipClass = usePipContext()
	const blueDotApiClient = useApiClientContext()
	const toast = useToastOptions()
	const serialManager = useSerialManagerContext()

	return useCallback(async (cppCode: string, rect: DOMRect) => {
		try {
			if (serialManager.connected) {
				const bytecode = CppParser.cppToByte(cppCode)
				const buffer = MessageBuilder.createBytecodeMessage(bytecode)

				const success = await serialManager.sendBinaryMessage(buffer)
				if (success) {
					fireConfetti(
						rect,
						({ particleCount: 300, startVelocity: 30 })
					)
				}
				return
			}

			if (isNull(pipClass.selectedPip)) {
				return toast.neutral({
					title: "You have not connected to a Pip",
					description: "Please connect to a Pip to upload code"
				})
			}
			if (pipClass.isSendingCppToPip === true) {
				return toast.neutral({
					title: "Currently sending code to Pip",
					description: `We're beaming your code over to ${pipClass.selectedPip.pipName} as fast as we can!`
				})
			}

			if (pipClass.selectedPip.pipConnectionStatus === "offline") {
				return toast.negative({
					title: `${pipClass.selectedPip.pipName} is not online`,
					description: `Please connect ${pipClass.selectedPip.pipName} to the internet to upload code`
				})
			} else if (pipClass.selectedPip.pipConnectionStatus === "connected to other user") {
				return toast.negative({
					title: `Unable to upload code to ${pipClass.selectedPip.pipName} at this time`,
					description: `${pipClass.selectedPip.pipName} is connected to another user`
				})
			}
			pipClass.setIsSendingCppToPip(true)

			const connectToPipResponse = await blueDotApiClient.sandboxDataService.sendSandboxCodeToPip(
				pipClass.selectedPip.pipUUID, cppCode
			)

			if (!isEqual(connectToPipResponse.status, 200) || isNonSuccessResponse(connectToPipResponse.data)) {
				throw new Error("Connect to Pip failed")
			}
			return fireConfetti(
				rect,
				({ particleCount: 300, startVelocity: 30 })
			)
		} catch (error) {
			console.error(error)
			return toast.negative({
				title: "Unable to upload code to Pip at this time",
				description: "Please reload the page and try again"
			})
		} finally {
			pipClass.setIsSendingCppToPip(false)
		}
	}, [blueDotApiClient.sandboxDataService, pipClass, serialManager, toast])
}
