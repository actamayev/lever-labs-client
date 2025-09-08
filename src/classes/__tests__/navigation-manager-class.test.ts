import { describe, test, expect, beforeEach } from "vitest"
import { NavigationManagerClass } from "../navigation-manager-class"
import { TEST_CAREER_UUID, mockMainSlides } from "../../../test/fixtures/career-quest-data"

describe("NavigationManagerClass", () => {
	let navigationManager: NavigationManagerClass

	beforeEach(() => {
		navigationManager = new NavigationManagerClass()

		// Initialize navigation for testing
		navigationManager.initializeCareerNavigation(
			TEST_CAREER_UUID,
			mockMainSlides,
			new Map([["text-section-1", 0], ["text-section-2", 0]]), // textChildIndices
			new Map([["morphing-text-1", 0]]), // morphingTextIndices
			new Map([["morphing-text-1", false]]) // morphingAnimationStates
		)
	})

	describe("findPositionIndices", () => {
		test("should find position for first text child", () => {
			const result = navigationManager.findPositionIndices(TEST_CAREER_UUID, "text-child-1")

			expect(result).toEqual({
				mainSlideIndex: 0,
				textChildIndex: 0
			})
		})

		test("should find position for second text child", () => {
			const result = navigationManager.findPositionIndices(TEST_CAREER_UUID, "text-child-2")

			expect(result).toEqual({
				mainSlideIndex: 0,
				textChildIndex: 1
			})
		})

		test("should find position for challenge", () => {
			const result = navigationManager.findPositionIndices(TEST_CAREER_UUID, "test-challenge-uuid")

			expect(result).toEqual({
				mainSlideIndex: 1,
				textChildIndex: 0
			})
		})

		test("should find position for morphing text", () => {
			const result = navigationManager.findPositionIndices(TEST_CAREER_UUID, "morphing-text-1")

			expect(result).toEqual({
				mainSlideIndex: 2,
				textChildIndex: 0
			})
		})

		test("should return null for non-existent position", () => {
			const result = navigationManager.findPositionIndices(TEST_CAREER_UUID, "non-existent-id")

			expect(result).toBeNull()
		})

		test("should return null for non-existent career", () => {
			const result = navigationManager.findPositionIndices("fake-career" as any, "text-child-1")

			expect(result).toBeNull()
		})

		test("should return null for empty position string", () => {
			const result = navigationManager.findPositionIndices(TEST_CAREER_UUID, "")

			expect(result).toBeNull()
		})
	})

	describe("navigation state management", () => {
		test("should initialize with correct default indices", () => {
			const currentMainIndex = navigationManager.getCurrentMainSlideIndex(TEST_CAREER_UUID)
			const currentTextIndex = navigationManager.getCurrentTextChildIndex(TEST_CAREER_UUID, "text-section-1")

			expect(currentMainIndex).toBe(0)
			expect(currentTextIndex).toBe(0)
		})

		test("should update main slide index", () => {
			navigationManager.setCurrentMainSlideIndex(TEST_CAREER_UUID, 2)

			const currentIndex = navigationManager.getCurrentMainSlideIndex(TEST_CAREER_UUID)
			expect(currentIndex).toBe(2)
		})

		test("should update text child index for specific text parent", () => {
			navigationManager.setCurrentTextChildIndex(TEST_CAREER_UUID, "text-section-1", 1)

			const currentIndex = navigationManager.getCurrentTextChildIndex(TEST_CAREER_UUID, "text-section-1")
			expect(currentIndex).toBe(1)
		})

		test("should get navigation indices for current state", () => {
			navigationManager.setCurrentMainSlideIndex(TEST_CAREER_UUID, 0)
			navigationManager.setCurrentTextChildIndex(TEST_CAREER_UUID, "text-section-1", 1)

			const indices = navigationManager.getNavigationIndices(TEST_CAREER_UUID)
			expect(indices).toEqual({
				mainSlideIndex: 0,
				textChildIndex: 1
			})
		})
	})

	describe("restoreNavigationFromSavedPosition", () => {
		test("should restore navigation to saved text child position", () => {
			const success = navigationManager.restoreNavigationFromSavedPosition(TEST_CAREER_UUID, "text-child-2")

			expect(success).toBe(true)
			expect(navigationManager.getCurrentMainSlideIndex(TEST_CAREER_UUID)).toBe(0)
			expect(navigationManager.getCurrentTextChildIndex(TEST_CAREER_UUID, "text-section-1")).toBe(1)
		})

		test("should restore navigation to saved challenge position", () => {
			const success = navigationManager.restoreNavigationFromSavedPosition(TEST_CAREER_UUID, "test-challenge-uuid")

			expect(success).toBe(true)
			expect(navigationManager.getCurrentMainSlideIndex(TEST_CAREER_UUID)).toBe(1)
		})

		test("should restore navigation to saved morphing text position", () => {
			const success = navigationManager.restoreNavigationFromSavedPosition(TEST_CAREER_UUID, "morphing-text-1")

			expect(success).toBe(true)
			expect(navigationManager.getCurrentMainSlideIndex(TEST_CAREER_UUID)).toBe(2)
			expect(navigationManager.getCurrentTextChildIndex(TEST_CAREER_UUID, "text-section-2")).toBe(0)
		})

		test("should fallback to beginning for invalid saved position", () => {
			const success = navigationManager.restoreNavigationFromSavedPosition(TEST_CAREER_UUID, "invalid-position")

			expect(success).toBe(true)
			expect(navigationManager.getCurrentMainSlideIndex(TEST_CAREER_UUID)).toBe(0)
		})

		test("should handle undefined saved position by going to beginning", () => {
			const success = navigationManager.restoreNavigationFromSavedPosition(TEST_CAREER_UUID, undefined)

			expect(success).toBe(true)
			expect(navigationManager.getCurrentMainSlideIndex(TEST_CAREER_UUID)).toBe(0)
		})
	})
})
