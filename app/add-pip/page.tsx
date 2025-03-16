import AddPip from "../../src/test/add-pip"
import { createMetadata } from "../../src/utils/helmet-data/create-metadata"

export const metadata = createMetadata({
	title: "Add Pip",
	description: "Connect your Pip robot to Wi-Fi in under a minute, add it to your account, \
	and start hands-on robotics experimentation right away.",
	path: "/add-pip",
	keywords: ["robot setup", "connect educational robot", "pip robot configuration"]
})

export default function AddPipPage() {
	return <AddPip />
}
