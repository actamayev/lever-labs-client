import { useLocation } from "react-router"
import SandboxSidebar from "./sandbox/sandbox-sidebar"

export default function SecondarySidebar() {
	const location = useLocation()
	if (location.pathname.startsWith("/sandbox")) return <SandboxSidebar />

	return null
}
