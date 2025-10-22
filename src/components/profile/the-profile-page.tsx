"use client"

import { observer } from "mobx-react"
import { Moon, Sun } from "lucide-react"
import { Button } from "../shadcn/ui/button"
import ProfileLayout from "./profile-layout"
import ChangeNameSection from "./change-name-section"
import ProfileImage from "./profile-image/profile-image"
import ChangePasswordSection from "./change-password-section"
import ChangeUsernameSection from "./change-username-section"
import personalInfoClass from "../../classes/personal-info-class"
import useSetDefaultSiteTheme from "../../utils/personal-info/set-default-site-theme"

function ProfilePage(): React.ReactNode {
	const setDefaultSiteTheme = useSetDefaultSiteTheme()
	return (
		<ProfileLayout>
			<div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 mt-5 max-w-full">
				<div className="font-medium text-2xl md:text-3xl text-eel mb-6 md:mb-10">
					Profile
				</div>

				{/* Profile Picture and Email Section */}
				<div className="flex flex-col gap-6 mb-8">
					<ProfileImage />
				</div>

				<div className="mb-6">
					<div className="text-base md:text-lg font-medium text-eel mb-2 block">
						Email
					</div>
					<div className="text-base md:text-lg font-medium text-wolf wrap-break-word">
						{personalInfoClass.email || "No email set"}
					</div>
				</div>

				<ChangeNameSection />

				<ChangeUsernameSection />

				<ChangePasswordSection />

				{/* Theme Toggle */}
				<div className="mb-8 flex items-center">
					<Button
						variant="outline"
						size="icon"
						onClick={setDefaultSiteTheme}
						className="rounded-full h-9 w-9 md:h-10 md:w-10"
					>
						{personalInfoClass.defaultSiteTheme === "light" ? (
							<Moon className="h-5 w-5 md:h-6! md:w-6!" />
						) : (
							<Sun className="h-5 w-5 md:h-6! md:w-6!" />
						)}
					</Button>
					<span
						className="ml-3 text-base md:text-lg font-medium cursor-pointer"
						onClick={setDefaultSiteTheme}
					>
						{personalInfoClass.defaultSiteTheme === "light" ? "Dark Mode" : "Light Mode"}
					</span>
				</div>
			</div>
		</ProfileLayout>
	)
}

export default observer(ProfilePage)
