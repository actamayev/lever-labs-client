import AddPipForm from "../../src/components/add-pip-form/add-pip-form"
import AuthenticatedLayout from "../../src/components/authenticated-layout"
import { createMetadata } from "../../src/utils/helmet-data/create-metadata"

export const metadata = createMetadata({
	title: "Add Pip",
	description: "Connect your Pip to Wi-Fi in under a minute, add it to your account, \
	and start hands-on robotics experimentation right away.",
	path: "/add-pip",
	keywords: ["robot setup", "connect educational robot", "pip configuration"]
})

export default function AddPipPage(): React.ReactNode {
	return (
		<AuthenticatedLayout>
			<AddPipForm />
		</AuthenticatedLayout>
	)
}
