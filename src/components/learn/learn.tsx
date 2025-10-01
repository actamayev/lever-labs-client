"use client"

import { useEffect } from "react"
import { observer } from "mobx-react"
import WorkbenchLayout from "../layouts/workbench-layout"
import retrieveAllLessons from "../../utils/learn/retrieve-all-lessons"

function Learn(): React.ReactNode {
	useEffect((): void => {
		void retrieveAllLessons()
	}, [])

	return (
		<WorkbenchLayout preventElasticScroll={true}>
			Learn
		</WorkbenchLayout>
	)
}

export default observer(Learn)
