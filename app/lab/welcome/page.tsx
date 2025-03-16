import LabWelcome from "@/components/lab/welcome-page/lab-welcome"
import { createMetadata } from "../../../src/utils/helmet-data/create-metadata"

export const metadata = createMetadata({
	title: "Lab Welcome",
	// eslint-disable-next-line max-len
	description: "Welcome to the Lab! This is where the magic happens. Where you'll learn the same fundamental skills you need to land rockets, design self-driving cars, and build robotics that can walk (and talk).",
	path: "/lab/welcome",
	keywords: ["beginner robotics", "interactive learning", "coding fundamentals"]
})

export default function WelcomePage() {
	return <LabWelcome />
}
