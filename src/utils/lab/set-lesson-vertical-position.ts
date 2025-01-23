export default function setLessonVerticalPosition(verticalPosition: VerticalPosition): string {
	switch (verticalPosition) {
	case 1: return ""          // Base level
	case 2: return "60px"      // +60px from base
	case 3: return "112px"     // +52px
	case 4: return "170px"     // +58px
	case 5: return "225px"     // +55px
	case 6: return "280px"     // +55px
	case 7: return "337px"     // +57px
	case 8: return "395px"     // +58px
	case 9: return "450px"     // +55px
	default: return ""         // Fallback
	}
}
