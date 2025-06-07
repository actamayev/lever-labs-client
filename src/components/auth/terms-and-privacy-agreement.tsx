import Link from "next/link"

export default function TermsAndPrivacyAgreement() {
	return (
		<div className="text-xs font-light mt-10 text-center text-wolf">
			<p>
				By signing into Blue Dot Robots, you agree to our{" "}
				<Link
					href="/terms"
					className="font-medium"
				>
					Terms
				</Link>{" "}and{" "}
				<Link
					href="/privacy"
					className="font-medium"
				>
					Privacy Policy
				</Link>
			</p>
		</div>
	)
}
