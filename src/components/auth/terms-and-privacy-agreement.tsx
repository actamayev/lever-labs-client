"use client"

import Link from "next/link"

export default function TermsAndPrivacyAgreement() {
	return (
		<div className="text-xs font-normal mt-10 text-center text-hare">
			<p>
				By signing in to Blue Dot Robots, you agree to our{" "}
				<Link
					href="/terms"
					className="font-semibold"
				>
					Terms
				</Link>{" "}and{" "}
				<Link
					href="/privacy"
					className="font-semibold"
				>
					Privacy Policy
				</Link>
			</p>
		</div>
	)
}
