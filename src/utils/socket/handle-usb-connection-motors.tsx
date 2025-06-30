import { StandardJsonStatusMessage } from "@bluedotrobots/common-ts"
import toastClass from "../../classes/toast-class"

export default function handleUsbConnectionMotors(data: StandardJsonStatusMessage): void {
	return toastClass.neutral({ title: data.status })
}
