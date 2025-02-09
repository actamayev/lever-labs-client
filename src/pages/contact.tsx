import XLink from "../components/social-links/x-link"
import PageHelmet from "../components/helmet/page-helmet"
import LinkedinLink from "../components/social-links/linkedin-link"
import ContactItemInCard from "../components/contact/contact-item-in-card"

export default function Contact() {
	return (
		<div>
			<PageHelmet pageTitle="/contact" />
			<div className="text-zinc-950 dark:text-zinc-200 py-12 px-48">
				<div className="text-3xl text-zinc-950 dark:text-zinc-200 mb-2">
					Contact Us
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div className="mt-10">
						We love hearing your feedback and helping with whatever we can.
						Whether you have a question, need assistance, or just want to share your thoughts, we're here for you.
						For any inquiries, please reach out to us:
					</div>
					<div className="flex flex-col items-center">
						<div
							className="border border-zinc-200 dark:border-zinc-700 rounded-lg py-1
							px-0.5 mx-auto bg-white dark:bg-zinc-800 w-80 mt-10"
						>
							<ContactItemInCard name="Levi" email="bluedotrobots@gmail.com" />
							{/* <ContactItemInCard name="Ariel" email="ariel@bluedotrobots.com" /> */}
						</div>
						<div className="flex justify-center mt-4 space-x-4">
							<XLink />
							<LinkedinLink />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
