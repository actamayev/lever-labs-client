/* eslint-disable max-len */
"use client"

import { Suspense, useState } from "react"
import BlocklyLoadingComponent from "../../sandbox/blockly-loading-component"
import { cn } from "@/lib/shadcn/utils"
import SimpleSandbox from "../simple-sandbox/simple-sandbox"

export default function CQIntroduction() {
	// Start with empty blockly and code
	const [blocklyJson] = useState({})
	const [cppCode] = useState("")

	return (
		<div className="w-full min-h-screen p-4">
			{/* Introduction Text */}
			<div className="w-1/2 mx-auto mb-8 text-center">
				<div className="space-y-4">
					<p>Hi! I'm Pip!</p>
					<p>As you're helping me through careers, you'll be writing code that I'm going to follow.</p>
					<p>You can think of code as a recipe, except instead of making a yummy dish, the recipe you write is going to help me complete various challenges.</p>
					<p>You're going to be writing a set of instructions for me to follow. Let's try it out:</p>
					<p className="font-semibold">-----Please Connect Pip to get started-----</p>
				</div>
			</div>

			{/* Main Content Area - Centered with 1/4 margins */}
			<div className="w-1/2 mx-auto h-[600px]">
				<div className="flex gap-4 h-full">
					{/* SimpleSandbox - Left Half */}
					<div className="flex-1 flex flex-col">
						<Suspense fallback={<BlocklyLoadingComponent extraClasses="h-full" />}>
							<SimpleSandbox
								blocklyJson={blocklyJson}
								cppCode={cppCode}
							/>
						</Suspense>
					</div>

					{/* Code Display - Right Half */}
					<div className="flex-1 flex flex-col">
						<div className="flex-1 border-2 border-swan rounded-lg overflow-hidden">
							<div className="h-full flex flex-col">
								{/* Header */}
								<div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 border-b border-swan">
									<h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
										Generated C++ Code
									</h3>
								</div>

								{/* Code Content */}
								<div className="flex-1 overflow-auto">
									<pre className={cn(
										"h-full w-full p-4 text-sm font-mono",
										"bg-white dark:bg-gray-900",
										"text-gray-800 dark:text-gray-200",
										"whitespace-pre-wrap break-words",
										"resize-none outline-none"
									)}>
										{cppCode || "// Your generated C++ code will appear here..."}
									</pre>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
