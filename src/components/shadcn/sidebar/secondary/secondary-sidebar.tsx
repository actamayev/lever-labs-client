import { useLocation } from "react-router"
import LabSidebar from "./lab/lab-sidebar"
import SandboxSidebar from "./sandbox/sandbox-sidebar"

export default function SecondarySidebar() {
	const location = useLocation()

	if (location.pathname.startsWith("/lab")) return <LabSidebar />
	else if (location.pathname.startsWith("/sandbox")) return <SandboxSidebar />

	return null
}
