"use client"

import { useEffect } from "react"
import { observer } from "mobx-react"
import WorkbenchLayout from "../layouts/workbench-layout"
import LessonList from "./lesson-list"
import retrieveAllLessons from "../../utils/learn/retrieve-all-lessons"
import authClass from "../../classes/auth-class"

function Learn(): React.ReactNode {
	useEffect((): void => {
		void retrieveAllLessons()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [authClass.isFinishedWithSignup])

	return (
		<WorkbenchLayout preventElasticScroll={true} extraChildrenClasses="p-10">
			<div className="container mx-auto">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
						Learn
					</h1>
					<p className="text-gray-600 dark:text-gray-400">
						Choose a lesson to get started
					</p>
				</div>
				<LessonList />
			</div>
		</WorkbenchLayout>
	)
}

export default observer(Learn)
