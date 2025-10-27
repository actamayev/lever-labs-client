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
	imagePlaceholder: string
	themeColor: string
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
				title: "Learning by repetition"
			},
			{
				icon: Package,
				title: "Problem solving skills"
			}
		],
		imagePlaceholder: "/images/career-quest/meet-pip/s1_p1.png",
		themeColor: "lever-yellow"
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
				title: "Strengthen left brain thinking"
			},
			{
				icon: Search,
				title: "Open-ended exploration"
			},
			{
				icon: Beaker,
				title: "Trial and error learning"
			}
		],
		imagePlaceholder: "/images/career-quest/meet-pip/s1_p3.jpeg",
		themeColor: "lever-red"
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
				title: "Compete with friends"
			}
		],
		imagePlaceholder: "/images/career-quest/meet-pip/s1_p5_1.png",
		themeColor: "lever-blue"
	}
]
