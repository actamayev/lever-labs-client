/* eslint-disable max-len */
"use client"

import Link from "next/link"
import { Separator } from "../components/shadcn/ui/separator"
import { ComplianceParagraph, ComplianceSectionHeader } from "../components/compliance"
import ProfileLayout from "../components/profile/profile-layout"
import SupportSectionContainer from "../components/support/support-section-container"

// eslint-disable-next-line max-lines-per-function
export default function TermsPage(): React.ReactNode {
	return (
		<ProfileLayout>
			<SupportSectionContainer title="Terms and Conditions of Service">
				<div className="relative pt-16">
					<ComplianceParagraph>
						Please note that these Terms and Conditions of Service were last revised on June 9th, 2025
					</ComplianceParagraph>
				</div>

				<div>
					<ComplianceSectionHeader>1. General</ComplianceSectionHeader>
					<ComplianceParagraph>
						Lever Labs websites ("Websites"), educational robots ("Pip Robots"), and related services (together with the Websites, the "Service") are operated by Lever Labs, Inc. ("Lever Labs," "us," or "we"). Access and use of the Service is subject to the following Terms and Conditions including any future modifications. By accessing or using any part of the Service, purchasing Pip Robots, or creating an account, you represent that you have read, understood, and agree to be bound by these Terms and Conditions.
					</ComplianceParagraph>
					<ComplianceParagraph>
						Lever Labs may amend, update, or change these Terms and Conditions at any time in our sole discretion. Any changes will be effective immediately upon posting the revised version on our website. We will indicate at the bottom of the Terms and Conditions the date these terms were last revised. Your continued use of the Service after such posting constitutes your acceptance of the revised terms. If you do not agree to abide by these Terms and Conditions, you are not authorized to use, access, or participate in the Service.
					</ComplianceParagraph>
					<ComplianceParagraph>
						PLEASE NOTE THAT THESE TERMS AND CONDITIONS CONTAIN A MANDATORY ARBITRATION OF DISPUTES PROVISION THAT REQUIRES THE USE OF ARBITRATION ON AN INDIVIDUAL BASIS TO RESOLVE DISPUTES IN CERTAIN CIRCUMSTANCES, RATHER THAN JURY TRIALS OR CLASS ACTION LAWSUITS. VIEW THESE TERMS IN SECTION 25.
					</ComplianceParagraph>

					<ComplianceSectionHeader>2. Description of Service</ComplianceSectionHeader>
					<ComplianceParagraph>
						The Service allows users to access and use educational robotics services, including learning programming and engineering concepts through hands-on interaction with Pip educational robots. Our platform provides coding challenges, lessons, and interactive experiences that teach students to control Pip robots through various sensors, motors, LEDs, and other hardware capabilities. Lever Labs may, in its sole discretion and at any time, update, change, suspend, make improvements to or discontinue any aspect of the Service, temporarily or permanently.
					</ComplianceParagraph>
					<ComplianceParagraph>
						The Service includes both hardware components (Pip educational robots) and software components (web-based learning platform, and optional subscription services such as teacher dashboards). Users may access free educational content and coding challenges without purchasing hardware, though the full experience requires a Pip robot. Schools and individual consumers may purchase Pip robots and related services as outlined in these Terms and Conditions.
					</ComplianceParagraph>
					<ComplianceParagraph>
						Lever Labs is committed to providing safe, age-appropriate educational content suitable for learners of all backgrounds. Our platform is designed to promote STEM learning, critical thinking, and problem-solving skills through engaging robotics activities.
					</ComplianceParagraph>

					<ComplianceSectionHeader>3. Acceptable Use of the Service</ComplianceSectionHeader>
					<ComplianceParagraph>
						You are responsible for your use of the Service, and for any use of the Service made using your account. Our goal is to create a positive, useful, and safe user experience. To promote this goal, we prohibit certain kinds of conduct that may be harmful to other users, our educational mission, or our systems. When you use the Services, you must comply with our {""}
						<Link
							href={"/community-guidelines"}
							className="underline"
						>
							Community Guidelines
						</Link>
						.
					</ComplianceParagraph>
					<ComplianceParagraph>
						When you use the Service, you must not:
					</ComplianceParagraph>
					<ul className="list-disc pl-6 text-wolf text-sm md:text-base font-light leading-relaxed mb-4">
						<li>Use the Service for any commercial purposes without our prior written consent;</li>
						<li>Reverse engineer, decompile, or attempt to extract source code from our software or Pip robots;</li>
						<li>Share account credentials with others or create accounts for fictitious persons;</li>
						<li>Upload, share, or create content that is inappropriate for an educational environment, including content that is offensive, harassing, or violates our community standards;</li>
						<li>Attempt to damage, disable, or impair the Service or Pip robots;</li>
						<li>Use automated scripts or bots to interact with the Service;</li>
						<li>Violate any applicable laws or regulations.</li>
					</ul>
					<ComplianceParagraph>
						Users must treat Pip robots with appropriate care and use them only for their intended educational purposes. Misuse of robots that results in damage may result in repair costs or replacement fees. All users are expected to maintain a respectful learning environment and follow basic principles of academic integrity in their coding projects and educational activities.
					</ComplianceParagraph>

					<ComplianceSectionHeader>4. Registration</ComplianceSectionHeader>
					<ComplianceParagraph>
						In connection with registering for and using the Service, you agree (i) to provide accurate, current and complete information about yourself and/or your organization as requested by Lever Labs; (ii) to maintain the confidentiality of your password and other information related to the security of your account; (iii) to maintain and promptly update any registration information you provide to Lever Labs, to keep such information accurate, current and complete; and (iv) to be fully responsible for all use of your account and for any actions that take place through your account.
					</ComplianceParagraph>
					<ComplianceParagraph>
						Users under 13 must follow additional requirements outlined in our {""}
						<Link
							href={"/privacy"}
							className="underline"
						>
							Privacy Policy
						</Link>
						.
					</ComplianceParagraph>
					<ComplianceParagraph>
						<strong>School Account Creation:</strong> Schools may create accounts on behalf of their students and teachers. When schools create accounts for students under 13, the school represents that it has obtained all necessary parental consents and agrees to act as Lever Labs' agent for compliance purposes as outlined in the applicable school agreement. School administrators and teachers may manage student accounts within their institution but may not access or modify accounts from other schools or institutions.
					</ComplianceParagraph>
					<ComplianceParagraph>
						Individual users (consumers) create their own accounts and are responsible for maintaining the security and accuracy of their account information. Parents or guardians creating accounts for their minor children are responsible for supervising their child's use of the Service and ensuring compliance with these Terms and Conditions.
					</ComplianceParagraph>

					<ComplianceSectionHeader>5. Your Representations and Warranties</ComplianceSectionHeader>
					<ComplianceParagraph>
						You represent and warrant to Lever Labs that your access and use of the Service will be in accordance with these Terms and Conditions and with all applicable laws, rules, and regulations of the United States and any other relevant jurisdiction, including those regarding online conduct, acceptable content, educational technology use, and the transmission of data exported from the United States and/or the jurisdiction in which you reside.
					</ComplianceParagraph>
					<ComplianceParagraph>
						You further represent and warrant that you have created or own any material you submit via the Service (including coding projects, comments, and other content) and that you have the right to grant us the licenses set forth in these Terms and Conditions. If you are creating an account on behalf of a minor, you represent that you have the legal authority to agree to these Terms and Conditions on behalf of that minor and to grant the necessary permissions for their participation in the Service.
					</ComplianceParagraph>

					<ComplianceSectionHeader>6. Additional Terms</ComplianceSectionHeader>
					<ComplianceParagraph>
						Some of our Services have additional terms and conditions ("Additional Terms"). Where Additional Terms apply to a Service, we will make them available for you to read through your use of that Service. By using that Service, you agree to the Additional Terms. This includes but is not limited to specific terms for school partnerships, hardware warranties, subscription services, and any special programs or features that may be offered from time to time.
					</ComplianceParagraph>

					<ComplianceSectionHeader>7. Student Code and Project Licensing</ComplianceSectionHeader>
					<ComplianceParagraph>
						As a condition of using the Service and creating coding projects, robotics programs, or other educational content through the platform ("Student Content"), you retain full ownership of your Student Content. However, to enable Lever Labs to provide educational services and operate the platform, you hereby grant to Lever Labs a perpetual, irrevocable, worldwide, royalty-free, non-exclusive, transferable, and sublicensable license to use, reproduce, modify, adapt, distribute, publicly display, create derivative works from, and otherwise utilize Student Content. This license includes the right to use Student Content for educational purposes, platform improvement, machine learning model training, research and development, marketing and promotional materials, and any other purposes related to Lever Labs' educational mission.
					</ComplianceParagraph>
					<ComplianceParagraph>
						You acknowledge that this license allows Lever Labs to showcase exemplary student work, analyze coding patterns to improve our educational algorithms, and use anonymized or aggregated project data for research purposes. However, you retain ownership of your original Student Content and may continue to use, modify, and share your projects as you wish. Lever Labs will not sell your individual projects to third parties or use your personal information in connection with showcased work without appropriate permissions.
					</ComplianceParagraph>
					<ComplianceParagraph>
						<strong>Project Sharing:</strong> You may choose to make your coding projects public (visible to all users), selectively public (visible to specific users or groups), or private (visible only to you and your teachers/administrators if applicable). Public projects may be viewed, copied, and modified by other users as part of the collaborative learning experience. When you share projects publicly, you grant other users permission to view and learn from your code while respecting basic principles of academic integrity and attribution.
					</ComplianceParagraph>

					<ComplianceSectionHeader>8. Intellectual Property Rights</ComplianceSectionHeader>
					<ComplianceParagraph>
						All content available through the Service, including but not limited to lesson materials, robot designs, software interfaces, educational curricula, graphics, images, text, audio files, video content, Lever Labs branding, and the Pip robot hardware and software designs ("Service Content"), are the proprietary property of Lever Labs or its licensors. No Service Content may be modified, copied, distributed, reproduced, republished, downloaded, displayed, posted, transmitted, reverse engineered, or sold in any form or by any means, in whole or in part, other than as expressly permitted in these Terms and Conditions.
					</ComplianceParagraph>
					<ComplianceParagraph>
						You may not use any data mining, robots, scraping, or similar data gathering or extraction methods to obtain Service Content or to interfere with the operation of our educational platform. The Pip robot hardware, including its sensor configurations, mechanical design, and embedded software, is protected by intellectual property rights and may not be reverse engineered, modified, or replicated for commercial purposes.
					</ComplianceParagraph>
					<ComplianceParagraph>
						<strong>Business Names and Proprietary Rights:</strong> "Lever Labs," "Pip," and all other business names, logos, designs, graphics, and proprietary marks used in connection with the Service are the property of Lever Labs or their respective owners and are protected by applicable intellectual property laws. Access and use of the Service does not grant or provide you with the right or license to reproduce or otherwise use the Lever Labs name, logos, designs, or any Lever Labs or third-party proprietary marks without our prior written consent.
					</ComplianceParagraph>

					<ComplianceSectionHeader>9. Hardware Purchase Terms</ComplianceSectionHeader>
					<ComplianceParagraph>
						<strong>Robot Sales and Delivery:</strong> Lever Labs offers Pip educational robots for purchase by schools, educational institutions, and individual consumers. All robot purchases are subject to these Terms and Conditions and any additional purchase agreements executed between Lever Labs and the purchaser. Pricing, availability, and specifications are subject to change without notice. All orders are subject to acceptance by Lever Labs, and we reserve the right to refuse or cancel any order for any reason.
					</ComplianceParagraph>
					<ComplianceParagraph>
						<strong>Title and Risk of Loss:</strong> Physical ownership of individual Pip robot units transfers to the purchaser upon delivery and full payment. Risk of loss or damage to the physical robot transfers to the purchaser upon delivery to the shipping address provided. Purchasers are responsible for inspecting robots upon delivery and reporting any damage or defects within 48 hours of receipt. Lever Labs will arrange for shipping through reputable carriers, but is not responsible for shipping delays, damage during transit, or delivery issues beyond our reasonable control. Lever Labs retains all intellectual property rights in the Pip robot design, software, and technology.
					</ComplianceParagraph>
					<ComplianceParagraph>
						<strong>Robot Care and Maintenance:</strong> Purchasers are responsible for the proper care, charging, and maintenance of Pip robots. This includes following all provided care instructions, ensuring robots are charged before use, protecting robots from water damage and excessive force, and using robots only for their intended educational purposes. Robots include automatic over-the-air software updates at no additional cost, which will continue indefinitely to ensure optimal performance and new educational features.
					</ComplianceParagraph>
					<ComplianceParagraph>
						<strong>Intended Use and Safety:</strong> Pip robots are designed for educational use. Users must follow all safety guidelines provided with the robots. Lever Labs is not liable for injuries or damages resulting from misuse, modification, or use outside of normal educational activities.
					</ComplianceParagraph>

					<ComplianceSectionHeader>10. Subscription Services</ComplianceSectionHeader>
					<ComplianceParagraph>
						<strong>Teacher Portal and Dashboard Services:</strong> Lever Labs offers optional subscription services, including teacher portals and administrative dashboards that provide enhanced classroom management features, progress tracking, assignment distribution, and educational analytics. These subscription services are offered primarily to schools and educational institutions, though individual educators may also subscribe subject to availability and our discretion.
					</ComplianceParagraph>
					<ComplianceParagraph>
						<strong>Subscription Terms:</strong> Subscription services are billed on a recurring basis (monthly or annually as selected) and will automatically renew unless cancelled by the subscriber at least 24 hours before the renewal date. Subscribers may cancel their subscription at any time through their account settings or by contacting customer support. Upon cancellation, subscribers will retain access to subscription features through the end of their current billing period.
					</ComplianceParagraph>
					<ComplianceParagraph>
						<strong>Service Availability:</strong> Lever Labs strives to maintain high availability of subscription services but does not guarantee uninterrupted access. We may perform maintenance, updates, or improvements that temporarily affect service availability. Subscribers will be notified of planned maintenance when feasible, and we will work to minimize disruptions to educational activities.
					</ComplianceParagraph>

					<ComplianceSectionHeader>11. Payment Terms</ComplianceSectionHeader>
					<ComplianceParagraph>
						<strong>Accepted Payment Methods:</strong> Lever Labs accepts various payment methods including bank transfers for institutional purchases and credit card payments for individual purchases and subscription services. All payment information must be accurate, complete, and current. You agree to pay all charges incurred by users of your payment method in connection with purchases or subscriptions at the prices in effect when such charges are incurred.
					</ComplianceParagraph>
					<ComplianceParagraph>
						<strong>School Payment Terms:</strong> For school and institutional purchases, payment is due according to the timeline specified in the applicable purchase agreement or invoice. Unless otherwise agreed in writing, payment is due within thirty (30) days of invoice date. Late payments may result in suspension of services or additional fees as specified in the applicable agreement.
					</ComplianceParagraph>
					<ComplianceParagraph>
						<strong>Consumer Payment Terms:</strong> Individual consumer purchases and subscription services are processed immediately upon purchase through secure third-party payment processors. You authorize Lever Labs and our payment processors to charge your designated payment method for all applicable fees. For subscription services, your payment method will be automatically charged at the beginning of each billing cycle unless you cancel before the renewal date.
					</ComplianceParagraph>
					<ComplianceParagraph>
						<strong>Taxes and Additional Fees:</strong> You are responsible for paying any applicable sales taxes, use taxes, or other governmental fees and taxes associated with your purchases. Lever Labs may collect appropriate taxes as required by law. International purchasers are responsible for any customs duties, import fees, or other charges imposed by their local authorities.
					</ComplianceParagraph>

					<ComplianceSectionHeader>12. Refund Policy</ComplianceSectionHeader>
					<ComplianceParagraph>
						<strong>School and Institutional Refunds:</strong> All sales to schools and educational institutions are final. No refunds, returns, or exchanges will be accepted for robot purchases or subscription services provided to institutional customers, except as may be specifically outlined in applicable purchase agreements or as required by law. This policy reflects the educational nature of our products and the customized support provided to institutional customers.
					</ComplianceParagraph>
					<ComplianceParagraph>
						<strong>Consumer Refunds:</strong> For individual consumer purchases of Pip robots, you may return undamaged robots with original packaging and receipt within fourteen (14) days of delivery for a full refund. For subscription services and other purchases, Lever Labs may provide refunds on a case-by-case basis at our sole discretion.
					</ComplianceParagraph>

					<ComplianceSectionHeader>13. School-Specific Terms</ComplianceSectionHeader>
					<ComplianceParagraph>
						<strong>Institutional Accounts and Bulk Registration:</strong> Schools and educational institutions may create accounts on behalf of their students and teachers through our institutional account system. School administrators have the authority to create, manage, and deactivate student and teacher accounts within their institution. Schools are responsible for ensuring that all account information is accurate and that only authorized individuals receive account access.
					</ComplianceParagraph>
					<ComplianceParagraph>
						<strong>Parental Consent Agent:</strong> When schools create accounts for students under the age of thirteen (13), the school represents and warrants that it has obtained all necessary parental consents and agrees to act as Lever Labs' agent for compliance with the Children's Online Privacy Protection Act (COPPA) and other applicable privacy laws. Schools must maintain appropriate documentation of parental consent and provide such documentation to Lever Labs upon request. Schools represent that they have the authority to provide such consent on behalf of parents/guardians as part of their educational mission and enrollment agreements with families.
					</ComplianceParagraph>
					<ComplianceParagraph>
						<strong>Teacher and Administrator Permissions:</strong> Teachers and school administrators may view student progress, assign projects and challenges, manage classroom settings, and access educational analytics for students in their classes or institution. Teachers may reset student passwords and provide login assistance but may not change student passwords permanently - students retain the ability to change their own passwords. School administrators may deactivate or transfer student accounts within their institution as needed for educational administration purposes.
					</ComplianceParagraph>
					<ComplianceParagraph>
						<strong>Institutional Data and Privacy:</strong> Schools acknowledge that student educational data, including coding projects, progress information, and usage analytics, will be shared with designated teachers and administrators within their institution. Schools are responsible for ensuring compliance with applicable educational privacy laws, including the Family Educational Rights and Privacy Act (FERPA), and for maintaining appropriate data security practices within their institution. Lever Labs will provide schools with necessary documentation and support to meet their compliance obligations.
					</ComplianceParagraph>
					<ComplianceParagraph>
						<strong>Educational Use Restrictions:</strong> School accounts and any associated subscription services are intended solely for educational use within the subscribing institution. Schools may not share account access with individuals outside their institution, use the Service for commercial purposes, or allow students to use school accounts for non-educational activities. Schools must ensure appropriate supervision of student robot use and platform access.
					</ComplianceParagraph>

					<ComplianceSectionHeader>14. Consumer-Specific Terms</ComplianceSectionHeader>
					<ComplianceParagraph>
						<strong>Individual Account Creation:</strong> Individual consumers create their own accounts and are fully responsible for maintaining account security, providing accurate information, and ensuring appropriate use of the Service. Parents or legal guardians creating accounts for minor children accept full responsibility for their child's use of the Service and compliance with these Terms and Conditions.
					</ComplianceParagraph>
					<ComplianceParagraph>
						<strong>Parental Notifications for Users Under 13:</strong> When a user under the age of thirteen (13) creates an account, they must provide a parent's or legal guardian's email address during registration. Lever Labs will automatically send a notification email to the parent explaining our data collection and privacy practices regarding children under 13. This email will include information about how parents can access, modify, or delete their child's account and data at any time by contacting us at {""}
						<Link
							href="mailto:hello@leverlabs.com?subject=Account%20Modification%20Request"
							className="underline"
						>
							hello@leverlabs.com
						</Link>.
					</ComplianceParagraph>
					<ComplianceParagraph>
						<strong>Parental Supervision and Control:</strong> Parents and guardians are responsible for supervising their child's use of Pip robots and ensuring safe use of robot hardware. Parents may contact Lever Labs at any time to modify their child's account settings or request account deletion.
					</ComplianceParagraph>
					<ComplianceParagraph>
						<strong>Consumer Robot Use:</strong> Individual consumers who purchase Pip robots are responsible for their proper care, maintenance, and safe use. Consumers should ensure appropriate supervision when children are using robots and follow all provided safety guidelines.
					</ComplianceParagraph>
					<ComplianceParagraph>
						<strong>Consumer Privacy Settings:</strong> Individual users have full control over their project sharing settings and may choose to make their work public, selectively shared, or completely private. Parents may modify privacy settings on behalf of their minor children and may request that their child's projects remain private or be shared only within educational contexts. Consumer accounts are not automatically associated with any institutional accounts or classroom settings unless explicitly connected by the user.
					</ComplianceParagraph>

					<ComplianceSectionHeader>15. Equipment Warranty and Liability</ComplianceSectionHeader>
					<ComplianceParagraph>
						<strong>Limited Hardware Warranty:</strong> Lever Labs provides a one (1) year limited warranty from the date of delivery for Pip robots against defects in materials and workmanship under normal use conditions. During this warranty period, Lever Labs will repair or replace defective robots at no cost to the purchaser. This warranty does not cover damage caused by accidents, misuse, unauthorized modifications, normal wear and tear, or failure to follow provided care instructions.
					</ComplianceParagraph>
					<ComplianceParagraph>
						<strong>What's Not Covered:</strong> This warranty does not apply to damage caused by: (i) accidents, spills, or impact; (ii) misuse or abuse; (iii) unauthorized modifications or repairs; (iv) normal wear and tear; (v) exposure to liquids, extreme temperatures, or other environmental factors; or (vi) failure to follow provided care and safety instructions. Software issues resolved through updates are not considered warranty defects.
					</ComplianceParagraph>
					<ComplianceParagraph>
						<strong>User Responsibility:</strong> You are responsible for backing up any data or projects before warranty service. Lever Labs is not responsible for lost data, projects, or educational progress during warranty service. Warranty service may result in restoration of your robot to its original configuration.
					</ComplianceParagraph>
					<ComplianceParagraph>
						<strong>Warranty Disclaimer and Limitation:</strong> TO THE MAXIMUM EXTENT PERMITTED BY LAW, THIS LIMITED WARRANTY IS THE ONLY WARRANTY PROVIDED BY LEVER LABS AND REPLACES ALL OTHER WARRANTIES, EXPRESS OR IMPLIED. LEVER LABS' TOTAL LIABILITY SHALL NOT EXCEED THE PURCHASE PRICE OF THE ROBOT. LEVER LABS SHALL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES.
					</ComplianceParagraph>

					<ComplianceSectionHeader>16. Platform Liability</ComplianceSectionHeader>
					<ComplianceParagraph>
						<strong>User-Generated Code Responsibility:</strong> Users are solely responsible for any coding projects, programs, or commands they create and execute on Pip robots. Lever Labs is not liable for any damage to robots, personal property, or injury that may result from user-created code, programming errors, or misuse of robot capabilities. Users acknowledge that coding errors or inappropriate commands may cause robots to behave unexpectedly and agree to use appropriate caution and supervision when testing and running their programs.
					</ComplianceParagraph>
					<ComplianceParagraph>
						<strong>Service Interruptions:</strong> Lever Labs strives to maintain reliable platform availability but does not guarantee uninterrupted service. We may experience outages, maintenance periods, or technical difficulties that temporarily affect access to the platform or robot connectivity. Lever Labs is not liable for any educational disruption, lost progress, or other impacts resulting from service interruptions, provided we make reasonable efforts to restore service promptly.
					</ComplianceParagraph>
					<ComplianceParagraph>
						<strong>Third-Party Integrations:</strong> The Service may integrate with or rely upon third-party services, including but not limited to payment processors, cloud storage providers, and educational technology platforms. Lever Labs is not responsible for the availability, functionality, or security of third-party services, and any issues with such services are not the responsibility of Lever Labs. Users acknowledge that interruptions or issues with third-party services may affect their use of the Lever Labs platform.
					</ComplianceParagraph>

					<ComplianceSectionHeader>17. No Representations or Warranties by Lever Labs</ComplianceSectionHeader>
					<ComplianceParagraph>
						THE SERVICE, INCLUDING ALL EDUCATIONAL CONTENT, SOFTWARE, PIP ROBOTS, AND ANY OTHER INFORMATION, PROPERTY AND RIGHTS GRANTED OR PROVIDED TO YOU BY LEVER LABS ARE PROVIDED TO YOU ON AN "AS IS" BASIS. LEVER LABS AND ITS SUPPLIERS MAKE NO REPRESENTATIONS OR WARRANTIES OF ANY KIND WITH RESPECT TO THE SERVICE, EITHER EXPRESS OR IMPLIED, AND ALL SUCH REPRESENTATIONS AND WARRANTIES, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, AND EDUCATIONAL EFFECTIVENESS, ARE EXPRESSLY DISCLAIMED.
					</ComplianceParagraph>
					<ComplianceParagraph>
						WITHOUT LIMITING THE GENERALITY OF THE FOREGOING, LEVER LABS DOES NOT MAKE ANY REPRESENTATION OR WARRANTY OF ANY KIND RELATING TO ACCURACY OF EDUCATIONAL CONTENT, SERVICE AVAILABILITY, COMPLETENESS OF CURRICULUM, ERROR-FREE OPERATION OF ROBOTS OR SOFTWARE, EDUCATIONAL RESULTS TO BE OBTAINED FROM USE, OR NON-INFRINGEMENT OF THIRD-PARTY RIGHTS. ACCESS AND USE OF THE SERVICE MAY BE UNAVAILABLE DURING PERIODS OF PEAK DEMAND, SYSTEM UPGRADES, ROBOT MAINTENANCE, MALFUNCTIONS OR SCHEDULED OR UNSCHEDULED MAINTENANCE OR FOR OTHER REASONS.
					</ComplianceParagraph>
					<ComplianceParagraph>
						Lever Labs makes no warranties regarding the educational effectiveness of the Service for any particular student, learning outcome, or educational goal. While we design our platform to provide valuable STEM learning experiences, educational results may vary based on individual student needs, learning styles, supervision, and other factors beyond our control. SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF IMPLIED WARRANTIES, SO THE ABOVE EXCLUSION MAY NOT APPLY TO YOU.
					</ComplianceParagraph>

					<ComplianceSectionHeader>18. Limitation of Liability</ComplianceSectionHeader>
					<ComplianceParagraph>
						TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT WILL LEVER LABS BE LIABLE TO YOU OR ANY THIRD PARTY CLAIMING THROUGH YOU (WHETHER BASED IN CONTRACT, TORT, STRICT LIABILITY OR OTHER THEORY) FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR EXEMPLARY DAMAGES ARISING OUT OF OR RELATING TO THE ACCESS OR USE OF, OR THE INABILITY TO ACCESS OR USE, THE SERVICE OR ANY PORTION THEREOF, INCLUDING BUT NOT LIMITED TO LOSS OF USE OF THE SERVICE, LOST EDUCATIONAL PROGRESS, INACCURATE RESULTS, LOSS OF PROFITS, BUSINESS INTERRUPTION, OR DAMAGES STEMMING FROM LOSS OR CORRUPTION OF DATA, THE COST OF RECOVERING ANY DATA, THE COST OF SUBSTITUTE EDUCATIONAL SERVICES, ROBOT REPAIR OR REPLACEMENT COSTS, OR CLAIMS BY THIRD PARTIES FOR ANY DAMAGE TO COMPUTERS, SOFTWARE, OTHER ROBOTS, PERSONAL PROPERTY, OR OTHER EQUIPMENT, EVEN IF LEVER LABS HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
					</ComplianceParagraph>
					<ComplianceParagraph>
						TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, LEVER LABS' LIABILITY TO YOU OR ANY THIRD PARTY CLAIMING THROUGH YOU FOR ANY CAUSE WHATSOEVER, AND REGARDLESS OF THE FORM OF THE ACTION, IS LIMITED TO THE GREATER OF (A) THE AMOUNT PAID, IF ANY, BY YOU TO LEVER LABS FOR THE SERVICE OR HARDWARE IN THE 12 MONTHS PRIOR TO THE INITIAL ACTION GIVING RISE TO LIABILITY, OR (B) ONE HUNDRED DOLLARS ($100). THIS IS AN AGGREGATE LIMIT. THE EXISTENCE OF MORE THAN ONE CLAIM HEREUNDER WILL NOT INCREASE THIS LIMIT.
					</ComplianceParagraph>
					<ComplianceParagraph>
						You understand and agree that we have set our prices and entered into these Terms and Conditions with you in reliance upon the limitations of liability set forth in these Terms and Conditions, which allocate risk between us and form the basis of a bargain between the parties. These limitations will apply even if Lever Labs has been advised of the possibility of such damages and even if any limited remedy specified in these Terms and Conditions is found to have failed of its essential purpose.
					</ComplianceParagraph>
					<ComplianceParagraph>
						<strong>Educational Institution Acknowledgment:</strong> Schools and educational institutions acknowledge that they are best positioned to supervise student use of robots and the platform, and that Lever Labs' role is limited to providing educational tools and content. Institutions assume responsibility for integrating the Service appropriately into their educational programs and for ensuring adequate supervision and safety protocols.
					</ComplianceParagraph>

					<ComplianceSectionHeader>19. Indemnification</ComplianceSectionHeader>
					<ComplianceParagraph>
						You agree to defend, indemnify and hold harmless Lever Labs and its directors, officers, employees, contractors, agents, suppliers, licensors, successors and assigns, from and against any and all losses, claims, causes of action, obligations, liabilities and damages whatsoever, including attorneys' fees, arising out of or relating to your access or use of the Service, any false representation made to us (as part of these Terms and Conditions or otherwise), your breach of any of these Terms and Conditions, or any claim that any educational content, robot programming, or other materials we provide to you is inaccurate, inappropriate, or defective in any way whatsoever.
					</ComplianceParagraph>
					<ComplianceParagraph>
						This indemnification includes but is not limited to claims arising from: (i) your misuse or modification of Pip robots; (ii) damage caused by code or programs you create and execute on robots; (iii) your violation of any third-party rights, including intellectual property rights; (iv) your violation of any applicable laws or regulations in connection with your use of the Service; (v) any content you submit, post, or share through the platform; or (vi) any injury or damage caused by robots under your control or supervision. Schools and educational institutions additionally agree to indemnify Lever Labs for any claims arising from their students' use of the Service under institutional supervision.
					</ComplianceParagraph>

					<ComplianceSectionHeader>20. Termination</ComplianceSectionHeader>
					<ComplianceParagraph>
						Lever Labs may terminate your access and use of the Service immediately at any time, for any reason, including but not limited to violation of these Terms and Conditions, misuse of robots or platform features, failure to pay applicable fees, or conduct that we determine is harmful to other users or our educational mission. Upon termination, you will have no further right to use the Service, though you may retain ownership of any Pip robots for which payment has been completed.
					</ComplianceParagraph>
					<ComplianceParagraph>
						You may terminate your Lever Labs account at any time through your account settings, by following the instructions available through the Service, or by contacting customer support. Schools may terminate institutional accounts and associated student accounts through their administrative dashboard or by contacting our institutional support team. Upon account termination, you may lose access to projects, progress data, and other content stored on the platform.
					</ComplianceParagraph>
					<ComplianceParagraph>
						<strong>Survival of Terms:</strong> Sections relating to intellectual property rights, indemnification, limitation of liability, payment obligations, and dispute resolution shall survive any termination of these Terms and Conditions. Your obligations regarding robot care and any outstanding payment obligations will continue after termination. Lever Labs may retain anonymized or aggregated data derived from your use of the Service for research and platform improvement purposes even after account termination.
					</ComplianceParagraph>

					<ComplianceSectionHeader>21. Third-Party Services</ComplianceSectionHeader>
					<ComplianceParagraph>
						The Service relies on various third-party services and integrations to provide payment processing, cloud storage, communications, and other functionality. This includes but is not limited to Stripe for payment processing, cloud hosting providers for platform infrastructure, and other educational technology integrations that may be offered from time to time. We do not endorse or assume any responsibility for any such third-party sites, information, materials, products, or services.
					</ComplianceParagraph>
					<ComplianceParagraph>
						All financial transactions made in connection with the Service will be processed by third-party payment processors in accordance with their respective terms of use, privacy policies, and payment terms and conditions. We encourage you to learn about the practices of such third parties. In no event will Lever Labs be responsible for the actions or inactions of any third-party payment processor, including but not limited to system downtime, payment service outages, processing errors, or security breaches affecting payment information.
					</ComplianceParagraph>

					<ComplianceSectionHeader>22. Privacy</ComplianceSectionHeader>
					<ComplianceParagraph>
						Use of the Service is also governed by our Privacy Policy, a copy of which is located at {""}
						<Link
							href={"/privacy"}
							className="underline"
						>
							www.bluedotrobots.com/privacy
						</Link>
						. By using the Service, you consent to the terms of the Privacy Policy. Our Privacy Policy explains how we collect, use, and protect information from users, including special protections for users under 13 years of age in compliance with COPPA and other applicable privacy laws.
					</ComplianceParagraph>

					<ComplianceSectionHeader>23. Export Controls and International Use</ComplianceSectionHeader>
					<ComplianceParagraph>
						<strong>Export Restrictions:</strong> Pip robots and related technology may be subject to U.S. export control laws and regulations. By purchasing or using our products, you acknowledge that you will comply with all applicable export control laws and will not export, re-export, or transfer robots or technology to prohibited countries, entities, or individuals. While we may sell robots internationally, purchasers outside the United States are responsible for ensuring compliance with their local import regulations and any applicable technology transfer restrictions.
					</ComplianceParagraph>
					<ComplianceParagraph>
						<strong>International Service Access:</strong> While Pip robots may be purchased and used internationally, our software platform and services are operated from the United States and subject to U.S. laws. International users access the Service at their own risk and are responsible for compliance with their local laws regarding online services, educational technology, and data protection. We make no representation that the Service is appropriate or available for use outside the United States, and accessing the Service from territories where its contents are illegal is prohibited.
					</ComplianceParagraph>

					<ComplianceSectionHeader>24. Governing Law</ComplianceSectionHeader>
					<ComplianceParagraph>
						These Terms and Conditions shall be governed by and construed under the laws of the State of New York, United States of America, excluding any conflict of laws provisions, regardless of your country of origin or where you access the Service. Any legal proceedings relating to these Terms and Conditions or your use of the Service shall be subject to the exclusive jurisdiction of the state and federal courts located in New York County, New York, and you hereby consent to personal jurisdiction in such courts and waive any objections to venue in those courts.
					</ComplianceParagraph>

					<ComplianceSectionHeader>25. Dispute Resolution & Arbitration</ComplianceSectionHeader>
					<ComplianceParagraph>
						<strong>Dispute Resolution & Arbitration:</strong> Any dispute relating to these Terms, the Service, or Pip robots will be resolved through binding arbitration rather than in court. Arbitration will be conducted by a single arbitrator in New York County, New York, under the American Arbitration Association's Consumer Arbitration Rules.
					</ComplianceParagraph>
					<ComplianceParagraph>
						<strong>Pre-Dispute Settlement:</strong> Before starting arbitration, parties must first attempt to resolve disputes through a good-faith settlement discussion.
					</ComplianceParagraph>
					<ComplianceParagraph>
						<strong>Class Action Waiver:</strong> Disputes will be resolved individually only. You waive your right to participate in class action lawsuits or class-wide arbitration.
					</ComplianceParagraph>
					<ComplianceParagraph>
						<strong>Opt-Out:</strong> Individual consumers may opt out of this arbitration agreement by emailing {""}
						<Link
							href="mailto:hello@leverlabs.com?subject=Arbitration%20Opt-Out%20Request"
							className="underline"
						>
							hello@leverlabs.com
						</Link> {""}
						within 30 days of first using the Service, including your name and a clear opt-out statement.
					</ComplianceParagraph>

					<ComplianceSectionHeader>26. Miscellaneous</ComplianceSectionHeader>
					<ComplianceParagraph>
						<strong>Entire Agreement:</strong> These Terms and Conditions, together with our Privacy Policy and any applicable Additional Terms, constitute the entire agreement between Lever Labs and you concerning the subject matter hereof and supersede all prior agreements, understandings, negotiations, and discussions, whether oral or written, between the parties. Any additional or different terms proposed by you are expressly rejected unless explicitly agreed to in writing by Lever Labs.
					</ComplianceParagraph>
					<ComplianceParagraph>
						<strong>Order of Precedence:</strong> In the event of any conflict between these Terms and a separate written agreement between you and Lever Labs, the separate written agreement shall control.
					</ComplianceParagraph>
					<ComplianceParagraph>
						<strong>Severability:</strong> In the event that any provision of these Terms and Conditions is held by a court or other tribunal of competent jurisdiction to be unenforceable, such provision shall be limited or eliminated to the minimum extent necessary so that these Terms and Conditions shall otherwise remain in full force and effect. The unenforceable provision shall be deemed modified to the extent necessary to make it enforceable while preserving its intent to the greatest extent possible.
					</ComplianceParagraph>
					<ComplianceParagraph>
						<strong>Assignment:</strong> Lever Labs may assign its rights or obligations under these Terms and Conditions without condition to any affiliate, subsidiary, or successor entity, or in connection with any merger, acquisition, reorganization, or sale of assets. You may not assign, transfer, or delegate your rights or obligations under these Terms and Conditions without our prior written consent, and any attempted assignment without such consent shall be void.
					</ComplianceParagraph>
					<ComplianceParagraph>
						<strong>Waiver:</strong> A waiver by Lever Labs of any provision of these Terms and Conditions or any breach thereof, in any one instance, will not waive such term or condition or any subsequent breach thereof. No failure or delay by Lever Labs in exercising any right hereunder will operate as a waiver thereof, nor will any single or partial exercise of any right preclude any other or further exercise thereof or the exercise of any other right.
					</ComplianceParagraph>
					<ComplianceParagraph>
						<strong>Force Majeure:</strong> Lever Labs shall not be liable for any failure or delay in performance under these Terms and Conditions which is due to fire, flood, earthquake, elements of nature or acts of God, acts of war, terrorism, riots, civil disorders, rebellions or revolutions, pandemics or other public health emergencies, or any other cause beyond the reasonable control of Lever Labs.
					</ComplianceParagraph>
					<ComplianceParagraph>
						<strong>Notices:</strong> Any notices required or permitted hereunder shall be given in writing and shall be deemed effectively given upon personal delivery, upon deposit in the United States mail by certified or registered mail, postage prepaid, or upon confirmed transmission by electronic mail to the address specified by the receiving party for such purpose.
					</ComplianceParagraph>
					<ComplianceParagraph>
						<strong>Language:</strong> This agreement was originally written in English (US). To the extent any translated version of this agreement conflicts with the English version, the English version controls. These Terms and Conditions will be binding upon and will inure to the benefit of Lever Labs and you, and your respective successors and permitted assigns.
					</ComplianceParagraph>

					<Separator className="bg-swan my-10 h-1 rounded-full"/>

					<ComplianceParagraph>
						<strong>Last revised on June 9th, 2025</strong>
					</ComplianceParagraph>
				</div>
			</SupportSectionContainer>
		</ProfileLayout>
	)
}
