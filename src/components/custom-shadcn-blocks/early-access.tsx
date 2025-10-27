/* eslint-disable max-len */
"use client"

import { cn } from "@/lib/shadcn/utils"
import { Card, CardContent } from "@/components/ui/card"
import {
	Field,
	FieldGroup,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import LandingContainer from "../landing/landing-container"
import { Badge } from "../ui/badge"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback, useMemo, useState } from "react"
import { EmailUpdatesRequest } from "@lever-labs/common-ts/types/api"
import isEmailValid from "../../utils/auth/is-email-valid"
import { emailUpdatesSchema } from "../../utils/auth/auth-schemas"
import subscribeForUpdates from "../../utils/subscribe-for-updates"
import { Form, FormControl, FormField, FormItem } from "../ui/form"

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/ui/avatar"
import Image from "next/image"

// eslint-disable-next-line max-lines-per-function
export default function EarlyAccessForm({
	className,
	...props
}: React.ComponentProps<"div">): React.ReactNode {
	const [isLoading, setIsLoading] = useState(false)

	const onSubmit = useCallback(async (values: EmailUpdatesRequest): Promise<void> => {
		if (isLoading) return
		await subscribeForUpdates(values, setIsLoading)
	}, [isLoading])

	const form = useForm<EmailUpdatesRequest>({
		resolver: zodResolver(emailUpdatesSchema),
		defaultValues: {
			email: ""
		}
	})

	const formValues = form.watch()
	const isEmailValidMemo = useMemo((): boolean => {
		return isEmailValid(formValues.email) === "Email"
	}, [formValues.email])

	return (
		<section className="bg-polar pb-16 md:pb-24" data-section="early-access">
			<LandingContainer>
				<div className={cn("flex flex-col gap-6", className)} {...props}>
					<Card className="overflow-hidden p-0">
						<CardContent className="grid p-0 md:grid-cols-2">
							<div>
								<Form {...form}>
									<form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
										<FieldGroup>
											<div className="flex flex-col items-start gap-2">
												<div className="flex items-center gap-2">
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
												<FormField
													control={form.control}
													name="email"
													render={({ field }): React.ReactElement => (
														<FormItem>
															<FormControl>
																<div className="relative">
																	<Input
																		type="email"
																		placeholder="Email"
																		required
																		className="h-12 rounded-xl text-xl! font-light border-2 bg-polar shadow-none border-swan pr-32"
																		{...field}
																	/>
																	<Button
																		type="submit"
																		disabled={!isEmailValidMemo || isLoading}
																		className="absolute right-1 top-1 h-10 px-6 rounded-lg text-sm font-medium bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
																	>
																		{isLoading ? "Joining..." : "Join Waitlist"}
																	</Button>
																</div>
															</FormControl>
														</FormItem>
													)}
												/>
											</Field>
										</FieldGroup>
										<div className="flex flex-row flex-wrap items-center mt-3 gap-4">
											<div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
												<Avatar>
													<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
													<AvatarFallback>CN</AvatarFallback>
												</Avatar>
												<Avatar>
													<AvatarImage
														src="https://github.com/maxleiter.png"
														alt="@maxleiter"
													/>
													<AvatarFallback>LR</AvatarFallback>
												</Avatar>
												<Avatar>
													<AvatarImage
														src="https://github.com/evilrabbit.png"
														alt="@evilrabbit"
													/>
													<AvatarFallback>ER</AvatarFallback>
												</Avatar>
											</div>
											<span className="text-sm text-balance text-muted-foreground">
												Join 1,100+ others on the waitlist
											</span>
										</div>
									</form>
								</Form>
							</div>
							<div className="bg-muted relative hidden md:block">
								<Image
									src="/images/career-quest/meet-pip/s1_p1.png"
									alt="Image"
									className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
									width={500}
									height={400}
								/>
							</div>
						</CardContent>
					</Card>
				</div>
			</LandingContainer>
		</section>
	)
}
