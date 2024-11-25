import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { disableReactDevTools } from "@fvilers/disable-react-devtools"
import { HelmetProvider } from "react-helmet-async"
import "./index.css"
import App from "./App"
import Layout from "./components/layout"
import ContextLevelComponent from "./context-level-component"

if (process.env.NODE_ENV === "production") disableReactDevTools()

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
)

root.render(
	<React.StrictMode>
		<GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}>
			<ContextLevelComponent>
				<HelmetProvider>
					<BrowserRouter>
						{/* <Layout> */}
						<App />
						{/* </Layout> */}
					</BrowserRouter>
				</HelmetProvider>
			</ContextLevelComponent>
		</GoogleOAuthProvider>
	</React.StrictMode>
)
