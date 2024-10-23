import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { disableReactDevTools } from "@fvilers/disable-react-devtools"
import App from "./App"
import "../src/styles/index.css"

if (process.env.NODE_ENV === "production") disableReactDevTools()

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
)

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode>
)
