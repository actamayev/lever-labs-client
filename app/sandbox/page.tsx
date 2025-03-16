import Sandbox from "../../src/page-components/sandbox"
import { createMetadata } from "../../src/utils/helmet-data/create-metadata"

export const metadata = createMetadata({
	title: "Sandbox",
	// eslint-disable-next-line max-len
	description: "Freely control Pip with coding block primitives for open-ended exploration and experimentation in a boundless robotics playground.",
	path: "/sandbox",
	keywords: ["open robotics playground", "creative coding", "experimental learning"]
})

export default function SandboxPage() {
	return <Sandbox />
}
