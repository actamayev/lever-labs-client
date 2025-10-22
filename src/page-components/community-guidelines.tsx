/* eslint-disable max-len */
"use client"

import Link from "next/link"
import { Separator } from "../components/ui/separator"
import ProfileLayout from "../components/profile/profile-layout"
import SupportSectionContainer from "../components/support/support-section-container"
import { ComplianceParagraph, ComplianceSectionHeader } from "../components/compliance"

export default function CommunityGuidelines(): React.ReactNode {
	return (
		<ProfileLayout>
			<SupportSectionContainer title="Community Guidelines">
				<div>
					<ComplianceSectionHeader>Lever Labs is a community of robotics learners</ComplianceSectionHeader>
					<ComplianceParagraph>
						We believe that everyone should have access to a world-class robotics education. Our guidelines are meant to build a mutual understanding of what being a part of this community is all about. We will take action if any of these guidelines are not upheld, so please read carefully.
					</ComplianceParagraph>
					<ComplianceSectionHeader>Always be Respectful</ComplianceSectionHeader>
					<ComplianceParagraph>
						We come together at varying coding and robotics skill levels with the same goal in mind - to learn. Curiosity, questioning, and creative problem-solving are something we celebrate. Be respectful of others and where they’re coming from, whether they’re sharing their first program or an advanced coding project.
					</ComplianceParagraph>
					<ComplianceParagraph>
						When you share projects, give feedback, or interact with others’ work, remember that behind every piece of code is a learner who puts time and effort into their creation. Treat others’ projects and ideas with the same respect you’d want for your own work.
					</ComplianceParagraph>

					<ComplianceSectionHeader>Help and Support Across All Skill Levels</ComplianceSectionHeader>
					<ComplianceParagraph>
						We are all in this together. Learning robotics is challenging and takes a lot of courage and dedication. If someone’s code has bugs, uses a less efficient approach, or if they ask a question you think has an obvious answer, kindly and calmly help them out. Remember, there are many ways to solve robotics challenges, and what seems simple to you might be a breakthrough moment for someone else.
					</ComplianceParagraph>
					<ComplianceParagraph>
						Heckling someone’s coding approach or being dismissive doesn’t help anyone learn. Instead of criticizing, try sharing your own solution or offering constructive suggestions. Can’t say it nicely? Don’t weigh in. The best part of our community is when experienced coders help newcomers discover the joy of bringing robots to life through programming.
					</ComplianceParagraph>

					<ComplianceSectionHeader>Share Knowledge and Learn from Others</ComplianceSectionHeader>
					<ComplianceParagraph>
						Robotics challenges can be solved in countless creative ways, and we think that’s one of the wonders of coding and engineering. When you see a project that takes a different approach than yours, embrace the opportunity to learn. Fork interesting projects to understand how they work, and don’t hesitate to share your own unique solutions. Approach these coding conversations with an open mind - you might discover a technique that transforms how you think about robotics programming.
					</ComplianceParagraph>
					<ComplianceParagraph>
						Whether you’re sharing a simple LED light pattern or a complex autonomous navigation system, your contribution adds to our collective learning. Every shared project is a chance for someone else to learn something new about coding, robotics, or creative problem-solving.
					</ComplianceParagraph>

					<ComplianceSectionHeader>Think Before You Share</ComplianceSectionHeader>
					<ComplianceParagraph>
						We care about your safety and the safety of our robotics community. Coding robots and sharing projects is inherently collaborative, but please be mindful of what you include in your project descriptions and code comments. Don’t share personal information that could be misused, such as your full name, phone number, age, address, school name, or other details that could put your privacy at risk.
					</ComplianceParagraph>
					<ComplianceParagraph>
						When writing project descriptions, focus on explaining how your code works, what challenges you solved, and what you learned. Avoid including personal details about your location, schedule, or family. If you’re sharing a project that controls robot movements, consider whether your code could be modified in ways that might damage robots or cause safety concerns.
					</ComplianceParagraph>
					<ComplianceParagraph>
						Remember that your shared projects may be copied and modified by other users. Think about whether your code includes any comments or descriptions that you wouldn’t want others to see or use. Simply put: share your coding knowledge generously, but don’t over-share personal information. Sharing and encouraging others to share personal data might get your project, and possibly your account, removed.
					</ComplianceParagraph>

					<Separator className="bg-swan my-10 h-1 rounded-full"/>

					<ComplianceSectionHeader>Please Don’t Use Lever Labs to...</ComplianceSectionHeader>
					<ComplianceSectionHeader>Attack a Person or Group of People with Words and Actions</ComplianceSectionHeader>
					<ComplianceParagraph>
						Lever Labs is a safe place for learners of all backgrounds. Harassment and hurtful content will not be tolerated. Using project names, descriptions, or code comments that promote hate - as well as harassing, targeting, or making inappropriate remarks towards someone - are considered abuse. The same goes for inappropriate usernames and profile information. As stated in the {""}
						<Link
							href="/terms"
							className="underline"
						>
							terms
						</Link>
						, Lever Labs reserves the right to replace images or remove these accounts at its sole discretion. Rule of thumb: if you are making someone feel attacked or hurt, then you shouldn’t be doing it. We take these reports seriously and may delete your account without previous notice if such activity is verified by our team.
					</ComplianceParagraph>

					<ComplianceSectionHeader>Create Harmful or Dangerous Robot Code</ComplianceSectionHeader>
					<ComplianceParagraph>
						While we encourage creative and ambitious robotics projects, code that is intentionally designed to damage robots, cause safety hazards, or create dangerous robot behaviors is not allowed. This includes programs that could cause robots to move in ways that might harm people or property, code designed to overload robot systems, or instructions that could damage robot hardware. We want everyone to explore robotics safely and responsibly.
					</ComplianceParagraph>

					<ComplianceSectionHeader>Script or Cheat Maliciously</ComplianceSectionHeader>
					<ComplianceParagraph>
						Lever Labs believes in honest learning. If you are creating automated scripts to manipulate the platform, sharing information and instructions about using Lever Labs in ways that may impact the system, community, learning, data, or experience in a negative or significant manner, your account and projects may be removed. We’re here to help you learn robotics through hands-on coding, not to game the system.
					</ComplianceParagraph>

					<ComplianceSectionHeader>Share Inappropriate Content</ComplianceSectionHeader>
					<ComplianceParagraph>
						Hateful, obscene, threatening, and off-topic content doesn’t contribute to learning robotics. Keep project descriptions focused on coding, engineering, and robotics concepts. Profanity, inappropriate jokes, and content unrelated to robotics learning don’t belong in our educational community.
					</ComplianceParagraph>

					<ComplianceSectionHeader>To Summarize</ComplianceSectionHeader>
					<ComplianceParagraph>
						We do not tolerate content that is:
					</ComplianceParagraph>
					<ul className="list-disc pl-6 text-wolf text-sm md:text-base font-light leading-relaxed mb-4">
						<li>Illegal</li>
						<li>Inappropriate for an educational environment</li>
						<li>Excessively profane, violent, or threatening</li>
						<li>Spam</li>
						<li>Threatening, harassing, or bullying</li>
						<li>Associated with racism or intolerance</li>
						<li>Impersonating someone in a misleading or deceptive manner</li>
						<li>Personal confidential information</li>
						<li>Designed to harm robots or create dangerous robot behaviors</li>
						<li>Intended to disrupt the platform or community learning experience</li>
					</ul>
					<ComplianceParagraph>
						Please don’t waste your time looking for loopholes; we will remove any content that violates the spirit of these guidelines and you will risk losing partial or full access to Lever Labs without warning. By following these guidelines, we will all contribute to an inspiring and helpful robotics learning community.
					</ComplianceParagraph>
				</div>
			</SupportSectionContainer>
		</ProfileLayout>
	)
}
