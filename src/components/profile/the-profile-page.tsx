"use client"

import EmailSection from "./email-section"
import ProfileImage from "./profile-image/profile-image"

export default function TheProfilePage() {
	return (
		<div className="container mx-auto py-8 px-40">
			<h1 className="text-3xl font-bold mb-8 text-eel">Profile</h1>
			<div className="flex flex-row space-x-10">
				<ProfileImage />
				<div>
					<EmailSection />
				</div>
			</div>
		</div>
	)
}
