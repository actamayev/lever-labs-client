"use client"

/* eslint-disable max-len */
import { useEffect } from "react"
import ProfileLayout from "../components/profile/profile-layout"
import SupportSection from "../components/support/support-section"
import SupportHeader, { SupportBorder } from "../components/support/support-header"
import SupportSectionContainer from "../components/support/support-section-container"

export default function Mission(): React.ReactNode {
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])
	return (
		<ProfileLayout>
			<SupportSectionContainer>
				<SupportHeader />
				<SupportSection sectionTitle="Provide an accessible world-class robotics education">
					<div className="flex flex-col">
						<div>
							We believe that anyone can learn robotics with Pip.
							Our free, interactive Career Quest makes learning feel like play, and that's by design: Learning is easier when you're having fun.
						</div>
					</div>
				</SupportSection>
				<SupportBorder />
				<SupportSection sectionTitle="How we got here" extraClasses="mt-10">
					<div className="flex flex-col space-y-4">
						<div>
							We're a small team of Mechanical Engineers from top U.S. engineering schools, with backgrounds at companies like SpaceX and fast-paced trading platforms.
						</div>
						<div>
							After purchasing several educational robots and finding the same problems we faced growing up – difficult setup and static curricula – we realized innovation in robotics education had stagnated.
						</div>
						<div>
							We started Blue Dot Robots so that everyone could have a chance. A robotics education that's accessible, engaging, and grows with you – no frustrating assembly, no ceiling on what you can learn.
						</div>
					</div>
				</SupportSection>
				<SupportBorder />
				<SupportSection sectionTitle="The Blue Dot Difference" extraClasses="mt-10">
					<div className="flex flex-col space-y-4">
						<div>
							Millions of people are interested in robotics, but most educational products either require hours of setup or offer limited learning paths.
						</div>
						<div>
							Pip and the Career Quest work together seamlessly to turn abstract concepts into hands-on experiences.
							Write code in our web-based platform and watch your ideas come to life through Pip in real-time.
						</div>
						<div>
							As technology becomes more integrated into our world, we're committed to making robotics education something anyone can access, understand, and love – because when people are empowered to create, the future becomes limitless.
						</div>
					</div>
				</SupportSection>

			</SupportSectionContainer>
		</ProfileLayout>
	)
}
