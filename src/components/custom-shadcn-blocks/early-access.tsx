import { cn } from "@/lib/shadcn/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import LandingContainer from "../landing/landing-container"
import { MailIcon } from "lucide-react"


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
										<div className="flex items-center gap-2 border border-swan rounded-full px-2 py-1 text-sm">
											AVAILABLE IN EARLY 2026
										</div>
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
