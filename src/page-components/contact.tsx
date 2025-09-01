"use client"

import { useEffect } from "react"
import SupportHeader from "../components/support/support-header"
import ProfileLayout from "../components/profile/profile-layout"
import ContactItemInCard from "../components/contact/contact-item-in-card"
import FooterSocialSection from "../components/footer/footer-social-section"
import SupportSectionContainer from "../components/support/support-section-container"

export default function Contact(): React.ReactNode {
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])
	return (
		<ProfileLayout>
			<SupportSectionContainer>
				<SupportHeader />
				<div className="flex items-center justify-center text-questionText text-xl font-medium">
					Contact us
				</div>
				<div className="mt-10 mx-10 text-questionText">
					We love hearing your feedback and helping with whatever we can.
					Whether you have a question, need assistance, or just want to share your thoughts, we're here for you.
					For any inquiries, please reach out to us:
				</div>
				<div className="flex flex-col items-center">
					<div
						className="border-2 border-swan rounded-lg py-1
							px-0.5 mx-auto bg-standardBackground w-80 my-5"
					>
						<ContactItemInCard name="Levi" email="bluedotrobots@gmail.com" />
					</div>
					<div>
						<FooterSocialSection />
					</div>
				</div>
			</SupportSectionContainer>
		</ProfileLayout>
	)
}
