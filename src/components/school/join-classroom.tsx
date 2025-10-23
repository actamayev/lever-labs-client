"use client"
import { useCallback, useState } from "react"
import { AlertCircle, CheckCircle } from "lucide-react"
import { Input } from "../ui/input"
import { cn } from "../../lib/shadcn/utils"
import { TactileButton } from "../buttons/tactile-button"
import getDuolingoColors from "../../utils/get-duolingo-colors"
import joinClassroom from "../../utils/student/join-classroom"
import { isValidClassCode } from "../../utils/validate-class-code"
import useTypedNavigate from "../../hooks/navigate/use-typed-navigate"
import { ACCEPTABLE_CLASS_CODE_CHARACTERS } from "@lever-labs/common-ts/types/utils/constants"

export default function JoinClassroom(): React.ReactNode {
	const navigate = useTypedNavigate()
	const [classCode, setClassCode] = useState("")
	const [error, setError] = useState("")
	const [success, setSuccess] = useState("")

	const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
		const value = e.target.value
		const characters = ACCEPTABLE_CLASS_CODE_CHARACTERS

		// Filter to only allowed characters
		const filteredValue = value
			.split("")
			.filter((char): boolean => characters.includes(char))
			.slice(0, 5) // Maximum 5 characters
			.join("")

		setClassCode(filteredValue)
		setError("")
		setSuccess("")
	}, [])

	const submit = useCallback(async (): Promise<void> => {
		if (!isValidClassCode(classCode)) return
		setError("")
		setSuccess("")
		const joinedClassroom = await joinClassroom(classCode, setError, setSuccess)
		if (!joinedClassroom) return
		navigate(`/whiteboard/${classCode}`)
	}, [classCode, navigate])

	const colors = getDuolingoColors("humpback")

	return (
		<>
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
					id="class-code"
					value={classCode}
					onChange={handleInputChange}
					className={cn(
						"w-full pr-14 h-10 md:h-12 text-lg md:text-xl! bg-polar text-eel! font-light shadow-none",
						// eslint-disable-next-line no-nested-ternary
						error
							? "border-cardinal"
							: success
								? "border-charging-green"
								: "border-swan"
					)}
					maxLength={5}
				/>

				{/* Error/Success Area */}
				{error && (
					<div className="flex items-center mt-2 text-cardinal text-sm font-medium">
						<AlertCircle className="w-4 h-4 mr-2 shrink-0" />
						<span>{error}</span>
					</div>
				)}

				{success && (
					<div className="flex items-center mt-2 text-charging-green text-sm font-medium">
						<CheckCircle className="w-4 h-4 mr-2 shrink-0" />
						<span>{success}</span>
					</div>
				)}

				<TactileButton
					onClick={submit}
					className={cn("duration-150 text-white h-10 rounded-2xl mt-5 text-xl w-1/5", colors.bg)}
					shadowHeight={4}
					shadowClass={colors.shadow2}
					disabled={!isValidClassCode(classCode)}
				>
					SUBMIT
				</TactileButton>
			</div>
		</>
	)
}
