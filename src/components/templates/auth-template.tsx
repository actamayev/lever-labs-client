import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/shadcn/ui/card"

interface Props {
	title: string
	customStyles?: object
	children: React.ReactNode
}

export default function AuthTemplate(props: Props) {
	const { title, children } = props
	return (
		<Card className="mx-auto max-w-sm">
			<CardHeader>
				<CardTitle className="text-2xl">{title}</CardTitle>
			</CardHeader>
			<CardContent>
				{children}
			</CardContent>
			{/* <div className="grid gap-4">
					<div className="grid gap-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="m@example.com"
							required
						/>
					</div>
					<div className="grid gap-2">
						<div className="flex items-center">
							<Label htmlFor="password">Password</Label>
							<Link to="#" className="ml-auto inline-block text-sm underline">
								Forgot your password?
							</Link>
						</div>
						<Input id="password" type="password" required />
					</div>
					<Button type="submit" className="w-full">
						Login
					</Button>
					<Button variant="outline" className="w-full">
						Login with Google
					</Button>
				</div>
				<div className="mt-4 text-center text-sm">
					Don&apos;t have an account?{" "}
					<Link to="#" className="underline">
						Sign up
					</Link>
				</div>
			</CardContent> */}
		</Card>
	)
}
