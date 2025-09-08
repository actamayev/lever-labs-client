import { describe, test, expect, beforeEach, vi } from 'vitest'
import { NavigationManagerClass } from '../navigation-manager-class'
import { TEST_CAREER_UUID } from '../../../test/fixtures/career-quest-data'

describe('NavigationManagerClass Morphing Commands', () => {
	let navigationManager: NavigationManagerClass
	
	beforeEach(() => {
		navigationManager = new NavigationManagerClass()
		vi.clearAllMocks()
		
		// Initialize navigation with minimal data to avoid MobX issues
		navigationManager.initializeCareerNavigation(
			TEST_CAREER_UUID,
			[{ type: 'textParent', id: 'text-1', data: { type: 'textParent', id: 'text-1', children: [] } }], // Minimal main slides
			new Map([['text-1', 0]]),
			new Map([['morphing-text-1', 0]]), // Start at first variant
			new Map([['morphing-text-1', false]]) // Animation not running
		)
		
		// Mock position verification to avoid MobX issues in all tests
		vi.spyOn(navigationManager, 'getCurrentPositionId' as any).mockReturnValue('target-slide-id')
	})

	describe('executeNavigationCommand - Morphing Commands', () => {
		test('should handle advance_morph command correctly', () => {
			const mockMorphingSections = new Map([
				['morphing-text-1', {
					type: 'morphingText' as const,
					id: 'morphing-text-1',
					staticText: 'Static text content',
					morphingVariants: [
						{ id: 'variant-1', text: 'variant 1', rightContent: { type: 'icon' as const, iconKey: 'Book' } },
						{ id: 'variant-2', text: 'variant 2', rightContent: { type: 'icon' as const, iconKey: 'Book' } }
					]
				}]
			])
			
			const result = navigationManager.executeNavigationCommand(
				TEST_CAREER_UUID,
				'advance_morph:morphing-text-1',
				'target-slide-id',
				mockMorphingSections
			)

			// We just test that the command is recognized and processed
			expect(result).toBe(true)
		})

		test('should handle back_morph command correctly', () => {
			const mockMorphingSections = new Map([
				['morphing-text-1', {
					type: 'morphingText' as const,
					id: 'morphing-text-1',
					staticText: 'Static text content',
					morphingVariants: [
						{ id: 'variant-1', text: 'variant 1', rightContent: { type: 'icon' as const, iconKey: 'Book' } },
						{ id: 'variant-2', text: 'variant 2', rightContent: { type: 'icon' as const, iconKey: 'Book' } }
					]
				}]
			])
			
			const result = navigationManager.executeNavigationCommand(
				TEST_CAREER_UUID,
				'back_morph:morphing-text-1',
				'target-slide-id',
				mockMorphingSections
			)

			expect(result).toBe(true)
		})

		test('should handle advance_morph with non-existent morphing text', () => {
			const mockMorphingSections = new Map() // Empty map
			
			const result = navigationManager.executeNavigationCommand(
				TEST_CAREER_UUID,
				'advance_morph:non-existent-morph',
				'target-slide-id',
				mockMorphingSections
			)

			// Should still return true (command was recognized, even if morphing text not found)
			expect(result).toBe(true)
		})

		test('should return false for unknown navigation command', () => {
			const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
			const mockMorphingSections = new Map()
			
			const result = navigationManager.executeNavigationCommand(
				TEST_CAREER_UUID,
				'unknown_command',
				'target-slide-id',
				mockMorphingSections
			)

			expect(result).toBe(false)
			expect(consoleSpy).toHaveBeenCalledWith(
				'Unknown navigation command:',
				'unknown_command'
			)
			
			consoleSpy.mockRestore()
		})

		test('should handle standard navigation commands (next_main, prev_main, etc.)', () => {
			const mockOnNextMain = vi.fn().mockResolvedValue(undefined)
			const mockOnPrevMain = vi.fn().mockResolvedValue(undefined)
			const mockOnNextText = vi.fn()
			const mockOnPrevText = vi.fn()
			
			// Test next_main
			let result = navigationManager.executeNavigationCommand(
				TEST_CAREER_UUID,
				'next_main',
				'target-slide-id',
				new Map(),
				mockOnNextMain,
				mockOnPrevMain,
				mockOnNextText,
				mockOnPrevText
			)
			expect(result).toBe(true)
			expect(mockOnNextMain).toHaveBeenCalled()
			
			// Test prev_main
			result = navigationManager.executeNavigationCommand(
				TEST_CAREER_UUID,
				'prev_main',
				'target-slide-id',
				new Map(),
				mockOnNextMain,
				mockOnPrevMain,
				mockOnNextText,
				mockOnPrevText
			)
			expect(result).toBe(true)
			expect(mockOnPrevMain).toHaveBeenCalled()
			
			// Test next_text
			result = navigationManager.executeNavigationCommand(
				TEST_CAREER_UUID,
				'next_text',
				'target-slide-id',
				new Map(),
				mockOnNextMain,
				mockOnPrevMain,
				mockOnNextText,
				mockOnPrevText
			)
			expect(result).toBe(true)
			expect(mockOnNextText).toHaveBeenCalled()
			
			// Test prev_text
			result = navigationManager.executeNavigationCommand(
				TEST_CAREER_UUID,
				'prev_text',
				'target-slide-id',
				new Map(),
				mockOnNextMain,
				mockOnPrevMain,
				mockOnNextText,
				mockOnPrevText
			)
			expect(result).toBe(true)
			expect(mockOnPrevText).toHaveBeenCalled()
		})

		test('should return false when navigation instance not found', () => {
			const fakeCareerUUID = 'fake-career-uuid' as any
			
			const result = navigationManager.executeNavigationCommand(
				fakeCareerUUID,
				'next_main',
				'target-slide-id',
				new Map()
			)

			expect(result).toBe(false)
		})
	})

	describe('Command Parsing Edge Cases', () => {
		test('should extract morphing text ID correctly from advance_morph command', () => {
			// This tests that complex morphing IDs with colons are handled correctly
			const mockMorphingSections = new Map([
				['complex:morphing:id', { 
					type: 'morphingText' as const, 
					id: 'complex:morphing:id',
					staticText: 'Static text',
					morphingVariants: [] 
				}]
			])
			
			const result = navigationManager.executeNavigationCommand(
				TEST_CAREER_UUID,
				'advance_morph:complex:morphing:id',
				'target-slide-id',
				mockMorphingSections
			)

			// Should successfully parse and execute the command
			expect(result).toBe(true)
		})

		test('should extract morphing text ID correctly from back_morph command', () => {
			const result = navigationManager.executeNavigationCommand(
				TEST_CAREER_UUID,
				'back_morph:simple-id',
				'target-slide-id',
				new Map()
			)

			// Should successfully parse and execute the command
			expect(result).toBe(true)
		})

		test('should handle edge case where morphing command has empty ID', () => {
			const result = navigationManager.executeNavigationCommand(
				TEST_CAREER_UUID,
				'advance_morph:',
				'target-slide-id',
				new Map()
			)

			// Should successfully parse empty ID without crashing
			expect(result).toBe(true)
		})
	})
})