"use client"

export default function setLessonVerticalPosition(verticalPosition: VerticalPosition): string {
	return `${(verticalPosition - 1) * 60}px`
}
