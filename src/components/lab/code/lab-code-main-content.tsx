"use client"

import * as Blockly from "blockly"
import isEmpty from "lodash-es/isEmpty"
import { Check, Upload } from "lucide-react"
import { lazy, Suspense, useState } from "react"
import { BlueTactileButton } from "../../buttons/tactile-buttons"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../shadcn/ui/card"

interface Props {
	codingTitle: string
	codingDescription: string
	toolboxConfig: Blockly.utils.toolbox.ToolboxDefinition
}

const BlocklyComponent = lazy(() => import("../../blockly-component"))

export default function LabCodeMainContent(props: Props) {
	const {
		codingTitle,
		codingDescription,
		toolboxConfig
	} = props
	const [cppCode, setCppCode] = useState("")

	return (
		<main className="flex h-full min-h-0">
			<Card className="w-2/5 m-4 overflow-auto bg-inherit">
				<CardHeader>
					<CardTitle>
						<h1 className="text-4xl font-bold mb-6">{codingTitle}</h1>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<CardDescription className="text-xl font-medium">
						{codingDescription}
					</CardDescription>
				</CardContent>
			</Card>

			<div className="w-3/5 flex flex-col m-4 min-h-0">
				<div className="flex-1 min-h-0">
					<Suspense>
						<BlocklyComponent
							toolboxConfig={toolboxConfig}
							setCppCode={setCppCode}
							extraClasses="h-full"
						/>
					</Suspense>
				</div>

				<div className="flex justify-between mt-4">
					<BlueTactileButton disabled={isEmpty(cppCode)}>
						<Check />
                        CHECK
					</BlueTactileButton>
					<BlueTactileButton disabled={isEmpty(cppCode)}>
						<Upload />
                        SEND TO PIP
					</BlueTactileButton>
				</div>
			</div>
		</main>
	)
}
