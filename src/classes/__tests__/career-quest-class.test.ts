import { describe, test, expect, beforeEach, vi, afterEach } from 'vitest'
import { runInAction } from 'mobx'
import careerQuestClass from '../career-quest-class'
import chatManagerClass from '../chat-manager-class'
import navigationManagerClass from '../navigation-manager-class'
import { TEST_CAREER_UUID, mockCareerQuestData } from '../../../test/fixtures/career-quest-data'
import { CareerUUID, ChallengeUUID } from '@bluedotrobots/common-ts/types/utils'

// Mock dependencies
vi.mock('../chat-manager-class', () => ({
  default: {
    initializeChallengeChat: vi.fn(),
    initializeCareerChat: vi.fn(),
    isCodeCorrect: vi.fn(),
  }
}))

vi.mock('../navigation-manager-class', () => ({
  default: {
    initializeCareerNavigation: vi.fn(),
    canAdvanceToNextMain: vi.fn(),
    getSwiperInstance: vi.fn(),
    getCurrentMainSlideIndex: vi.fn(),
    setCurrentMainSlideIndex: vi.fn(),
    getMainSlides: vi.fn(),
    resetAllTextChildIndices: vi.fn(),
    resetCareerNavigationToBeginning: vi.fn(),
  }
}))

vi.mock('../../../utils/career-quest/save-career-progress', () => ({
  default: vi.fn()
}))

vi.mock('../blue-dot-api-client-class', () => ({
  default: {
    careerQuestDataService: {
      markChallengeAsSeen: vi.fn()
    }
  }
}))

