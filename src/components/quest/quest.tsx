"use client"

import { useEffect } from "react"
import { observer } from "mobx-react"
import WorkbenchLayout from "../layouts/workbench-layout"
import LessonList from "./lesson-list"
import retrieveAllLessons from "../../utils/quest/retrieve-all-lessons"
import authClass from "../../classes/auth-class"

function Quest(): React.ReactNode {
	useEffect((): void => {
		void retrieveAllLessons()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [authClass.isFinishedWithSignup])

	return (
		<WorkbenchLayout preventElasticScroll={true} extraChildrenClasses="p-10">
			<div className="container mx-auto">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
						Quest
					</h1>
				</div>
				<LessonList />
			</div>
		</WorkbenchLayout>
	)
}

export default observer(Quest)
