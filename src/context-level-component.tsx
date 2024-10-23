import NotificationsProvider from "./contexts/notifications-context"

export default function ContextLevelComponent ({ children } : { children: React.ReactNode }) {
	return (
		<NotificationsProvider>
			{children}
		</NotificationsProvider>
	)
}