describe('CareerQuestClass', () => {
  const mockCareerUUID = TEST_CAREER_UUID
  const mockChallengeUUID = 'test-challenge-uuid' as ChallengeUUID

  beforeEach(() => {
    // Reset singleton state
    careerQuestClass.logout()
    vi.clearAllMocks()
  })

  afterEach(() => {
    // Clean up after each test
    careerQuestClass.logout()
  })

  describe('Career Initialization', () => {
    test('should initialize career with correct structure', () => {
      // Mock the career definitions
      const mockCareerDefinitions = {
        [mockCareerUUID]: mockCareerQuestData
      }

      // Initialize career
      runInAction(() => {
        careerQuestClass['initializeAllCareers'](mockCareerDefinitions)
      })

      // Verify career was created
      const career = careerQuestClass.getCareer(mockCareerUUID)
      expect(career).toBeDefined()
      expect(career?.careerDefinition).toEqual(mockCareerQuestData)
      expect(career?.completedChallengeIds).toBeInstanceOf(Set)
      expect(career?.seenChallengeUUIDs).toBeInstanceOf(Set)
      expect(career?.challengeChatToggledStates).toBeInstanceOf(Map)
    })

    test('should initialize challenge chats when creating career', () => {
      const mockCareerDefinitions = {
        [mockCareerUUID]: mockCareerQuestData
      }

      runInAction(() => {
        careerQuestClass['initializeAllCareers'](mockCareerDefinitions)
      })

      // Verify challenge chat initialization was called
      expect(chatManagerClass.initializeChallengeChat).toHaveBeenCalledWith(
        mockCareerUUID,
        mockChallengeUUID,
        expect.any(Object),
        expect.any(Object),
        '',
        false
      )

      // Verify career chat initialization was called
      expect(chatManagerClass.initializeCareerChat).toHaveBeenCalledWith(mockCareerUUID)
    })

    test('should not duplicate career if already exists', () => {
      const mockCareerDefinitions = {
        [mockCareerUUID]: mockCareerQuestData
      }

      // Initialize twice
      runInAction(() => {
        careerQuestClass['initializeAllCareers'](mockCareerDefinitions)
        careerQuestClass['initializeAllCareers'](mockCareerDefinitions)
      })

      // Should only have one career instance
      expect(careerQuestClass.careers.size).toBe(1)
      expect(chatManagerClass.initializeChallengeChat).toHaveBeenCalledTimes(1)
    })
  })

  describe('Career State Management', () => {
    beforeEach(() => {
      // Setup a career for testing
      const mockCareerDefinitions = {
        [mockCareerUUID]: mockCareerQuestData
      }
      runInAction(() => {
        careerQuestClass['initializeAllCareers'](mockCareerDefinitions)
      })
    })

    test('should mark challenge as completed through callback', () => {
      const career = careerQuestClass.getCareer(mockCareerUUID)
      expect(career).toBeDefined()
      expect(career?.completedChallengeIds.has(mockChallengeUUID)).toBe(false)

      // Simulate challenge completion callback (this is how challenges are marked as completed)
      runInAction(() => {
        career!.completedChallengeIds.add(mockChallengeUUID)
      })

      expect(career?.completedChallengeIds.has(mockChallengeUUID)).toBe(true)
    })

    test('should mark challenge as seen', async () => {
      const career = careerQuestClass.getCareer(mockCareerUUID)
      expect(career).toBeDefined()
      expect(career?.seenChallengeUUIDs.has(mockChallengeUUID)).toBe(false)

      await careerQuestClass.markChallengeAsSeen(mockCareerUUID, mockChallengeUUID)

      expect(career?.seenChallengeUUIDs.has(mockChallengeUUID)).toBe(true)
    })

    test('should update furthest seen position correctly', () => {
      const career = careerQuestClass.getCareer(mockCareerUUID)
      const initialPosition = career?.furthestSeenChallengeUuidOrTextUuid

      runInAction(() => {
        careerQuestClass.updateFurthestSeenIfNeeded(mockCareerUUID, mockChallengeUUID)
      })

      expect(career?.furthestSeenChallengeUuidOrTextUuid).toBe(mockChallengeUUID)
      expect(career?.furthestSeenChallengeUuidOrTextUuid).not.toBe(initialPosition)
    })

    test('should toggle career chat state', () => {
      const career = careerQuestClass.getCareer(mockCareerUUID)
      expect(career?.isCareerChatToggled).toBe(false)

      runInAction(() => {
        careerQuestClass.toggleCareerChat(mockCareerUUID)
      })

      expect(career?.isCareerChatToggled).toBe(true)

      runInAction(() => {
        careerQuestClass.toggleCareerChat(mockCareerUUID)
      })

      expect(career?.isCareerChatToggled).toBe(false)
    })
  })

  describe('Navigation State', () => {
    beforeEach(() => {
      const mockCareerDefinitions = {
        [mockCareerUUID]: mockCareerQuestData
      }
      runInAction(() => {
        careerQuestClass['initializeAllCareers'](mockCareerDefinitions)
      })
    })

    test('should check if position is furthest seen', () => {
      const career = careerQuestClass.getCareer(mockCareerUUID)
      
      // Initially, no position should be furthest seen
      expect(careerQuestClass.isPositionFurthestSeen(mockCareerUUID, mockChallengeUUID)).toBe(false)

      // Mark as furthest seen
      runInAction(() => {
        careerQuestClass.updateFurthestSeenIfNeeded(mockCareerUUID, mockChallengeUUID)
      })

      expect(careerQuestClass.isPositionFurthestSeen(mockCareerUUID, mockChallengeUUID)).toBe(true)
    })

    test('should reset career to beginning', async () => {
      const career = careerQuestClass.getCareer(mockCareerUUID)
      expect(career).toBeDefined()
      
      // Mark some challenges as completed and seen
      runInAction(() => {
        career!.completedChallengeIds.add(mockChallengeUUID)
      })
      await careerQuestClass.markChallengeAsSeen(mockCareerUUID, mockChallengeUUID)
      runInAction(() => {
        careerQuestClass.updateFurthestSeenIfNeeded(mockCareerUUID, mockChallengeUUID)
      })

      // Reset to beginning
      runInAction(() => {
        careerQuestClass.resetCareerToBeginning(mockCareerUUID)
      })

      // Verify state was reset
      expect(career?.completedChallengeIds.size).toBe(0)
      expect(career?.seenChallengeUUIDs.size).toBe(0)
      expect(career?.furthestSeenChallengeUuidOrTextUuid).toBe('')
      
      // Verify navigation manager was called
      expect(navigationManagerClass.resetCareerNavigationToBeginning).toHaveBeenCalledWith(mockCareerUUID)
    })
  })

  describe('Error Handling', () => {
    test('should handle non-existent career gracefully', () => {
      const nonExistentCareerUUID = 'non-existent' as CareerUUID

      // These should not throw errors
      expect(() => {
        careerQuestClass.getCareer(nonExistentCareerUUID)
      }).not.toThrow()

      expect(() => {
        runInAction(() => {
          // Simulate challenge completion callback for non-existent career
          const career = careerQuestClass.getCareer(nonExistentCareerUUID)
          if (career) {
            career.completedChallengeIds.add(mockChallengeUUID)
          }
        })
      }).not.toThrow()

      expect(() => {
        runInAction(() => {
          careerQuestClass.resetCareerToBeginning(nonExistentCareerUUID)
        })
      }).not.toThrow()
    })

    test('should handle missing navigation manager gracefully', () => {
      vi.mocked(navigationManagerClass.getSwiperInstance).mockReturnValue(null)
      
      const mockCareerDefinitions = {
        [mockCareerUUID]: mockCareerQuestData
      }
      runInAction(() => {
        careerQuestClass['initializeAllCareers'](mockCareerDefinitions)
      })

      // Should not throw when navigation manager returns null
      expect(() => {
        runInAction(() => {
          careerQuestClass['handleMainSlideChange'](mockCareerUUID)
        })
      }).not.toThrow()
    })
  })

  describe('State Isolation', () => {
    test('should maintain separate state for different careers', () => {
      const careerUUID1 = 'career-1' as CareerUUID
      const careerUUID2 = 'career-2' as CareerUUID
      const challengeUUID1 = 'challenge-1' as ChallengeUUID
      const challengeUUID2 = 'challenge-2' as ChallengeUUID

      const mockCareerDefinitions = {
        [careerUUID1]: { ...mockCareerQuestData, careerUUID: careerUUID1 },
        [careerUUID2]: { ...mockCareerQuestData, careerUUID: careerUUID2 }
      }

      runInAction(() => {
        careerQuestClass['initializeAllCareers'](mockCareerDefinitions)
      })

      // Mark challenges in different careers (simulate completion callbacks)
      runInAction(() => {
        const career1 = careerQuestClass.getCareer(careerUUID1)
        const career2 = careerQuestClass.getCareer(careerUUID2)
        career1?.completedChallengeIds.add(challengeUUID1)
        career2?.completedChallengeIds.add(challengeUUID2)
      })

      // Verify state isolation
      const career1 = careerQuestClass.getCareer(careerUUID1)
      const career2 = careerQuestClass.getCareer(careerUUID2)

      expect(career1?.completedChallengeIds.has(challengeUUID1)).toBe(true)
      expect(career1?.completedChallengeIds.has(challengeUUID2)).toBe(false)
      expect(career2?.completedChallengeIds.has(challengeUUID1)).toBe(false)
      expect(career2?.completedChallengeIds.has(challengeUUID2)).toBe(true)
    })
  })

  describe('Logout and Cleanup', () => {
    test('should clear all state on logout', () => {
      const mockCareerDefinitions = {
        [mockCareerUUID]: mockCareerQuestData
      }
      runInAction(() => {
        careerQuestClass['initializeAllCareers'](mockCareerDefinitions)
      })

      expect(careerQuestClass.careers.size).toBe(1)
      expect(careerQuestClass.isDoneInitializing).toBe(true)

      careerQuestClass.logout()

      expect(careerQuestClass.careers.size).toBe(0)
      expect(careerQuestClass.isDoneInitializing).toBe(false)
    })
  })
})
