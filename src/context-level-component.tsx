import PipProvider from "./contexts/pip-context"
import AuthProvider from "./contexts/auth-context"
import SocketProvider from "./contexts/socket-context"
import AddPipProvider from "./contexts/add-pip-context"
import { Toaster } from "./components/shadcn/ui/toaster"
import PersonalInfoProvider from "./contexts/personal-info-context"
import BlueDotApiClientProvider from "./contexts/blue-dot-api-client-context"

export default function ContextLevelComponent ({ children } : { children: React.ReactNode }) {
	return (
		<>
			<AuthProvider>
				<PersonalInfoProvider>
					<PipProvider>
						<AddPipProvider>
							<BlueDotApiClientProvider>
								<SocketProvider>
									{children}
								</SocketProvider>
							</BlueDotApiClientProvider>
						</AddPipProvider>
					</PipProvider>
				</PersonalInfoProvider>
			</AuthProvider>
			<Toaster />
		</>
	)
}
