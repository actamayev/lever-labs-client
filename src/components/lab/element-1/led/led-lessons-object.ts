const ledLessons: Lesson[] = [
	{
		progress: 0,
		lessonUrl: "/lab/element-1/led/demo",
		lessonName: "LED Demo",
		activityType: "Demo",
		verticalPosition: 5,
		arcDirection: "down"
	},
	{
		progress: 0,
		lessonUrl: "/lab/element-1/led/reading",
		lessonName: "What is an LED?",
		activityType: "Reading",
		verticalPosition: 5,
		arcDirection: "up"
	},
	{
		progress: 0,
		lessonUrl: "/lab/element-1/led/video",
		lessonName: "How LEDs work",
		activityType: "Video",
		verticalPosition: 5
	},
	{
		progress: null,
		lessonUrl: "/lab/element-1/led/video",
		lessonName: "Optional bubble",
		activityType: "Video",
		verticalPosition: 8,
		skipConnection: true
	},
	{
		progress: 0,
		lessonUrl: "/lab/element-1/led/code-1",
		lessonName: "LED Code 1",
		activityType: "Code",
		verticalPosition: 2,
		skipConnection: true
	},
	{
		progress: null,
		lessonUrl: "/lab/element-1/led/code-2",
		lessonName: "LED Code 2",
		activityType: "Code",
		verticalPosition: 5,
		stackWithPrevious: true,
		skipConnection: true
	},
	{
		progress: null,
		lessonUrl: "/lab/element-1/led/code-3",
		lessonName: "LED Code 3",
		activityType: "Code",
		verticalPosition: 8,
		stackWithPrevious: true,
		skipConnection: true
	},
	{
		progress: null,
		lessonUrl: "/lab/element-1/led/summary",
		lessonName: "LED Summary",
		activityType: "Summary",
		verticalPosition: 5
	},
]

export default ledLessons
