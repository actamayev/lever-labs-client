# State Management Testing Guide

## Overview

This guide provides a comprehensive strategy for testing MobX state management classes in the Blue Dot Robots client application. The focus is on ensuring state mutations, side effects, and error handling work correctly.

## Testing Strategy

### 1. **Test Categories**

#### **Unit Tests (70% of effort)**
- Test individual state mutations
- Test computed values and getters
- Test error handling for edge cases
- Test state isolation between instances

#### **Integration Tests (20% of effort)**
- Test interactions between classes
- Test side effects (API calls, navigation)
- Test complex state transitions

#### **Component Tests (10% of effort)**
- Test React component integration with MobX
- Test user interactions that trigger state changes

### 2. **Key Testing Principles**

#### **State Isolation**
```typescript
beforeEach(() => {
  // Always reset singleton state
  careerQuestClass.logout()
  studentClass.logout()
  vi.clearAllMocks()
})
```

#### **MobX Action Testing**
```typescript
// Always wrap state mutations in runInAction for testing
runInAction(() => {
  careerQuestClass.markChallengeAsCompleted(careerUUID, challengeUUID)
})
```

#### **Mock Dependencies**
```typescript
// Mock external dependencies to isolate state logic
vi.mock('../chat-manager-class', () => ({
  default: {
    initializeChallengeChat: vi.fn(),
    isCodeCorrect: vi.fn(),
  }
}))
```

## Implementation Examples

### 1. **CareerQuestClass Testing**

**Key Areas to Test:**
- Career initialization and structure
- Challenge completion tracking
- Navigation state management
- Chat toggle states
- Progress saving integration

**Example Test Structure:**
```typescript
describe('CareerQuestClass', () => {
  describe('Career Initialization', () => {
    test('should initialize career with correct structure')
    test('should initialize challenge chats when creating career')
    test('should not duplicate career if already exists')
  })

  describe('Career State Management', () => {
    test('should mark challenge as completed')
    test('should mark challenge as seen')
    test('should update furthest seen position correctly')
    test('should toggle career chat state')
  })

  describe('Error Handling', () => {
    test('should handle non-existent career gracefully')
    test('should handle missing navigation manager gracefully')
  })
})
```

### 2. **StudentClass Testing**

**Key Areas to Test:**
- Classroom data management
- Hub joining/leaving logic
- Focus mode state
- Hub slide updates
- Navigation command parsing

**Example Test Structure:**
```typescript
describe('StudentClass', () => {
  describe('Classroom Data Management', () => {
    test('should set and retrieve student data correctly')
    test('should add new classroom data')
    test('should update existing classroom data')
    test('should remove classroom data')
  })

  describe('Hub Management', () => {
    test('should join hub correctly')
    test('should leave hub correctly')
    test('should check if student is joined to hub')
  })

  describe('Hub Slide Updates', () => {
    test('should update hub slide ID and set focus mode')
    test('should not trigger navigation for non-joined hubs')
    test('should handle non-existent classroom gracefully')
  })
})
```

### 3. **SerialConnectionManagerClass Testing**

**Key Areas to Test:**
- Connection state management
- Device detection and scanning
- Message handling
- Keepalive management
- Error handling for hardware failures

**Example Test Structure:**
```typescript
describe('SerialConnectionManagerClass', () => {
  describe('Connection State Management', () => {
    test('should initialize with disconnected state')
    test('should update connection state when connecting')
    test('should update connection state when disconnecting')
  })

  describe('Device Detection', () => {
    test('should handle device plugged in event')
    test('should handle device unplugged event')
    test('should scan for devices')
  })

  describe('Error Handling', () => {
    test('should handle connection errors gracefully')
    test('should handle disconnection errors gracefully')
    test('should handle write errors gracefully')
  })
})
```

## Testing Patterns

### 1. **State Mutation Testing**
```typescript
test('should update state correctly', () => {
  const initialState = careerQuestClass.getCareer(careerUUID)
  expect(initialState?.completedChallengeIds.has(challengeUUID)).toBe(false)

  runInAction(() => {
    careerQuestClass.markChallengeAsCompleted(careerUUID, challengeUUID)
  })

  const updatedState = careerQuestClass.getCareer(careerUUID)
  expect(updatedState?.completedChallengeIds.has(challengeUUID)).toBe(true)
})
```

### 2. **Side Effect Testing**
```typescript
test('should call external service when marking challenge complete', () => {
  runInAction(() => {
    careerQuestClass.markChallengeAsCompleted(careerUUID, challengeUUID)
  })

  expect(chatManagerClass.initializeChallengeChat).toHaveBeenCalledWith(
    careerUUID,
    challengeUUID,
    expect.any(Object)
  )
})
```

### 3. **Error Handling Testing**
```typescript
test('should handle non-existent career gracefully', () => {
  const nonExistentCareerUUID = 'non-existent' as CareerUUID

  expect(() => {
    runInAction(() => {
      careerQuestClass.markChallengeAsCompleted(nonExistentCareerUUID, challengeUUID)
    })
  }).not.toThrow()
})
```

