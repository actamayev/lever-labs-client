export default function setLessonVerticalPosition(verticalPosition: VerticalPosition): string {
	switch (verticalPosition) {
	case 1: return "0px"
	case 2: return "60px"
	case 3: return "120px"
	case 4: return "180px"
	case 5: return "240px"
	case 6: return "300px"
	case 7: return "360px"
	case 8: return "420px"
	case 9: return "480px"
	default: return "0px"
	}
}
