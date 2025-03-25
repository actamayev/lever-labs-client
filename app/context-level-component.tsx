import { Slide, ToastContainer } from "react-toastify"
import PipProvider from "../src/contexts/pip-context"
import AuthProvider from "../src/contexts/auth-context"
import SocketProvider from "../src/contexts/socket-context"
import AddPipProvider from "../src/contexts/add-pip-context"
import LabDemoProvider from "../src/contexts/lab-demo-context"
import WorkbenchProvider from "../src/contexts/workbench-context"
import LabReadingProvider from "../src/contexts/lab-reading-context"
import PersonalInfoProvider from "../src/contexts/personal-info-context"
import PageTransitionProvider from "../src/contexts/page-transition-context"
import ActivityProgressProvider from "../src/contexts/activity-progress-context"
import BlueDotApiClientProvider from "../src/contexts/blue-dot-api-client-context"

export default function ContextLevelComponent ({ children } : { children: React.ReactNode }) {
	return (
		<>
			<PageTransitionProvider>
				<AuthProvider>
					<PersonalInfoProvider>
						<PipProvider>
							<AddPipProvider>
								<BlueDotApiClientProvider>
									<SocketProvider>
										<LabReadingProvider>
											<ActivityProgressProvider>
												<LabDemoProvider>
													<WorkbenchProvider>
														{children}
													</WorkbenchProvider>
												</LabDemoProvider>
											</ActivityProgressProvider>
										</LabReadingProvider>
									</SocketProvider>
								</BlueDotApiClientProvider>
							</AddPipProvider>
						</PipProvider>
					</PersonalInfoProvider>
				</AuthProvider>
			</PageTransitionProvider>
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
