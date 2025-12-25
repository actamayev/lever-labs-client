"use client"

import { LoginRequest } from "@actamayev/lever-labs-common-ts/types/api"
import isEmpty from "lodash-es/isEmpty"

export default function confirmLoginFields(credentials: LoginRequest, setError: (error: string) => void): boolean {
	if (isEmpty(credentials.contact) && isEmpty(credentials.password)) {
		setError("Welcome back! Please enter your email/username and password to log in")
		return false
	} else if (isEmpty(credentials.password)) {
		setError("Almost there! Just need your password")
		return false
	} else if (isEmpty(credentials.contact)) {
		setError("To get started, enter your email or username")
		return false
	} else if (credentials.contact.length < 3) {
		setError("Please enter a longer email or username (at least 3 characters)")
		return false
	} else if (credentials.password.length < 6) {
		setError("For better security, please use at least 6 characters for your password")
		return false
	} else {
		setError("")
		return true
	}
}
