import AuthenticatedLayout from "../../src/components/authenticated-layout"
import TheProfilePage from "../../src/components/profile/the-profile-page"
import { createMetadata } from "../../src/utils/helmet-data/create-metadata"

export const metadata = createMetadata({
	title: "Profile",
	// eslint-disable-next-line max-len
	description: "Manage your Blue Dot Robots account settings including profile picture, personal information, password security, and display preferences.",
	path: "/profile",
	keywords: ["account settings", "profile management", "user preferences"]
})

export default function TheGarage() {
	return (
		<AuthenticatedLayout>
			<TheProfilePage />
		</AuthenticatedLayout>
	)
}
