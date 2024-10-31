import PipProvider from "./contexts/pip-context"
import AuthProvider from "./contexts/auth-context"
import PersonalInfoProvider from "./contexts/personal-info-context"
import NotificationsProvider from "./contexts/notifications-context"
import BlueDotApiClientProvider from "./contexts/blue-dot-api-client-context"

export default function ContextLevelComponent ({ children } : { children: React.ReactNode }) {
	return (
		<AuthProvider>
			<NotificationsProvider>
				<PersonalInfoProvider>
					<PipProvider>
						<BlueDotApiClientProvider>
							{children}
						</BlueDotApiClientProvider>
					</PipProvider>
				</PersonalInfoProvider>
			</NotificationsProvider>
		</AuthProvider>
	)
}
