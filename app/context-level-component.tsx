import { Slide, ToastContainer } from "react-toastify"
import PipProvider from "../src/classes/pip-context"
import SocketProvider from "../src/classes/socket-context"
import SandboxProvider from "../src/classes/sandbox-context"
import WorkbenchProvider from "../src/classes/workbench-context"
import PersonalInfoProvider from "../src/classes/personal-info-context"
import SerialManagerProvider from "../src/classes/serial-manager-context"
import SerialMessageManagerProvider from "../src/classes/serial-message-manager"

export default function ContextLevelComponent ({ children } : { children: React.ReactNode }) {
	return (
		<>
			<PersonalInfoProvider>
				<PipProvider>
					<SocketProvider>
						<SandboxProvider>
							<WorkbenchProvider>
								<SerialManagerProvider>
									<SerialMessageManagerProvider>
										{children}
									</SerialMessageManagerProvider>
								</SerialManagerProvider>
							</WorkbenchProvider>
						</SandboxProvider>
					</SocketProvider>
				</PipProvider>
			</PersonalInfoProvider>
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
				limit={1}
			/>
		</>
	)
}
