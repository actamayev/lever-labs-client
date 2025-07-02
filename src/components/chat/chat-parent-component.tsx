export default function ChatParentComponent({ children } : { children: React.ReactNode }) {
	return (
		<div className="flex flex-col h-full max-h-full bg-standardBackground rounded-lg border-2 border-swan overflow-hidden">
			{children}
		</div>
	)
}
