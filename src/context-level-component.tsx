import { Slide, ToastContainer } from "react-toastify"
import PipProvider from "./contexts/pip-context"
import AuthProvider from "./contexts/auth-context"
import SocketProvider from "./contexts/socket-context"
import AddPipProvider from "./contexts/add-pip-context"
import LabReadingProvider from "./contexts/lab-reading-context"
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
									<LabReadingProvider>
										{children}
									</LabReadingProvider>
								</SocketProvider>
							</BlueDotApiClientProvider>
						</AddPipProvider>
					</PipProvider>
				</PersonalInfoProvider>
			</AuthProvider>
			<ToastContainer
				position="bottom-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick={false}
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				transition={Slide}
				style={{ width: "min(400px, 90vw)" }}
				toastStyle={{ width: "min(400px, 90vw)" }}
			/>
		</>
	)
}
