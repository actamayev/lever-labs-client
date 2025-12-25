import { describe, test, expect, beforeEach, vi } from 'vitest'
import { runInAction } from 'mobx'
import studentClass from '../student-class'
import careerQuestClass from '../career-quest-class'
import { ClassCode, HubUUID } from '@actamayev/lever-labs-common-ts/types/utils'
import { UpdatedHubSlideId } from '@actamayev/lever-labs-common-ts/types/socket'
import { StudentViewHubData } from '@actamayev/lever-labs-common-ts/types/hub'

// Mock career quest class
vi.mock('../career-quest-class', () => ({
  default: {
    executeNavigationCommand: vi.fn(),
    navigateToPosition: vi.fn(),
  }
}))

describe('StudentClass Extended Tests', () => {
  const mockClassCode = 'TEST123' as ClassCode
  const mockHubId = 'hub-uuid-123' as HubUUID
  const mockCareerUUID = 'career-uuid-456' as any

  beforeEach(() => {
    // Reset singleton state
    studentClass.logout()
    vi.clearAllMocks()
  })

  describe('Classroom Data Management', () => {
    test('should set and retrieve student data correctly', () => {
      const mockClassroomData: StudentClassroomDataWithHubs[] = [{
        classCode: mockClassCode,
        classroomName: 'Test Classroom',
        activeHubs: [],
        joinedClassroomAt: new Date(),
        studentId: 123,
        garageDrivingAllowed: true,
        garageTonesAllowed: true,
        garageLightsAllowed: true,
        garageDisplayAllowed: true,
      }]

      expect(studentClass.retrievedStudentData).toBe(false)
      expect(studentClass.isRetrievingStudentData).toBe(false)

      runInAction(() => {
        studentClass.setRetrievedStudentData(mockClassroomData)
      })

      expect(studentClass.retrievedStudentData).toBe(true)
      expect(studentClass.isRetrievingStudentData).toBe(false)
      expect(studentClass.classroomData).toEqual(mockClassroomData)
    })

    test('should add new classroom data', () => {
      const initialClassroom: StudentClassroomDataWithHubs = {
        classCode: 'CLASS1' as ClassCode,
        classroomName: 'Class 1',
        activeHubs: [],
        joinedClassroomAt: new Date(),
        studentId: 123,
        garageDrivingAllowed: true,
        garageTonesAllowed: true,
        garageLightsAllowed: true,
        garageDisplayAllowed: true,
      }

      const newClassroom: StudentClassroomDataWithHubs = {
        classCode: 'CLASS2' as ClassCode,
        classroomName: 'Class 2',
        activeHubs: [],
        joinedClassroomAt: new Date(),
        studentId: 123,
        garageDrivingAllowed: true,
        garageTonesAllowed: true,
        garageLightsAllowed: true,
        garageDisplayAllowed: true,
      }

      runInAction(() => {
        studentClass.setRetrievedStudentData([initialClassroom])
        studentClass.addClassroomData(newClassroom)
      })

      expect(studentClass.classroomData).toHaveLength(2)
      expect(studentClass.classroomData[1]).toEqual(newClassroom)
    })

    test('should update existing classroom data', () => {
      const initialClassroom: StudentClassroomDataWithHubs = {
        classCode: mockClassCode,
        classroomName: 'Original Name',
        activeHubs: [],
        joinedClassroomAt: new Date(),
        studentId: 123,
        garageDrivingAllowed: true,
        garageTonesAllowed: true,
        garageLightsAllowed: true,
        garageDisplayAllowed: true,
      }

      const updatedClassroom = {
        ...initialClassroom,
        classroomName: 'Updated Name',
        studentId: 123,
        garageDrivingAllowed: true,
        garageTonesAllowed: true,
        garageLightsAllowed: true,
        garageDisplayAllowed: true,
      }

      runInAction(() => {
        studentClass.setRetrievedStudentData([initialClassroom])
        studentClass.updateClassroomData(mockClassCode, updatedClassroom)
      })

      const retrieved = studentClass.getClassroomData(mockClassCode)
      expect(retrieved?.classroomName).toBe('Updated Name')
    })

    test('should remove classroom data', () => {
      const classroom1: StudentClassroomDataWithHubs = {
        classCode: 'CLASS1' as ClassCode,
        classroomName: 'Class 1',
        activeHubs: [],
        joinedClassroomAt: new Date(),
        studentId: 123,
        garageDrivingAllowed: true,
        garageTonesAllowed: true,
        garageLightsAllowed: true,
        garageDisplayAllowed: true,
      }

      const classroom2: StudentClassroomDataWithHubs = {
        classCode: 'CLASS2' as ClassCode,
        classroomName: 'Class 2',
        activeHubs: [],
        joinedClassroomAt: new Date(),
        studentId: 123,
        garageDrivingAllowed: true,
        garageTonesAllowed: true,
        garageLightsAllowed: true,
        garageDisplayAllowed: true,
        }

      runInAction(() => {
        studentClass.setRetrievedStudentData([classroom1, classroom2])
      })

      expect(studentClass.classroomData).toHaveLength(2)

      const remainingCount = runInAction(() => {
        return studentClass.removeClassroomData('CLASS1' as ClassCode)
      })

      expect(remainingCount).toBe(1)
      expect(studentClass.classroomData).toHaveLength(1)
      expect(studentClass.classroomData[0].classCode).toBe('CLASS2')
    })

    test('should return undefined for non-existent classroom', () => {
      const result = studentClass.getClassroomData('NONEXISTENT' as ClassCode)
      expect(result).toBeUndefined()
    })
  })

  describe('Hub Management', () => {
    const mockHubData = {
      hubId: mockHubId,
      careerUUID: mockCareerUUID,
      slideId: 'initial-slide',
      isHubJoined: false,
      classCode: mockClassCode,
      hubName: 'Test Hub'
    }

    beforeEach(() => {
      const mockClassroom: StudentClassroomDataWithHubs = {
        classCode: mockClassCode,
        classroomName: 'Test Classroom',
        activeHubs: [mockHubData],
        joinedClassroomAt: new Date(),
        studentId: 123,
        garageDrivingAllowed: true,
        garageTonesAllowed: true,
        garageLightsAllowed: true,
        garageDisplayAllowed: true,
      } as StudentClassroomDataWithHubs 
      
      runInAction(() => {
        studentClass.setRetrievedStudentData([mockClassroom])
      })
    })

    test('should add new hub to classroom', () => {
      const newHub: StudentViewHubData = {
        hubId: 'new-hub-id' as HubUUID,
        careerUUID: mockCareerUUID,
        slideId: 'new-slide',
        classCode: mockClassCode,
        hubName: 'New Hub',
      }

      runInAction(() => {
        studentClass.addNewHub(newHub)
      })

      const classroom = studentClass.getClassroomData(mockClassCode)
      expect(classroom?.activeHubs).toHaveLength(2)
      const newHubWithIsHubJoined = {
        ...newHub,
        isHubJoined: false,
      }
      expect(classroom?.activeHubs[1]).toEqual(newHubWithIsHubJoined)
    })

    test('should join hub correctly', () => {
      const hubToJoin: StudentViewHubData = {
        ...mockHubData,
      }

      runInAction(() => {
        studentClass.joinHub(hubToJoin)
      })

      const classroom = studentClass.getClassroomData(mockClassCode)
      const hub = classroom?.activeHubs.find(h => h.hubId === mockHubId)
      expect(hub?.isHubJoined).toBe(true)
    })

    test('should add new hub when joining non-existent hub', () => {
      const newHubToJoin = {
        hubId: 'new-hub-id' as HubUUID,
        careerUUID: mockCareerUUID,
        slideId: 'new-slide',
        isHubJoined: true,
        classCode: mockClassCode,
        hubName: 'New Hub'
      }

      runInAction(() => {
        studentClass.joinHub(newHubToJoin)
      })

      const classroom = studentClass.getClassroomData(mockClassCode)
      expect(classroom?.activeHubs).toHaveLength(2)
      
      const joinedHub = classroom?.activeHubs.find(h => h.hubId === 'new-hub-id' as HubUUID)
      expect(joinedHub?.isHubJoined).toBe(true)
    })

    test('should leave hub correctly', () => {
      // First join the hub
      runInAction(() => {
        studentClass.joinHub({ ...mockHubData })
      })

      // Then leave it
      runInAction(() => {
        studentClass.leaveHub(mockClassCode, mockHubId)
      })

      const classroom = studentClass.getClassroomData(mockClassCode)
      const hub = classroom?.activeHubs.find(h => h.hubId === mockHubId)
      expect(hub?.isHubJoined).toBe(false)
    })

    test('should check if student is joined to hub', () => {
      // Initially not joined
      expect(studentClass.checkIfStudentInHub(mockClassCode, mockHubId)).toBe(false)

      // Join the hub
      runInAction(() => {
        studentClass.joinHub({ ...mockHubData })
      })

      expect(studentClass.checkIfStudentInHub(mockClassCode, mockHubId)).toBe(true)
    })

    test('should return false for non-existent hub when checking join status', () => {
      const result = studentClass.checkIfStudentInHub(mockClassCode, 'nonexistent-hub' as HubUUID)
      expect(result).toBe(false)
    })
  })

  describe('Focus Mode Management', () => {
    test('should toggle focus mode state', () => {
      expect(studentClass.isInFocusMode).toBe(false)

      runInAction(() => {
        studentClass.setIsInFocusMode(true)
      })

      expect(studentClass.isInFocusMode).toBe(true)

      runInAction(() => {
        studentClass.setIsInFocusMode(false)
      })

      expect(studentClass.isInFocusMode).toBe(false)
    })
  })

  describe('Hub Slide Updates', () => {
    beforeEach(() => {
      const mockClassroom = {
        classCode: mockClassCode,
        classroomName: 'Test Classroom',
        activeHubs: [{
          hubId: mockHubId,
          careerUUID: mockCareerUUID,
          slideId: 'initial-slide',
          isHubJoined: true, // Student is joined to this hub
          classCode: mockClassCode,
          hubName: 'Test Hub'
        }],
        joinedClassroomAt: new Date(),
        studentId: 123,
        garageDrivingAllowed: true,
        garageTonesAllowed: true,
        garageLightsAllowed: true,
        garageDisplayAllowed: true,
      }
      
      runInAction(() => {
        studentClass.setRetrievedStudentData([mockClassroom])
      })
    })

    test('should update hub slide ID and set focus mode', () => {
      const updateData: UpdatedHubSlideId = {
        classCode: mockClassCode,
        hubId: mockHubId,
        newSlideId: 'new-slide-id'
      }

      expect(studentClass.isInFocusMode).toBe(false)

      runInAction(() => {
        studentClass.updateHubSlideId(updateData)
      })

      const hub = studentClass.getClassroomData(mockClassCode)?.activeHubs[0]
      expect(hub?.slideId).toBe('new-slide-id')
      expect(studentClass.isInFocusMode).toBe(true)
    })

    test('should not trigger navigation for non-joined hubs', () => {
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
        garageTonesAllowed: true,
        garageLightsAllowed: true,
        garageDisplayAllowed: true,
      }
      
      runInAction(() => {
        studentClass.setRetrievedStudentData([mockClassroom])
      })

      const updateData: UpdatedHubSlideId = {
        classCode: mockClassCode,
        hubId: mockHubId,
        newSlideId: 'test-slide'
      }

      runInAction(() => {
        studentClass.updateHubSlideId(updateData)
      })

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

      expect(() => {
        runInAction(() => {
          studentClass.updateHubSlideId(updateData)
        })
      }).not.toThrow()
    })

    test('should handle non-existent hub gracefully', () => {
      const updateData: UpdatedHubSlideId = {
        classCode: mockClassCode,
        hubId: 'nonexistent-hub' as HubUUID,
        newSlideId: 'test-slide'
      }

      expect(() => {
        runInAction(() => {
          studentClass.updateHubSlideId(updateData)
        })
      }).not.toThrow()
    })
  })

  describe('Hub Deletion', () => {
    beforeEach(() => {
      const mockClassroom = {
        classCode: mockClassCode,
        classroomName: 'Test Classroom',
        activeHubs: [{
          hubId: mockHubId,
          careerUUID: mockCareerUUID,
          slideId: 'initial-slide',
          isHubJoined: true,
          classCode: mockClassCode,
          hubName: 'Test Hub'
        }],
        joinedClassroomAt: new Date(),
        studentId: 123,
        garageDrivingAllowed: true,
        garageTonesAllowed: true,
        garageLightsAllowed: true,
        garageDisplayAllowed: true,
      }
      
      runInAction(() => {
        studentClass.setRetrievedStudentData([mockClassroom])
      })
    })

    test('should remove hub from classroom', () => {
      const deleteData = {
        classCode: mockClassCode,
        hubId: mockHubId
      }

      runInAction(() => {
        studentClass.deleteHub(deleteData)
      })

      const classroom = studentClass.getClassroomData(mockClassCode)
      expect(classroom?.activeHubs).toHaveLength(0)
    })

    test('should handle deletion of non-existent hub gracefully', () => {
      const deleteData = {
        classCode: mockClassCode,
        hubId: 'nonexistent-hub' as HubUUID
      }

      expect(() => {
        runInAction(() => {
          studentClass.deleteHub(deleteData)
        })
      }).not.toThrow()

      const classroom = studentClass.getClassroomData(mockClassCode)
      expect(classroom?.activeHubs).toHaveLength(1) // Original hub should still be there
    })
  })

  describe('Utility Methods', () => {
    test('should return hub ID from first classroom', () => {
      const mockClassroom = {
        classCode: mockClassCode,
        classroomName: 'Test Classroom',
        activeHubs: [{
          hubId: mockHubId,
          careerUUID: mockCareerUUID,
          slideId: 'initial-slide',
          isHubJoined: false,
          classCode: mockClassCode,
          hubName: 'Test Hub'
        }],
        joinedClassroomAt: new Date(),
        studentId: 123,
        garageDrivingAllowed: true,
        garageTonesAllowed: true,
        garageLightsAllowed: true,
        garageDisplayAllowed: true,
      }
      
      runInAction(() => {
        studentClass.setRetrievedStudentData([mockClassroom])
      })

      const hubId = studentClass.getHubId()
      expect(hubId).toBe(mockHubId)
    })

    test('should return null when no classroom data exists', () => {
      const hubId = studentClass.getHubId()
      expect(hubId).toBeNull()
    })
  })

  describe('Logout and Cleanup', () => {
    test('should reset all state on logout', () => {
      const mockClassroom = {
        classCode: mockClassCode,
        classroomName: 'Test Classroom',
        activeHubs: [],
        joinedClassroomAt: new Date(),
        studentId: 123,
        garageDrivingAllowed: true,
        garageTonesAllowed: true,
        garageLightsAllowed: true,
        garageDisplayAllowed: true,
      }

      runInAction(() => {
        studentClass.setRetrievedStudentData([mockClassroom])
        studentClass.setIsInFocusMode(true)
      })

      expect(studentClass.classroomData).toHaveLength(1)
      expect(studentClass.isInFocusMode).toBe(true)
      expect(studentClass.retrievedStudentData).toBe(true)

      studentClass.logout()

      expect(studentClass.classroomData).toHaveLength(0)
      expect(studentClass.isInFocusMode).toBe(false)
      expect(studentClass.retrievedStudentData).toBe(false)
      expect(studentClass.isRetrievingStudentData).toBe(false)
    })
  })
})
