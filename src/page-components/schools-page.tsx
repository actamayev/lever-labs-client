"use client"

/* eslint-disable max-len */
import { useEffect } from "react"
import { BookOpen, Code2 } from "lucide-react"
import ShowIcon from "../components/landing/show-icon"
import { landingBulletTextParagraph } from "../utils/text-styles"
import SupportSection from "../components/support/support-section"
import { SupportBorder } from "../components/support/support-header"
import { CustomWizardHat } from "../components/icons/custom-wizard-hat"
import ContactItemInCard from "../components/contact/contact-item-in-card"

export default function SchoolsPage() {
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])
	return (
		<div>
			<div className="relative">
				<div className="px-8 sm:px-8 md:px-16 lg:px-72 mt-12">
					<div className="font-medium text-3xl text-questionText mb-10">
						Pip for Schools
					</div>
					<SupportBorder />
					<SupportSection sectionTitle="The fun, accessible way to bring robotics into your classroom" extraClasses="mt-10">
						We believe robotics education should be as accessible as it is engaging. That's why we've created Pip and the Lab – a seamless combination that turns complex robotics concepts into hands-on, delightful learning experiences for students of all levels.
					</SupportSection>
					<SupportBorder />

					<SupportSection sectionTitle="Complete robotics curriculum" extraClasses="mt-10">
						From basic LEDs to advanced controls, our comprehensive curriculum grows with your students. The Lab guides learners through concepts at their own pace, making robotics accessible to everyone in your classroom.
					</SupportSection>
					<SupportBorder />

					<SupportSection sectionTitle="Any Pip, any computer, any time" extraClasses="mt-10">
						Students can use any Pip robot from any computer – their progress automatically saves to their account! This means flexible learning environments and no more "I forgot my robot at home" excuses.
					</SupportSection>
					<SupportBorder />

					<SupportSection sectionTitle="Fun, bite-sized lessons" extraClasses="mt-10">
						Just like learning a language, mastering robotics happens best through engaging, interactive experiences. Our curriculum breaks down complex concepts into three simple steps:
						<div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
							<div className="flex items-start">
								<ShowIcon icon={BookOpen} />
								<div className="ml-3 sm:ml-4">
									<p className={landingBulletTextParagraph()}>
									Read about fascinating robotics concepts
									</p>
								</div>
							</div>

							<div className="flex items-start">
								<ShowIcon icon={CustomWizardHat} />
								<div className="ml-3 sm:ml-4">
									<p className={landingBulletTextParagraph()}>
									Watch Pip demonstrate these concepts in action
									</p>
								</div>
							</div>

							<div className="flex items-start">
								<ShowIcon icon={Code2} />
								<div className="ml-3 sm:ml-4">
									<p className={landingBulletTextParagraph()}>
										Code solutions to fun challenges that bring learning to life
									</p>
								</div>
							</div>
						</div>
					</SupportSection>
					<SupportBorder />

					<SupportSection sectionTitle="Teacher-friendly tools" extraClasses="mt-10">
						Easily create classes, assign specific lessons, and track detailed student progress. Our dashboard gives you insights into completed challenges, time spent coding, and concepts mastered – so no one falls behind.
					</SupportSection>
					<SupportBorder />

					<SupportSection sectionTitle="AI-powered assistance" extraClasses="mt-10">
						Our AI grades coding challenges instantly, giving students immediate feedback while saving you precious class time. When students get stuck, the AI offers helpful hints without giving away the answers.
					</SupportSection>
					<SupportBorder />

					<SupportSection sectionTitle="Coming soon to classrooms" extraClasses="mt-10">
						We're working hard to perfect Pip for educational settings. If you're interested in bringing robot-powered learning to your school, please reach out – we'd love to hear from you.
						<div
							className="border-2 border-disabledLilypadBackground rounded-lg py-1
							px-0.5 mx-auto bg-standardBackground w-80 my-5"
						>
							<ContactItemInCard name="Levi" email="bluedotrobots@gmail.com" />
						</div>
					</SupportSection>
				</div>
			</div>
		</div>
	)
}
