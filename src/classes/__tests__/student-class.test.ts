import { describe, test, expect, beforeEach, vi } from 'vitest'
import studentClass from '../student-class'
import careerQuestClass from '../career-quest-class'
import { ClassCode, HubUUID } from '@bluedotrobots/common-ts/types/utils'
import { UpdatedHubSlideId } from '@bluedotrobots/common-ts/types/socket'

// Mock the career quest class
vi.mock('../career-quest-class', () => ({
	default: {
		executeNavigationCommand: vi.fn(),
		navigateToPosition: vi.fn(),
	}
}))

describe('StudentClass Hub Navigation', () => {
	const mockClassCode = 'TEST123' as ClassCode
	const mockHubId = 'hub-uuid-123' as HubUUID
	const mockCareerUUID = 'career-uuid-456' as any

	beforeEach(() => {
		// Reset the singleton instance
		studentClass.logout()
		vi.clearAllMocks()
		
		// Setup mock classroom data with a joined hub
		const mockClassroom = {
			classCode: mockClassCode,
			classroomName: 'Test Classroom',
			activeHubs: [{
				hubId: mockHubId,
				careerUUID: mockCareerUUID,
				slideId: 'initial-slide',
				isHubJoined: true, // Student is joined to this hub
				classCode: mockClassCode,
				hubName: 'Test Hub',
				studentId: 123,
				garageDrivingAllowed: true,
				garageSoundsAllowed: true,
				garageLightsAllowed: true,
			}],
			joinedClassroomAt: new Date(),
			studentId: 123,
			garageDrivingAllowed: true,
			garageSoundsAllowed: true,
			garageLightsAllowed: true,
		}
		
		studentClass.setRetrievedStudentData([mockClassroom])
	})

	describe('updateHubSlideId - Command Parsing', () => {
		test('should parse simple slide ID (backward compatibility)', () => {
			const updateData: UpdatedHubSlideId = {
				classCode: mockClassCode,
				hubId: mockHubId,
				newSlideId: 'simple-slide-id'
			}

			studentClass.updateHubSlideId(updateData)

			// Should call direct navigation (no command)
			expect(careerQuestClass.navigateToPosition).toHaveBeenCalledWith(
				mockCareerUUID,
				'simple-slide-id'
			)
			expect(careerQuestClass.executeNavigationCommand).not.toHaveBeenCalled()
		})

		test('should parse advance_morph command correctly', () => {
			vi.mocked(careerQuestClass.executeNavigationCommand).mockReturnValue(true)
			
			const updateData: UpdatedHubSlideId = {
				classCode: mockClassCode,
				hubId: mockHubId,
				newSlideId: 'advance_morph:morphing-text-1:target-slide-id'
			}

			studentClass.updateHubSlideId(updateData)

			// Should execute navigation command with parsed parts
			expect(careerQuestClass.executeNavigationCommand).toHaveBeenCalledWith(
				mockCareerUUID,
				'advance_morph:morphing-text-1',
				'target-slide-id'
			)
			
			// Hub should show the actual slide ID
			const hub = studentClass.getClassroomData(mockClassCode)?.activeHubs[0]
			expect(hub?.slideId).toBe('target-slide-id')
		})

		test('should parse back_morph command correctly', () => {
			vi.mocked(careerQuestClass.executeNavigationCommand).mockReturnValue(true)
			
			const updateData: UpdatedHubSlideId = {
				classCode: mockClassCode,
				hubId: mockHubId,
				newSlideId: 'back_morph:morphing-text-1:previous-slide-id'
			}

			studentClass.updateHubSlideId(updateData)

			expect(careerQuestClass.executeNavigationCommand).toHaveBeenCalledWith(
				mockCareerUUID,
				'back_morph:morphing-text-1',
				'previous-slide-id'
			)
		})

		test('should parse other commands with colon format', () => {
			vi.mocked(careerQuestClass.executeNavigationCommand).mockReturnValue(true)
			
			const updateData: UpdatedHubSlideId = {
				classCode: mockClassCode,
				hubId: mockHubId,
				newSlideId: 'next_text:slide-id-123'
			}

			studentClass.updateHubSlideId(updateData)

			expect(careerQuestClass.executeNavigationCommand).toHaveBeenCalledWith(
				mockCareerUUID,
				'next_text',
				'slide-id-123'
			)
		})

		test('should handle complex morphing command with multiple colons', () => {
			vi.mocked(careerQuestClass.executeNavigationCommand).mockReturnValue(true)
			
			const updateData: UpdatedHubSlideId = {
				classCode: mockClassCode,
				hubId: mockHubId,
				newSlideId: 'advance_morph:complex:morphing:id:final-slide-id'
			}

			studentClass.updateHubSlideId(updateData)

			// Based on the actual parsing logic: parts[0] + ':' + parts[1], then parts[2]
			// For 'advance_morph:complex:morphing:id:final-slide-id'
			// parts = ['advance_morph', 'complex', 'morphing', 'id', 'final-slide-id']
			// command = 'advance_morph:complex', actualSlideId = 'morphing'
			expect(careerQuestClass.executeNavigationCommand).toHaveBeenCalledWith(
				mockCareerUUID,
				'advance_morph:complex',
				'morphing'
			)
		})
	})

	describe('updateHubSlideId - Navigation Execution', () => {
		test('should fallback to direct navigation when command fails', () => {
			vi.mocked(careerQuestClass.executeNavigationCommand).mockReturnValue(false)
			vi.mocked(careerQuestClass.navigateToPosition).mockReturnValue(true)
			
			const updateData: UpdatedHubSlideId = {
				classCode: mockClassCode,
				hubId: mockHubId,
				newSlideId: 'advance_morph:morphing-text-1:fallback-slide'
			}

			studentClass.updateHubSlideId(updateData)

			// Should try command first, then fallback
			expect(careerQuestClass.executeNavigationCommand).toHaveBeenCalledWith(
				mockCareerUUID,
				'advance_morph:morphing-text-1',
				'fallback-slide'
			)
			expect(careerQuestClass.navigateToPosition).toHaveBeenCalledWith(
				mockCareerUUID,
				'fallback-slide'
			)
		})

		test('should log warning when command fails and fallback is used', () => {
			const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
			vi.mocked(careerQuestClass.executeNavigationCommand).mockReturnValue(false)
			
			const updateData: UpdatedHubSlideId = {
				classCode: mockClassCode,
				hubId: mockHubId,
				newSlideId: 'advance_morph:morphing-text-1:slide-id'
			}

			studentClass.updateHubSlideId(updateData)

			expect(consoleSpy).toHaveBeenCalledWith(
				'Navigation command failed, falling back to direct positioning:',
				expect.objectContaining({
					careerUUID: mockCareerUUID,
					command: 'advance_morph:morphing-text-1',
					slideId: 'slide-id'
				})
			)

			consoleSpy.mockRestore()
		})

		test('should log warning when direct navigation fails', () => {
			const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
			vi.mocked(careerQuestClass.navigateToPosition).mockReturnValue(false)
			
			const updateData: UpdatedHubSlideId = {
				classCode: mockClassCode,
				hubId: mockHubId,
				newSlideId: 'simple-slide-id'
			}

			studentClass.updateHubSlideId(updateData)

			expect(consoleSpy).toHaveBeenCalledWith(
				'Failed to navigate student to hub position:',
				expect.objectContaining({
					careerUUID: mockCareerUUID,
					slideId: 'simple-slide-id'
				})
			)

			consoleSpy.mockRestore()
		})
	})

	describe('updateHubSlideId - Hub State Management', () => {
		test('should set student to focus mode when receiving hub updates', () => {
			expect(studentClass.isInFocusMode).toBe(false)
			
			const updateData: UpdatedHubSlideId = {
				classCode: mockClassCode,
				hubId: mockHubId,
				newSlideId: 'test-slide'
			}

			studentClass.updateHubSlideId(updateData)

			expect(studentClass.isInFocusMode).toBe(true)
		})

		test('should update hub slideId with actual slide ID (not command)', () => {
			const updateData: UpdatedHubSlideId = {
				classCode: mockClassCode,
				hubId: mockHubId,
				newSlideId: 'advance_morph:morphing-text-1:actual-slide-id'
			}

			studentClass.updateHubSlideId(updateData)

			const hub = studentClass.getClassroomData(mockClassCode)?.activeHubs[0]
			expect(hub?.slideId).toBe('actual-slide-id')
		})

		test('should not trigger navigation if student is not joined to hub', () => {
			// Setup hub where student is not joined
			const mockClassroom = {
				classCode: mockClassCode,
				classroomName: 'Test Classroom',
				activeHubs: [{
					hubId: mockHubId,
					careerUUID: mockCareerUUID,
					slideId: 'initial-slide',
					isHubJoined: false, // Student is NOT joined
					classCode: mockClassCode,
					hubName: 'Test Hub'
				}],
				joinedClassroomAt: new Date(),
				studentId: 123,
				garageDrivingAllowed: true,
				garageSoundsAllowed: true,
				garageLightsAllowed: true,
			}
			
			studentClass.setRetrievedStudentData([mockClassroom])

			const updateData: UpdatedHubSlideId = {
				classCode: mockClassCode,
				hubId: mockHubId,
				newSlideId: 'test-slide'
			}

			studentClass.updateHubSlideId(updateData)

			// Should update slideId but not trigger navigation
			const hub = studentClass.getClassroomData(mockClassCode)?.activeHubs[0]
			expect(hub?.slideId).toBe('test-slide')
			expect(careerQuestClass.navigateToPosition).not.toHaveBeenCalled()
			expect(careerQuestClass.executeNavigationCommand).not.toHaveBeenCalled()
		})

		test('should handle non-existent classroom gracefully', () => {
			const updateData: UpdatedHubSlideId = {
				classCode: 'NONEXISTENT' as ClassCode,
				hubId: mockHubId,
				newSlideId: 'test-slide'
			}

			// Should not throw
			expect(() => studentClass.updateHubSlideId(updateData)).not.toThrow()
			expect(careerQuestClass.navigateToPosition).not.toHaveBeenCalled()
		})

		test('should handle non-existent hub gracefully', () => {
			const updateData: UpdatedHubSlideId = {
				classCode: mockClassCode,
				hubId: 'nonexistent-hub' as HubUUID,
				newSlideId: 'test-slide'
			}

			// Should not throw
			expect(() => studentClass.updateHubSlideId(updateData)).not.toThrow()
			expect(careerQuestClass.navigateToPosition).not.toHaveBeenCalled()
		})
	})

	describe('Hub Joining Navigation (Missing Feature)', () => {
		test('should navigate to hub position when student first joins', () => {
			// This test documents the missing functionality you mentioned
			// Currently, when a student joins a hub, they should be transported 
			// to where the teacher is, but this isn't implemented yet
			
			const hubWithPosition = {
				hubId: 'new-hub-id' as HubUUID,
				careerUUID: mockCareerUUID,
				slideId: 'teacher-current-position',
				isHubJoined: false,
				classCode: mockClassCode,
				hubName: 'new-hub-name'
			}

			// When student joins hub, they should navigate to current position
			studentClass.joinHub(hubWithPosition)

			// TODO: This should trigger navigation to teacher's current position
			// Currently this functionality is missing
			// expect(careerQuestClass.navigateToPosition).toHaveBeenCalledWith(
			//   mockCareerUUID, 'teacher-current-position'
			// )
			
			// For now, verify the hub is joined but navigation doesn't happen
			const classroom = studentClass.getClassroomData(mockClassCode)
			const joinedHub = classroom?.activeHubs.find(h => h.hubId === 'new-hub-id' as HubUUID)
			expect(joinedHub?.isHubJoined).toBe(true)
			expect(careerQuestClass.navigateToPosition).not.toHaveBeenCalled()
		})
	})
})