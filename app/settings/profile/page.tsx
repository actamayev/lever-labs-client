import AuthenticatedLayout from "../../../src/components/layouts/authenticated-layout"
import TheProfilePage from "../../../src/components/profile/the-profile-page"
import { createMetadata } from "../../../src/utils/seo/create-metadata"

export const metadata = createMetadata({
	title: "Profile",
	// eslint-disable-next-line max-len
	description: "Manage your Lever Labs account settings including profile picture, personal information, password security, and display preferences.",
	path: "/settings/profile",
	keywords: ["account settings", "profile management", "user preferences"]
})

export default function TheProfile(): React.ReactNode {
	return (
		<AuthenticatedLayout>
			<TheProfilePage />
		</AuthenticatedLayout>
	)
}
