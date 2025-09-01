/* eslint-disable max-len */
"use client"

import Link from "next/link"
import { Separator } from "../components/shadcn/ui/separator"
import { ComplianceParagraph, ComplianceSectionHeader } from "../components/compliance"
import ProfileLayout from "../components/profile/profile-layout"
import SupportSectionContainer from "../components/support/support-section-container"

// eslint-disable-next-line max-lines-per-function
export default function PrivacyPage(): React.ReactNode {
	return (
		<ProfileLayout>
			<SupportSectionContainer title="Privacy Policy">
				<div className="relative pt-16">
					<ComplianceParagraph>Please note that the Privacy Policy was last revised on June 9, 2025</ComplianceParagraph>
				</div>

				<div>
					<ComplianceSectionHeader>1. General</ComplianceSectionHeader>
					<ComplianceParagraph>
						At Blue Dot Robots, we care about your personal information, so we have prepared this Privacy Policy to explain how we collect, use, and share it. This Privacy Policy applies to Blue Dot Robots websites, Pip educational robots, and related services ("Service"). By using the Service, purchasing Pip robots, or creating an account, you agree with Blue Dot Robots' collection, use, and sharing of your personal information in accordance with the terms of this Privacy Policy.
					</ComplianceParagraph>
					<ComplianceParagraph>
						Please note that Blue Dot Robots is constantly testing and improving our product features and platform capabilities. Any features discussed in this Privacy Policy may not be available to all users or in all jurisdictions. Use of the Service is also governed by our Terms and Conditions of Service, and certain Blue Dot Robots services may be subject to additional or different terms.
					</ComplianceParagraph>

					<ComplianceSectionHeader>2. Information We Collect</ComplianceSectionHeader>
					<ComplianceParagraph>
						When you use the Service, Blue Dot Robots may collect the following personal information about you.
					</ComplianceParagraph>

					<ComplianceSectionHeader>a. Account Registration</ComplianceSectionHeader>
					<ComplianceParagraph>
						To register for a Blue Dot Robots account, you may provide us with your age and email address. If you are under the age of 13, we require you to provide your parent's or legal guardian's email address instead of your own. When schools create accounts for their students, the school provides the necessary information and acts as our agent for obtaining parental consent for users under 13, as outlined in our {""}
						<Link
							href="/terms"
							className="underline"
						>
							Terms and Conditions
						</Link>
						.
					</ComplianceParagraph>
					<ComplianceParagraph>
						You may also register for a Blue Dot Robots account using certain social logins, such as Google. If you register for Blue Dot Robots using a social login, Blue Dot Robots may receive information about you from your social login provider, including your email address and contacts.
					</ComplianceParagraph>
					<ComplianceParagraph>
						You can manage your Blue Dot Robots account settings, social logins, and information from your account dashboard. Schools may create and manage accounts on behalf of their students and teachers through our institutional account system, with appropriate administrative controls to ensure educational privacy and safety.
					</ComplianceParagraph>

					<ComplianceSectionHeader>b. Profile Information & User-Generated Content</ComplianceSectionHeader>
					<ComplianceParagraph>
						After you register for your Blue Dot Robots account, a profile will be created for you ("Profile"). Your Profile will be populated by information you submit, such as your username ("User-Generated Content"). Your age and email address are not included in your public Profile and are not considered User-Generated Content under this Privacy Policy. Other Blue Dot Robots users may be able to search for your Profile using your username.
					</ComplianceParagraph>
					<ComplianceParagraph>
						Your Profile will also include information about your robotics learning progress, such as completed lessons, coding achievements, and publicly shared projects. By default, your Profile shows a gallery of your public robotics projects, but you can control the visibility of your projects through privacy settings. You can set individual projects to be fully private (visible only to you), visible to your teachers (if you're in a school program), shared with specific users, or fully public to the Blue Dot Robots community.
					</ComplianceParagraph>

					<ComplianceSectionHeader>c. Robotics Projects & Code</ComplianceSectionHeader>
					<ComplianceParagraph>
						When you create coding projects and programs for Pip robots through our platform, we collect and store your code, project descriptions, comments, and any related content you create ("Robotics Projects"). These projects represent your learning progress and creative work in robotics programming, and may include solutions to coding challenges, custom robot behaviors, and innovative applications of robotics concepts.
					</ComplianceParagraph>
					<ComplianceParagraph>
						Blue Dot Robots may analyze your Robotics Projects to understand learning patterns, improve our educational content, and develop better robotics curricula. When you choose to share projects publicly or with specific users, other community members may view, learn from, and build upon your code as part of the collaborative learning experience. You retain ownership of your original project content while granting us the necessary rights to operate the platform and facilitate educational sharing as outlined in our {""}
						<Link
							href="/terms"
							className="underline"
						>
							Terms and Conditions
						</Link>.
					</ComplianceParagraph>

					<ComplianceSectionHeader>d. Robot Sensor Data</ComplianceSectionHeader>
					<ComplianceParagraph>
						When you use Pip robots with our platform, the robots collect sensor data as part of their normal operation and educational activities. This includes readings from various sensors such as distance, color, motion, and other sensors that enable the robot to interact with its environment and respond to your programming commands.
					</ComplianceParagraph>
					<ComplianceParagraph>
						This sensor data is transmitted from the Pip robot through our platform to provide real-time feedback about your robot's performance and the success of your coding projects. We use this sensor data to help you understand how your programs affect robot behavior, troubleshoot coding issues, and improve the overall educational experience. The sensor data may also be used in aggregate form to improve our robotics platform, develop new educational features, and research robotics education effectiveness.
					</ComplianceParagraph>

					<ComplianceSectionHeader>e. Platform Usage Data & IP Addresses</ComplianceSectionHeader>
					<ComplianceParagraph>
						When you use the Service, we collect data about your engagement with our robotics education platform, including your progress through lessons, time spent on coding challenges, and learning achievements. This usage data helps us understand how students learn robotics concepts and improve the educational experience.
					</ComplianceParagraph>
					<ComplianceParagraph>
						Our web hosting providers and analytics services automatically collect certain technical information as part of providing their services, including IP addresses, browser information, and device data. While this information is collected, Blue Dot Robots does not actively use or analyze this technical data for our own purposes beyond what is necessary for platform security and functionality. These third-party services process this information according to their own privacy policies.
					</ComplianceParagraph>

					<ComplianceSectionHeader>f. Google Analytics</ComplianceSectionHeader>
					<ComplianceParagraph>
						We use Google Analytics, which is a web analytics tool that helps us understand how users engage with our robotics education platform. Like many services, Google Analytics uses first-party cookies to track user interactions, as in our case, where they are used to collect information about how users navigate our lessons, interact with coding challenges, and engage with robotics content. This information is used to compile reports and to help us improve our educational platform. These reports disclose website trends without identifying individual users. You can opt out of Google Analytics by installing Google's browser add-on available at {""}
						<a
							href="https://tools.google.com/dlpage/gaoptout"
							className="underline"
						>
							tools.google.com/dlpage/gaoptout
						</a>
						.
					</ComplianceParagraph>

					<ComplianceSectionHeader>g. Cookies</ComplianceSectionHeader>
					<ComplianceParagraph>
						When you access the Blue Dot Robots website and platform, we may store certain data locally in your browser. We use browser local storage to maintain your login session and save your learning progress across sessions. Additionally, third-party services like Google Analytics may set cookies on your device as described in their privacy policies.
					</ComplianceParagraph>
					<ComplianceParagraph>
						If you do not want data to be stored locally by our platform, you can clear your browser's local storage, though this may require you to log in again and may affect your ability to maintain progress across sessions. Local storage is necessary to provide you with certain features available on the platform, such as staying logged in and maintaining your robotics learning progress.
					</ComplianceParagraph>

					<Separator className="bg-swan my-10 h-1 rounded-full"/>

					<ComplianceSectionHeader>3. How We Process Your Information</ComplianceSectionHeader>
					<ComplianceParagraph>
						Blue Dot Robots may process your personal information according to the following legal bases: to provide products or services you request, to promote Blue Dot Robots' legitimate interests, to comply with legal obligations, and with your consent. In particular, Blue Dot Robots may process and share your personal information in the following ways:
					</ComplianceParagraph>

					<ComplianceSectionHeader>a. Providing and Improving the Service</ComplianceSectionHeader>
					<ComplianceParagraph>
						Blue Dot Robots will process your personal information to provide and improve our robotics education platform and services. For example, we will use the information you provide to maintain your Profile and learning progress, display your Profile to other users (according to your privacy settings), personalize robotics lessons and coding challenges, connect and sync your Pip robots with the platform, detect and fix technical issues, perform educational research, and provide customer support to you.
					</ComplianceParagraph>
					<ComplianceParagraph>
						Blue Dot Robots uses third-party services to operate our platform, including cloud hosting for data storage and analytics services to understand platform usage. These service providers process personal information solely to provide services to us and are contractually required to maintain appropriate data security and privacy protections.
					</ComplianceParagraph>
					<ComplianceParagraph>
						We may use your robotics projects, coding patterns, and platform usage data to improve our educational algorithms, develop new robotics curricula, and research effective methods for teaching programming and engineering concepts. This may include machine learning and artificial intelligence applications to personalize learning experiences and identify optimal teaching approaches. Such analysis may be conducted on individual or aggregated data to enhance the educational value of our platform for all users.
					</ComplianceParagraph>

					<ComplianceSectionHeader>b. School Dashboard Services</ComplianceSectionHeader>
					<ComplianceParagraph>
						For schools and educational institutions using Blue Dot Robots, we provide teacher dashboard services that allow educators to monitor student progress, assign robotics projects, track learning achievements, and manage classroom robotics activities. When schools use these dashboard services, teachers and administrators within the institution may access student progress data, completed assignments, coding project portfolios, and learning analytics to support educational instruction and assessment.
					</ComplianceParagraph>
					<ComplianceParagraph>
						Blue Dot Robots will share student educational data with designated teachers and school administrators within the same institution to facilitate classroom instruction, academic assessment, and educational program administration. This data sharing is limited to educators within the student's school and is designed to support the educational mission of the institution. Schools are responsible for ensuring compliance with applicable educational privacy laws, including the Family Educational Rights and Privacy Act (FERPA), and for maintaining appropriate data security practices within their institution.
					</ComplianceParagraph>

					<ComplianceSectionHeader>c. Communicating with You</ComplianceSectionHeader>
					<ComplianceParagraph>
						Blue Dot Robots will use the email address you provide (or the parent's email address for users under 13) to send you the following types of messages: essential messages to support the operation of the Service and your robotics learning experience; educational messages to support our teaching methodology and reinforce your learning, such as coding tips, reminders to practice with your Pip robot, and progress reports; notifications about your robotics achievements and learning milestones; and announcements regarding changes to the Service, new robotics features, or platform updates.
					</ComplianceParagraph>
					<ComplianceParagraph>
						In the future, we may also send announcements of new Blue Dot Robots products, services, educational opportunities, or robotics research programs. You may opt-out of receiving non-essential messages through your account settings. For users under 13, we will send these communications to the parent's email address, and parents may manage communication preferences on behalf of their children.
					</ComplianceParagraph>

					<ComplianceSectionHeader>d. Legal Compliance and Safety</ComplianceSectionHeader>
					<ComplianceParagraph>
						Blue Dot Robots may process and share personal information if necessary to comply with legal requests, such as subpoenas or court orders, or to respond to requests from law enforcement agencies. Blue Dot Robots may share personal information when we believe it is necessary to comply with applicable laws, to protect our interests or property, to prevent fraud or other illegal activity, to assist law enforcement investigations, or to prevent imminent harm to users or others. This may include sharing information with other companies, lawyers, agents, or government agencies as required by law.
					</ComplianceParagraph>
					<ComplianceParagraph>
						Blue Dot Robots may also process user information to enforce our Community Guidelines and Terms and Conditions, including investigating reports of inappropriate content, unsafe robot usage, or violations of our educational platform policies. We are committed to maintaining a safe learning environment for all users, particularly given our focus on serving educational institutions and young learners, and may take appropriate action including account suspension or termination when necessary to protect the community.
					</ComplianceParagraph>

					<ComplianceSectionHeader>e. Anonymous Information</ComplianceSectionHeader>
					<ComplianceParagraph>
						Blue Dot Robots may process aggregated, de-identified, or otherwise anonymous information for any purpose, including robotics education research, platform improvement, curriculum development, and understanding trends in STEM learning. Such information is not considered personal information and may be used to advance the field of robotics education, publish research findings, develop industry best practices, and improve educational outcomes for students learning programming and engineering concepts.
					</ComplianceParagraph>

					<Separator className="bg-swan my-10 h-1 rounded-full"/>

					<ComplianceSectionHeader>4. Your Data Subject Rights</ComplianceSectionHeader>
					<ComplianceParagraph>
						You have the following rights in relation to the personal information we hold about you, in addition to any other rights required by applicable law:
					</ComplianceParagraph>
					<ul className="list-disc pl-6 text-wolf text-sm md:text-base font-light leading-relaxed mb-4">
						<li>Know what personal information we have collected about you</li>
						<li>Request that we delete any personal information we have collected from you</li>
						<li>Request that we correct any inaccurate personal information about you</li>
						<li>Object to our processing of your personal information</li>
						<li>Not be discriminated against for exercising your data subject rights</li>
						<li>Delete your Blue Dot Robots account by following the instructions in the Service</li>
					</ul>
					<ComplianceParagraph>
						For users under the age of 13, parents and legal guardians have the right to access, review, modify, or delete their child's account and personal information at any time. Parents may contact us at {""}
						<Link
							href="mailto:bluedotrobots@gmail.com?subject=Parental%20Request"
							className="underline"
						>
							bluedotrobots@gmail.com
						</Link> {""}
						to exercise these rights on behalf of their children. Parents can also request information about what data we have collected from their child, and how we use that data. We will respond to parental requests within a reasonable timeframe and may require verification of parental identity before processing such requests.
					</ComplianceParagraph>
					<ComplianceParagraph>
						You may update or correct your information through your account settings page. To request access to your personal information, request deletion of your account, or make other privacy-related requests, please send an email to {""}
						<Link
							href="mailto:bluedotrobots@gmail.com?subject=Privacy%20Inquiry"
							className="underline"
						>
							bluedotrobots@gmail.com
						</Link>
						. You may also delete your Blue Dot Robots account at any time through your account settings, though this action cannot be undone and will result in loss of access to your projects and learning progress.
					</ComplianceParagraph>
					<ComplianceParagraph>
						Please note that these rights are not absolute and Blue Dot Robots may refuse requests to exercise data subject rights if there is a legitimate reason, such as if we cannot authenticate your identity, if the request could violate the rights of a third party or applicable law, or if the request could interfere with our educational services or prevent us from delivering services you requested. We will explain our reasoning if we are unable to fulfill a particular request.
					</ComplianceParagraph>

					<ComplianceSectionHeader>5. Data Retention</ComplianceSectionHeader>
					<ComplianceParagraph>
						Blue Dot Robots will generally retain your personal information, robotics projects, and learning progress data indefinitely to provide continuity in your educational experience and to support our mission of advancing robotics education through research and platform improvement. This indefinite retention allows students to return to their work after breaks from the platform, enables longitudinal educational research, and helps us understand long-term learning patterns in robotics and programming education. Your data may be retained even after account deletion in anonymized or aggregated form for research and platform improvement purposes.
					</ComplianceParagraph>
					<ComplianceParagraph>
						When you delete your Blue Dot Robots account, your personal identifying information will be removed from public view and your profile will be deactivated. However, your robotics projects and educational content may be retained on our servers in anonymized form, with all personal identifiers removed, to preserve the educational value of shared projects and to support ongoing research into effective robotics education methods. Projects that have been shared with other users or made public may remain visible on the platform but will no longer be associated with your personal information. Blue Dot Robots may retain certain information longer if necessary to provide our educational services, defend our legitimate interests, comply with legal requirements, or resolve disputes.
					</ComplianceParagraph>

					<ComplianceSectionHeader>6. Child Users</ComplianceSectionHeader>
					<ComplianceParagraph>
						We know that children deserve extra privacy protection. That's why we treat Child Users (meaning users under the age of 13 in the United States) differently to ensure their parents are in control and we only collect the bare minimum information we need to make our robotics education platform work effectively. Blue Dot Robots is designed as an educational tool suitable for learners of all ages, and we take special care to provide age-appropriate content and safety measures for our youngest users.
					</ComplianceParagraph>
					<ComplianceParagraph>
						Child Users are permitted to create a Blue Dot Robots account, but we require them to provide their parent's email address instead of their own, and to register using a username that is not tied to their real name. When schools create accounts for Child Users, the school acts as Blue Dot Robots' agent for obtaining parental consent and represents that it has the authority to provide such consent as part of its educational mission and enrollment agreements with families.
					</ComplianceParagraph>
					<ComplianceParagraph>
						After a Child User registers (either individually or through a school), we will send an email to the parent's email address about Blue Dot Robots' privacy practices regarding Child Users, including what personal information we collect and how we use, share, and protect that personal information. The email also explains how parents can request to access, change, or delete information about their child, and how to contact us with any privacy-related questions or concerns.
					</ComplianceParagraph>
					<ComplianceParagraph>
						All Child Users receive the following special treatment when using Blue Dot Robots ("Age Restrictions"):
					</ComplianceParagraph>
					<ul className="list-disc pl-6 text-wolf text-sm md:text-base font-light leading-relaxed mb-4">
						<li>Robotics lessons and coding challenges are reviewed to ensure age-appropriate content</li>
						<li>Promotional emails are disabled for Child Users, with all communications sent to the parent's email address instead</li>
						<li>Child Users' robotics projects are subject to additional privacy protections and are not used for marketing purposes</li>
					</ul>
					<ComplianceParagraph>
						Child Users may not provide Blue Dot Robots with their real name, contact information, or other personal information beyond what is necessary for the educational service. Child Users cannot link their Blue Dot Robots account to their contact information. Child Users' Profiles contain no personal information that could be used to publicly identify or contact the child, but only the Child User's username and information about their robotics learning progress.
					</ComplianceParagraph>
					<ComplianceParagraph>
						Child Users can share robotics projects with their teachers and classmates in supervised educational environments. When Child Users participate in project sharing, their shared content is subject to additional moderation to ensure it contains only appropriate educational material and no personal information.
					</ComplianceParagraph>
					<ComplianceParagraph>
						Child Users may participate in supervised classroom robotics activities when their school has a Blue Dot Robots institutional account. In these cases, the Child User's profile and projects will be visible to their teachers and school administrators as part of the educational program, but additional privacy protections ensure that personal information is not shared beyond the immediate educational context.
					</ComplianceParagraph>
					<ComplianceParagraph>
						Parents may modify or remove their child's Age Restrictions by contacting us at {""}
						<Link
							href="mailto:bluedotrobots@gmail.com?subject=Remove%20Age%20Restrictions"
							className="underline"
						>
							bluedotrobots@gmail.com
						</Link> {""}
						and providing appropriate verification of their parental status. Additionally, parents can report any concerns about their child's use of the platform or any inappropriate content to the same email address. We take all reports seriously and will investigate and respond promptly to ensure the safety of our young learners.
					</ComplianceParagraph>
					<ComplianceParagraph>
						With regards to the Children's Online Privacy Protection Act (COPPA), Blue Dot Robots collects personal information from children under the age of 13 for the sole purpose of providing educational robotics services and maintaining the internal operations of our platform. If we discover that we have unknowingly collected additional personal information from these children beyond what is necessary for educational purposes, we will delete it immediately. If you believe this to be the case, please contact us at {""}
						<Link
							href="mailto:bluedotrobots@gmail.com?subject=COPPA%20Inquiry"
							className="underline"
						>
							bluedotrobots@gmail.com
						</Link>
						.
					</ComplianceParagraph>

					<ComplianceSectionHeader>7. Blue Dot Robots for Schools</ComplianceSectionHeader>
					<ComplianceParagraph>
						Blue Dot Robots for Schools allows educational institutions to create and manage accounts for their students and teachers, providing a comprehensive robotics education platform designed specifically for classroom use. Schools may create institutional accounts that enable teachers to assign robotics projects, track student progress through coding challenges, and integrate Pip robots into their STEM curricula. When schools create accounts for their students, they act as Blue Dot Robots' agent for obtaining necessary parental consents and ensuring compliance with educational privacy requirements.
					</ComplianceParagraph>
					<ComplianceParagraph>
						Through our teacher dashboard services, educators can access student learning progress, view completed robotics projects, assign specific coding challenges, and monitor classroom engagement with robotics activities. Teachers can see which lessons students have completed, how much time they've spent working with their Pip robots, and review student-created code and projects for educational assessment purposes. This educational data sharing is designed to support classroom instruction and help teachers provide personalized guidance to students learning programming and robotics concepts.
					</ComplianceParagraph>
					<ComplianceParagraph>
						Schools are responsible for ensuring compliance with applicable educational privacy laws, including the Family Educational Rights and Privacy Act (FERPA), and for maintaining appropriate data security practices within their institution. When schools use Blue Dot Robots, they acknowledge that student educational data will be shared with designated teachers and administrators within their institution for legitimate educational purposes. Schools must ensure that only authorized educational personnel have access to student accounts and that such access is used solely for educational instruction, assessment, and program administration.
					</ComplianceParagraph>
					<ComplianceParagraph>
						Blue Dot Robots provides schools with the necessary documentation and privacy controls to meet their educational privacy obligations. Institutional administrators can manage user permissions, control data access within their organization, and ensure that student information is only shared with appropriate educational personnel. Schools may remove students from their institutional account at any time, and students retain the ability to continue using Blue Dot Robots independently if they choose to do so after leaving the institutional program.
					</ComplianceParagraph>
					<ComplianceParagraph>
						For students participating in school-based robotics programs, their account data and learning progress may be accessible to their current teachers and school administrators as part of the educational service. However, when students graduate or leave the institution, schools lose access to the student's account, and the student retains full control over their robotics projects and learning progress. Students may choose to continue their robotics education independently or transfer to another institutional program while maintaining continuity in their learning experience.
					</ComplianceParagraph>

					<ComplianceSectionHeader>8. Consumer Account Features</ComplianceSectionHeader>
					<ComplianceParagraph>
						Individual consumers who create Blue Dot Robots accounts have full control over their robotics learning experience and privacy settings. Consumer users create their own accounts and are responsible for maintaining account security, providing accurate information, and ensuring appropriate use of the platform and Pip robots. Parents or legal guardians creating accounts for their minor children accept full responsibility for their child's use of the Service and compliance with these privacy terms and our Community Guidelines.
					</ComplianceParagraph>
					<ComplianceParagraph>
						When a consumer user under the age of 13 creates an account, they must provide a parent's or legal guardian's email address during registration. Blue Dot Robots will automatically send a notification email to the parent explaining our data collection and privacy practices regarding children under 13, including how parents can access, modify, or delete their child's account and data at any time by contacting us at {""}
						<Link
							href="mailto:bluedotrobots@gmail.com?subject=Consumer%20Account%20Inquiry"
							className="underline"
						>
							bluedotrobots@gmail.com
						</Link>
						. Parents have the right to review their child's robotics projects, learning progress, and platform usage, and may modify privacy settings or request account deletion at any time.
					</ComplianceParagraph>
					<ComplianceParagraph>
						Consumer accounts are not automatically associated with any institutional accounts or classroom settings unless explicitly connected by the user. Individual users have full control over their project sharing settings and may choose to make their robotics projects completely private, selectively shared with specific users, or fully public to the Blue Dot Robots community. Parents may modify privacy settings and project sharing permissions on behalf of their minor children to ensure appropriate levels of privacy and safety.
					</ComplianceParagraph>

					<ComplianceSectionHeader>9. Do Not Track</ComplianceSectionHeader>
					<ComplianceParagraph>
						The Blue Dot Robots platform is not designed to respond to "do not track" signals sent by some browsers.
					</ComplianceParagraph>

					<ComplianceSectionHeader>10. Privacy Policy Updates</ComplianceSectionHeader>
					<ComplianceParagraph>
						Blue Dot Robots may amend, update, or change this Privacy Policy at any time in our sole discretion. Any changes will be effective immediately upon posting the revised version on our website. We will indicate at the bottom of the Privacy Policy the date these terms were last revised. Your continued use of the Service after such posting constitutes your acceptance of the revised privacy terms. If you do not agree to abide by the updated Privacy Policy, you are not authorized to continue using, accessing, or participating in the Service.
					</ComplianceParagraph>

					<ComplianceSectionHeader>11. Data Transfer</ComplianceSectionHeader>
					<ComplianceParagraph>
						Blue Dot Robots is based in the United States and processes data in the United States, which may not provide equivalent levels of data protection as your home jurisdiction. Blue Dot Robots may transfer the data of users outside the United States to the United States for processing and storage. While we primarily serve customers within the United States and do not actively market our robotics education services internationally, users from other countries may access our platform at their own discretion and risk.
					</ComplianceParagraph>
					<ComplianceParagraph>
						International users who choose to use Blue Dot Robots acknowledge that their personal information, robotics projects, and platform usage data will be transferred to and processed in the United States according to U.S. privacy laws and regulations. International users are responsible for ensuring compliance with their local laws regarding online services, educational technology, and cross-border data transfers. We make no representation that the Service is appropriate or available for use outside the United States, and accessing the Service from territories where its contents may be illegal is prohibited.
					</ComplianceParagraph>

					<ComplianceSectionHeader>12. Contact Us</ComplianceSectionHeader>
					<ComplianceParagraph>
						Blue Dot Robots, Inc. is the data controller of your personal information for the purposes of applicable privacy regulations. For all data privacy inquiries, questions about this Privacy Policy, requests to exercise your data subject rights, or concerns about your child's privacy and safety on our platform, please contact our privacy team at {""}
						<Link
							href="mailto:bluedotrobots@gmail.com?subject=Privacy%20Inquiry"
							className="underline"
						>
							bluedotrobots@gmail.com
						</Link>.
					</ComplianceParagraph>
					<ComplianceParagraph>
						For all technical support inquiries, general questions about our robotics education platform, Pip robot troubleshooting, or other non-privacy-related concerns, please also contact us at {""}
						<Link
							href="mailto:bluedotrobots@gmail.com?subject=Troubleshooting%20Inquiry"
							className="underline"
						>
							bluedotrobots@gmail.com
						</Link>
						. We are committed to responding promptly to all privacy-related requests and will work with you to address any concerns about how we collect, use, or protect your personal information in connection with our robotics education services.
					</ComplianceParagraph>
					<Separator className="bg-swan my-10 h-1 rounded-full"/>

					<ComplianceParagraph>
						Last revised on June 9, 2025
					</ComplianceParagraph>
				</div>
			</SupportSectionContainer>

		</ProfileLayout>

	)
}
