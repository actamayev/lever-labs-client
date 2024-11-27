import { useLocation } from "react-router-dom"
import LabSidebar from "./lab-sidebar"
import SandboxSidebar from "./sandbox-sidebar"

export default function SecondarySidebar() {
	const location = useLocation()

	if (location.pathname === "/lab") return <LabSidebar />
	else if (location.pathname === "/sandbox") return <SandboxSidebar />

	return null
}
