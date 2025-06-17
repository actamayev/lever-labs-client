"use client"

import { observer } from "mobx-react"
import { EyeOff, Eye } from "lucide-react"
import { useState, useCallback } from "react"
import { Input } from "../shadcn/ui/input"
import { Label } from "../shadcn/ui/label"
import { Button } from "../shadcn/ui/button"
import changePassword from "../../utils/personal-info/change-password"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../shadcn/ui/card"

// eslint-disable-next-line max-lines-per-function
function ChangePasswordSection() {
	const [currentPassword, setCurrentPassword] = useState("")
	const [newPassword, setNewPassword] = useState("")
	const [showCurrentPassword, setShowCurrentPassword] = useState(false)
	const [showNewPassword, setShowNewPassword] = useState(false)
	const [passwordError, setPasswordError] = useState("")

	const handleCurrentPasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setCurrentPassword(e.target.value)
		// Clear error message when user starts typing
		if (passwordError) {
			setPasswordError("")
		}
	}, [passwordError])

	const handleNewPasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setNewPassword(e.target.value)
		// Clear error message when user starts typing
		if (passwordError) {
			setPasswordError("")
		}
	}, [passwordError])

	const savePassword = useCallback(async () => {
		const errorMessage = await changePassword(currentPassword, newPassword)
		if (errorMessage) {
			setPasswordError(errorMessage)
		} else {
			setPasswordError("")
			setCurrentPassword("")
			setNewPassword("")
		}
	}, [currentPassword, newPassword])

	// Check if password change is valid
	const isPasswordChangeValid = currentPassword.length >= 6 &&
		newPassword.length >= 6 &&
		currentPassword !== newPassword

	return (
		<Card className="mb-8 max-w-xl w-full">
			<CardHeader className="px-4 md:px-6">
				<CardTitle className="text-xl md:text-2xl">Change Password</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4 px-4 md:px-6">
				<div className="space-y-2">
					<Label
						htmlFor="current-password"
						className="text-base md:text-lg font-medium text-eel mb-2 block"
					>
							Current Password
					</Label>
					<div className="relative w-full">
						<Input
							id="current-password"
							type={showCurrentPassword ? "text" : "password"}
							value={currentPassword}
							onChange={handleCurrentPasswordChange}
							className="w-full pr-14 h-10 md:h-12 text-lg md:!text-xl shadow-none
							bg-polar !text-eel font-light border-swan"
						/>
						<Button
							type="button"
							variant="ghost"
							size="sm"
							className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-1 hover:bg-swan"
							onClick={() => setShowCurrentPassword(prevState => !prevState)}
						>
							{showCurrentPassword ? (
								<EyeOff className="h-5 w-5 md:!h-6 md:!w-6" />
							) : (
								<Eye className="h-5 w-5 md:!h-6 md:!w-6" />
							)}
						</Button>
					</div>
				</div>
				<div className="space-y-2">
					<Label htmlFor="new-password" className="text-base md:text-lg font-medium text-eel mb-2 block">
						New Password
					</Label>
					<div className="relative w-full">
						<Input
							id="new-password"
							type={showNewPassword ? "text" : "password"}
							value={newPassword}
							onChange={handleNewPasswordChange}
							className="w-full pr-14 h-10 md:h-12 text-lg md:!text-xl shadow-none
							bg-polar !text-eel font-light border-swan"
						/>
						{newPassword.length > 0 && newPassword.length < 6 && (
							<p className="text-sm text-red-500">
								Password must be at least 6 characters.
							</p>
						)}
						<Button
							type="button"
							variant="ghost"
							size="sm"
							className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-1 hover:bg-swan"
							onClick={() => setShowNewPassword(prevState => !prevState)}
						>
							{showNewPassword ? (
								<EyeOff className="h-5 w-5 md:!h-6 md:!w-6" />
							) : (
								<Eye className="h-5 w-5 md:!h-6 md:!w-6" />
							)}
						</Button>
					</div>
				</div>
				{passwordError && (
					<p className="text-sm text-cardinal mt-1">
						{passwordError}
					</p>
				)}
			</CardContent>
			<CardFooter className="px-4 md:px-6">
				<Button
					onClick={savePassword}
					disabled={!isPasswordChangeValid}
					className="w-full sm:w-auto"
				>
					Save Changes
				</Button>
			</CardFooter>
		</Card>
	)
}

export default observer(ChangePasswordSection)
