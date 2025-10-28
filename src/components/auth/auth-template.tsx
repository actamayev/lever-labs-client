"use client"

import Image from "next/image"
import Link from "next/link"
import TermsAndPrivacyAgreement from "./terms-and-privacy-agreement"

export default function AuthTemplate({ children }: { children: React.ReactNode }): React.ReactNode {
	return (
		<div className="grid min-h-svh lg:grid-cols-2">
			<div className="flex flex-col gap-4 p-6 md:p-10">
				<div className="flex justify-center gap-2 md:justify-start">
					<Link href="/" className="flex items-center gap-2 font-medium">
						<div className="flex size-8 items-center justify-center rounded-md">
							<Image src="/favicon.svg" alt="Lever Labs" width={40} height={40} />
						</div>
						<span className="text-2xl font-bold">Lever Labs</span>
					</Link>
				</div>
				<div className="flex flex-1 items-center justify-center">
					<div className="w-full max-w-sm md:max-w-md">
						{ children }
						<TermsAndPrivacyAgreement />
					</div>
				</div>
			</div>
			<div className="relative hidden bg-muted lg:block">
				<Image
					src="/favicon.svg"
					alt="Image"
					className="absolute inset-0 h-full w-full object-cover"
					fill
					priority
				/>
			</div>
		</div>
	)
}
