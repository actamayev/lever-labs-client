"use client"
import { useCallback, useState } from "react"
import { observer } from "mobx-react"
import { AlertCircle } from "lucide-react"
import { Input } from "../shadcn/ui/input"
import { cn } from "../../lib/shadcn/utils"
import ProfileLayout from "../profile/profile-layout"
import joinClass from "../../utils/student/join-class"
import { TactileButton } from "../shadcn/ui/tactile-button"
import { getDuolingoColors } from "../../utils/duolingo-utils"
import { isValidClassCode } from "../../utils/validate-class-code"

function SchoolSettingsPage() {
	const [classCode, setClassCode] = useState("")
	const [error, setError] = useState("")

	const submit = useCallback(async () => {
		if (!isValidClassCode(classCode)) return
		await joinClass(classCode, setError)
	}, [classCode])

	const colors = getDuolingoColors("humpback")

	return (
		<ProfileLayout>
			<div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 mt-5 max-w-full">
				<div className="font-medium text-2xl md:text-3xl text-eel mb-8 md:mb-14	">
					Blue Dot for Schools
				</div>

				<div className="mr-20">
					<div className="text-wolf text-2xl border-b-2 border-swan pb-2 font-medium">
						Join a classroom
					</div>
					<div className="text-eel font-light mt-2">
						Enter the 5-letter code you received from your teacher.
						Once you join, they'll be able to follow your progress and give you assignments.
					</div>
				</div>
				<div className="relative w-full max-w-xl mt-5 flex flex-col">
					<Input
						id="name"
						value={classCode}
						onChange={(e) => {
							setClassCode(e.target.value)
							setError("")
						}}
						className={cn(
							"w-full pr-14 h-10 md:h-12 text-lg md:!text-xl bg-polar !text-eel font-light shadow-none",
							error
								? "border-cardinal"
								: "border-swan"
						)}
						maxLength={5}
						placeholder="APPLE"
					/>

					{/* Error Area */}
					{error && (
						<div className="flex items-center mt-2 text-red-500 text-sm font-medium">
							<AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
							<span>{error}</span>
						</div>
					)}

					<TactileButton
						onClick={submit}
						className={cn("duration-150 text-white h-10 rounded-2xl mt-5 text-xl w-1/5", colors.bg)}
						shadowHeight={4}
						shadowClass={colors.shadow}
						disabled={!isValidClassCode(classCode)}
					>
						SUBMIT
					</TactileButton>
				</div>
			</div>
		</ProfileLayout>
	)
}

export default observer(SchoolSettingsPage)
