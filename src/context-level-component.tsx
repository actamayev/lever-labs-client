import PipProvider from "./contexts/pip-context"
import AuthProvider from "./contexts/auth-context"
import SocketProvider from "./contexts/socket-context"
import PersonalInfoProvider from "./contexts/personal-info-context"
import BlueDotApiClientProvider from "./contexts/blue-dot-api-client-context"
import { Toaster } from "./components/shadcn/ui/toaster"

export default function ContextLevelComponent ({ children } : { children: React.ReactNode }) {
	return (
		<>
			<AuthProvider>
				<PersonalInfoProvider>
					<PipProvider>
						<BlueDotApiClientProvider>
							<SocketProvider>
								{children}
							</SocketProvider>
						</BlueDotApiClientProvider>
					</PipProvider>
				</PersonalInfoProvider>
			</AuthProvider>
			<Toaster />
		</>
	)
}
