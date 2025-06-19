/* eslint-disable max-len */
"use client"

import { observer } from "mobx-react"
import { lazy, Suspense } from "react"
import BlocklyLoadingComponent from "../sandbox/blockly-loading-component"

const ViewOnlySandbox = lazy(() => import("../../components/sandbox/view-only-sandbox/view-only-sandbox"))

function LineFollowing() {
	return (
		<Suspense fallback={<BlocklyLoadingComponent extraClasses="h-[90%]" />}>
			<ViewOnlySandbox
				extraClasses="h-[90%]"
				initialXml={"<xml xmlns=\"https://developers.google.com/blockly/xml\"><block type=\"esp32_led_control\" id=\"e%1$}gM7j9i-s/*1J,Tj\" x=\"-430\" y=\"-310\"><field name=\"esp32_led_control\">WHITE</field></block></xml>"}
			/>
		</Suspense>
	)
}

export default observer(LineFollowing)
