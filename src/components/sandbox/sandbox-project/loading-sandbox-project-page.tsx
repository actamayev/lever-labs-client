"use client"

import Link from "next/link"
import { observer } from "mobx-react"
import { ArrowLeft, Star, NotebookPen } from "lucide-react"
import ConnectToPipButton from "../../connect-pip/connect-to-pip-button"
import getDuolingoColors from "../../../utils/get-duolingo-colors"
import BlocklyLoadingComponent from "../blockly-loading-component"
import personalInfoClass from "../../../classes/personal-info-class"

function SandboxProjectPage(): React.ReactNode {
	return (
		<div className="flex flex-col h-screen min-h-0">
			{/* Loading Header */}
			<div className="flex items-center justify-between px-4 border-b-2 py-3 border-swan" style={{ height: "74px" }}>
				<div className="flex flex-row items-center justify-center">
					<Link href="/sandbox">
						<button className="flex items-center text-questionText hover:bg-polar p-2 rounded-lg mr-2">
							<ArrowLeft size={30} className="mr-1" />
						</button>
					</Link>
					<div className="bg-swan animate-pulse rounded h-8 w-48 mr-4"></div>
					<button className="p-2 rounded-md opacity-50 cursor-not-allowed">
						<Star size={30} />
					</button>
				</div>
				<div className="flex flex-row items-center justify-center space-x-4">
					<div className="h-12">
						<ConnectToPipButton
							colors={getDuolingoColors("humpback")}
							tactileButtonClasses="h-12 text-lg"
							botIconClasses="!size-6"
						/>
					</div>
					<button className="p-2 rounded-md border-2 text-questionText border-swan opacity-50 cursor-not-allowed">
						<NotebookPen size={30} />
					</button>
				</div>
			</div>

			<div className="flex flex-1 overflow-hidden">
				<div
					className="flex flex-col min-h-0 transition-all duration-300 ease-in-out m-4"
					style={{ width: personalInfoClass.sandboxNotesOpen ? "calc(60% - 1rem)" : "calc(100% - 2rem)" }}
				>
					<div className="min-h-0 flex flex-col h-full">
						{/* Loading Search Bar */}
						<div className="bg-swan animate-pulse rounded-t-3xl h-12 border-2 border-swan"></div>

						{/* Loading Blockly Area */}
						<div className="h-full w-full border-b-2 border-x-2 border-swan rounded-b-3xl bg-polar min-h-0 flex flex-col">
							<BlocklyLoadingComponent />
							<div className="flex gap-3 pt-3 pb-2 px-4">
								<div className="bg-swan animate-pulse rounded-xl h-14 flex-1"></div>
								<div className="bg-swan animate-pulse rounded-xl h-14 w-32"></div>
							</div>
						</div>
					</div>
				</div>

				{/* Loading Side Panel */}
				<div className="flex flex-col h-full transition-all duration-300 ease-in-out border-swan"
					style={{
						width: "0",
						borderLeftWidth: "0",
						opacity: "0",
						padding: "0",
						visibility: "hidden"
					}}>
					{personalInfoClass.sandboxNotesOpen && (
						<div className="bg-swan animate-pulse rounded h-full"></div>
					)}
				</div>
			</div>
		</div>
	)
}

export default observer(SandboxProjectPage)