### 4. **State Isolation Testing**
```typescript
test('should maintain separate state for different careers', () => {
  const careerUUID1 = 'career-1' as CareerUUID
  const careerUUID2 = 'career-2' as CareerUUID

  // Initialize both careers
  runInAction(() => {
    careerQuestClass['initializeAllCareers']({
      [careerUUID1]: mockCareerData1,
      [careerUUID2]: mockCareerData2
    })
  })

  // Mark challenges in different careers
  runInAction(() => {
    careerQuestClass.markChallengeAsCompleted(careerUUID1, challengeUUID1)
    careerQuestClass.markChallengeAsCompleted(careerUUID2, challengeUUID2)
  })

  // Verify state isolation
  const career1 = careerQuestClass.getCareer(careerUUID1)
  const career2 = careerQuestClass.getCareer(careerUUID2)

  expect(career1?.completedChallengeIds.has(challengeUUID1)).toBe(true)
  expect(career1?.completedChallengeIds.has(challengeUUID2)).toBe(false)
  expect(career2?.completedChallengeIds.has(challengeUUID1)).toBe(false)
  expect(career2?.completedChallengeIds.has(challengeUUID2)).toBe(true)
})
```

## Mock Strategies

### 1. **External Dependencies**
```typescript
// Mock API services
vi.mock('../services/auth-data-service', () => ({
  default: {
    login: vi.fn(),
    logout: vi.fn(),
  }
}))

// Mock other MobX classes
vi.mock('../chat-manager-class', () => ({
  default: {
    initializeChallengeChat: vi.fn(),
    isCodeCorrect: vi.fn(),
  }
}))
```

### 2. **Browser APIs**
```typescript
// Mock Web Serial API
Object.defineProperty(global.navigator, 'serial', {
  value: {
    requestPort: vi.fn(),
    getPorts: vi.fn(),
  },
  writable: true,
})

// Mock Web Worker
global.Worker = vi.fn().mockImplementation(() => ({
  postMessage: vi.fn(),
  terminate: vi.fn(),
}))
```

### 3. **Async Operations**
```typescript
// Mock async methods
mockSerialPort.open.mockResolvedValue(undefined)
mockReader.read.mockResolvedValue({ done: false, value: new Uint8Array([1, 2, 3]) })
```

## Running Tests

### **Individual Test Files**
```bash
# Run specific test file
npm test src/classes/__tests__/career-quest-class.test.ts

# Run with watch mode
npm run test:watch src/classes/__tests__/career-quest-class.test.ts
```

### **All State Management Tests**
```bash
# Run all class tests
npm test src/classes/__tests__/

# Run with coverage
npm run test:coverage src/classes/__tests__/
```

### **Test UI**
```bash
# Open test UI for interactive testing
npm run test:ui
```

## Coverage Goals

### **Target Coverage:**
- **Statements:** 90%+
- **Branches:** 85%+
- **Functions:** 95%+
- **Lines:** 90%+

### **Critical Areas (100% coverage):**
- State mutation methods
- Error handling paths
- Public API methods
- State cleanup methods

## Best Practices

### 1. **Test Organization**
- Group related tests in describe blocks
- Use descriptive test names
- Test one behavior per test
- Keep tests independent

### 2. **Mock Management**
- Clear mocks between tests
- Use specific mock implementations
- Mock at the right level (not too deep, not too shallow)

### 3. **State Management**
- Always reset singleton state
- Use runInAction for state mutations
- Test both success and failure paths
- Verify state isolation

### 4. **Error Testing**
- Test graceful error handling
- Test edge cases and boundary conditions
- Verify error logging
- Test recovery scenarios

## Next Steps

1. **Implement the example tests** provided in this guide
2. **Add tests for remaining classes** (GarageClass, PipClass, etc.)
3. **Create integration tests** for class interactions
4. **Add performance tests** for state-heavy operations
5. **Set up CI/CD integration** for automated testing

## Common Pitfalls

### 1. **Forgetting State Reset**
```typescript
// ❌ Bad - state leaks between tests
test('first test', () => {
  careerQuestClass.markChallengeAsCompleted(careerUUID, challengeUUID)
})

test('second test', () => {
  // This test might fail due to state from first test
  expect(careerQuestClass.getCareer(careerUUID)?.completedChallengeIds.size).toBe(0)
})

// ✅ Good - reset state between tests
beforeEach(() => {
  careerQuestClass.logout()
  vi.clearAllMocks()
})
```

### 2. **Not Using runInAction**
```typescript
// ❌ Bad - MobX actions need to be wrapped
careerQuestClass.markChallengeAsCompleted(careerUUID, challengeUUID)

// ✅ Good - wrap in runInAction
runInAction(() => {
  careerQuestClass.markChallengeAsCompleted(careerUUID, challengeUUID)
})
```

### 3. **Over-mocking**
```typescript
// ❌ Bad - mocking too deep
vi.mock('../utils/helpers/date-utils', () => ({
  formatDate: vi.fn()
}))

// ✅ Good - mock at appropriate level
vi.mock('../services/api-service', () => ({
  saveProgress: vi.fn()
}))
```

This guide provides a solid foundation for testing your MobX state management classes. Start with the examples provided and gradually expand coverage to all critical state management areas.
