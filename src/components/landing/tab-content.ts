import { LucideIcon, Book, Brain, Repeat, Package, Sparkles, Search, Beaker, Smile, Users, Trophy } from "lucide-react"

export type TabContent = {
	id: string
	label: string
	icon: LucideIcon
	useCustomIcon?: boolean
	title: string
	subtitle: string
	bullets: string[]
	cards: Array<{
		icon: LucideIcon
		title: string
	}>
	ctaLink: string
	imagePlaceholder: string
}

export const platformTabs: TabContent[] = [
	{
		id: "learn",
		label: "Learn",
		icon: Book,
		useCustomIcon: false,
		title: "Learn",
		subtitle: "Learn by doing",
		bullets: [
			"Bite-sized lessons that keep you motivated",
			"Personalized AI learning",
			"Simple introductions to complex topics"
		],
		cards: [
			{
				icon: Brain,
				title: "Critical thinking"
			},
			{
				icon: Repeat,
				title: "Builds a habit of loving to learn"
			},
			{
				icon: Package,
				title: "Problem solving skills"
			}
		],
		ctaLink: "/learn",
		imagePlaceholder: "/placeholder-learn.jpg"
	},
	{
		id: "sandbox",
		label: "Sandbox",
		icon: Book, // Will be replaced by CustomSandbox
		useCustomIcon: true,
		title: "Sandbox",
		subtitle: "Your imagination is the limit",
		bullets: [
			"153+ blocks and (quickly) growing",
			"Access an AI companion if you ever get stuck",
			"Transition from blocks to writing code"
		],
		cards: [
			{
				icon: Sparkles,
				title: "Strengthen left brain (creativity) thinking"
			},
			{
				icon: Search,
				title: "Open-ended exploration"
			},
			{
				icon: Beaker,
				title: "Learn by making trial-and-error"
			}
		],
		ctaLink: "/sandbox",
		imagePlaceholder: "/placeholder-sandbox.jpg"
	},
	{
		id: "garage",
		label: "Garage",
		icon: Book, // Will be replaced by CustomGarage
		useCustomIcon: true,
		title: "Garage",
		subtitle: "Just for fun",
		bullets: [
			"Take Pip on a joyride",
			"Access Pip's real-time sensor data",
			"Do tricks"
		],
		cards: [
			{
				icon: Smile,
				title: "Relax"
			},
			{
				icon: Users,
				title: "Have fun with friends"
			},
			{
				icon: Trophy,
				title: "Race friends (social component)"
			}
		],
		ctaLink: "/garage",
		imagePlaceholder: "/placeholder-garage.jpg"
	}
]
