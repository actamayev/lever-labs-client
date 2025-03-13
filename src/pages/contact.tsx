import PageHelmet from "../components/helmet/page-helmet"
import ContactItemInCard from "../components/contact/contact-item-in-card"
import SupportHeader from "../components/support/support-header"
import SupportSectionContainer from "../components/support/support-section-container"

export default function Contact() {
	return (
		<div>
			<PageHelmet pageTitle="/contact" />
			<SupportSectionContainer>
				<SupportHeader />
				<div className="grid grid-cols-2 gap-4">
					<div className="mt-10">
						We love hearing your feedback and helping with whatever we can.
						Whether you have a question, need assistance, or just want to share your thoughts, we're here for you.
						For any inquiries, please reach out to us:
					</div>
					<div className="flex flex-col items-center">
						<div
							className="border-2 border-gray-200 dark:border-gray-700 rounded-lg py-1
							px-0.5 mx-auto bg-standardBackground w-80 mt-10"
						>
							<ContactItemInCard name="Levi" email="bluedotrobots@gmail.com" />
						</div>
					</div>
				</div>
			</SupportSectionContainer>
		</div>
	)
}
