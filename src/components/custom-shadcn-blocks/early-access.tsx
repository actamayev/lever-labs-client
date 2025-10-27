import { cn } from "@/lib/shadcn/utils"
import { Card, CardContent } from "@/components/ui/card"
import {
	Field,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import LandingContainer from "../landing/landing-container"
import { CalendarIcon, CircleIcon, MailIcon } from "lucide-react"
import { Badge } from "../ui/badge"

export default function EarlyAccessForm({
	className,
	...props
}: React.ComponentProps<"div">): React.ReactNode {
	return (
		<section className="bg-polar">
			<LandingContainer>
				<div className={cn("flex flex-col gap-6", className)} {...props}>
					<Card className="overflow-hidden p-0">
						<CardContent className="grid p-0 md:grid-cols-2">
							<form className="p-6 md:p-8">
								<FieldGroup>
									<div className="flex flex-col items-start gap-2">
										<div className="flex items-center gap-2">
											<MailIcon className="size-6" />
											<h1 className="text-2xl font-bold">Get early access</h1>
										</div>
										<Badge variant="outline">
											<span className="relative flex h-3 w-3 mr-2">
												<span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-lime-500 opacity-75"></span>
												<span className="relative inline-flex rounded-full h-3 w-3 bg-lime-500"></span>
											</span>
											AVAILABLE IN EARLY 2026
										</Badge>
										<p className="text-muted-foreground text-balance">
											Be amongst the first to experience Pip. Sign up to be notified when Pip becomes available!
										</p>
									</div>
									<Field>
										<FieldLabel htmlFor="email">Email</FieldLabel>
										<Input
											id="email"
											type="email"
											placeholder="m@example.com"
											required
										/>
									</Field>
								</FieldGroup>
							</form>
							<div className="bg-muted relative hidden md:block">
								<img
									src="/placeholder.svg"
									alt="Image"
									className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
								/>
							</div>
						</CardContent>
					</Card>
				</div>
			</LandingContainer>
		</section>
	)
}
