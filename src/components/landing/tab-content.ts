import { LucideIcon, Book, Brain, Repeat, Puzzle, Sparkles, Search, Beaker, Smile, Users, Trophy } from "lucide-react"
import { CustomFriend } from "../../icons/custom-friend"

type TabContent = {
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
			"Quick, bite-sized lessons designed to keep you motivated",
			"Hands-on learning with a real robot",
			"Progress from simple blinks to complex behaviors"
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
				icon: Puzzle,
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
			"Build anything you can imagine with 153+ blocks",
			"Get unstuck with an AI companion when you need help",
			"Graduate from blocks to real code when you're ready"
		],
		cards: [
			{
				icon: Brain,
				title: "Creative thinking"
			},
			{
				icon: Beaker,
				title: "Experimentation"
			},
			{
				icon: Search,
				title: "Self-directed learning"
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
			"Drive Pip around with your keyboard",
			"Visualize sensor data in real-time",
			"Challenge friends to races and competitions"
		],
		cards: [
			{
				icon: Smile,
				title: "Stress-free play"
			},
			{
				icon: CustomFriend,
				title: "Social connection"
			},
			{
				icon: Trophy,
				title: "Friendly competition"
			}
		],
		imagePlaceholder: "/images/career-quest/meet-pip/s1_p5_1.png",
		themeColor: "lever-blue"
	}
]
