import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { disableReactDevTools } from "@fvilers/disable-react-devtools"
import { HelmetProvider } from "react-helmet-async"
import App from "./App"
import "../src/styles/index.css"
import Layout from "./components/layout"
import ContextLevelComponent from "./context-level-component"

if (process.env.NODE_ENV === "production") disableReactDevTools()

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
)

root.render(
	<React.StrictMode>
		<ContextLevelComponent>
			<HelmetProvider>
				<BrowserRouter>
					<Layout>
						<App />
					</Layout>
				</BrowserRouter>
			</HelmetProvider>
		</ContextLevelComponent>
	</React.StrictMode>
)
