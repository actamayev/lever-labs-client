import { describe, test, expect, beforeEach, vi, afterEach } from 'vitest'
import { runInAction } from 'mobx'
import SerialConnectionManagerClass from '../serial-connection-manager-class'
// SerialPort type is available globally from @types/w3c-web-serial
import authClass from '../auth-class'
import serialMessageManagerClass from '../serial-message-manager-class'
import workbenchClass from '../workbench-class'
import pipClass from '../pip-class'

// Mock dependencies
vi.mock('../auth-class', () => ({
  default: {
    isLoggedIn: true,
  }
}))

vi.mock('../serial-message-manager-class', () => ({
  default: {
    handleSerialMessage: vi.fn(),
  }
}))

vi.mock('../workbench-class', () => ({
  default: {
    resetWorkbenchState: vi.fn(),
  }
}))

vi.mock('../pip-class', () => ({
  default: {
    resetPipState: vi.fn(),
  }
}))

// Mock Web Serial API
const mockSerialPort = {
  open: vi.fn().mockResolvedValue(undefined),
  close: vi.fn().mockResolvedValue(undefined),
  readable: {
    getReader: vi.fn(),
  },
  writable: {
    getWriter: vi.fn(),
  },
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
} as unknown as SerialPort

const mockReader = {
  read: vi.fn().mockResolvedValue({ done: false, value: new Uint8Array([1, 2, 3]) }),
  cancel: vi.fn(),
  releaseLock: vi.fn(),
  closed: Promise.resolve(undefined),
}

const mockWriter = {
  write: vi.fn().mockResolvedValue(undefined),
  close: vi.fn(),
  releaseLock: vi.fn(),
  closed: Promise.resolve(undefined),
  desiredSize: 1,
  ready: Promise.resolve(undefined),
  abort: vi.fn(),
}

// Mock navigator.serial with proper Web Serial API interface
Object.defineProperty(global.navigator, 'serial', {
  value: {
    requestPort: vi.fn(),
    getPorts: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    onconnect: null,
    ondisconnect: null,
  },
  writable: true,
  configurable: true,
})

// Mock Web Worker
global.Worker = vi.fn().mockImplementation(() => ({
  postMessage: vi.fn(),
  terminate: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
}))

describe('SerialConnectionManagerClass', () => {
  let serialManager: typeof SerialConnectionManagerClass

  beforeEach(() => {
    // Use the singleton instance
    serialManager = SerialConnectionManagerClass
    vi.clearAllMocks()
  })

  afterEach(() => {
    // Clean up any intervals or workers
    if (serialManager['keepAliveInterval']) {
      clearInterval(serialManager['keepAliveInterval'])
    }
    if (serialManager['keepaliveWorker']) {
      serialManager['keepaliveWorker'].terminate()
    }
  })

  describe('Connection State Management', () => {
    test('should initialize with disconnected state', () => {
      expect(serialManager.connected).toBe(false)
      expect(serialManager.port).toBeNull()
      expect(serialManager.reader).toBeNull()
      expect(serialManager.writer).toBeNull()
      expect(serialManager.pipTurnedOn).toBe(false)
    })

    test('should update connection state when connecting', async () => {
      vi.mocked(navigator.serial.requestPort).mockResolvedValue(mockSerialPort)
      vi.mocked(mockSerialPort.readable!.getReader).mockReturnValue(mockReader)
      vi.mocked(mockSerialPort.writable!.getWriter).mockReturnValue(mockWriter)

      await serialManager.connectToDevice()

      expect(serialManager.connected).toBe(true)
      expect(serialManager.port).toBe(mockSerialPort)
      expect(serialManager.reader).toBe(mockReader)
      expect(serialManager.writer).toBe(mockWriter)
    })

    test('should update connection state when disconnecting', async () => {
      // First connect
      vi.mocked(navigator.serial.requestPort).mockResolvedValue(mockSerialPort)
      vi.mocked(mockSerialPort.readable!.getReader).mockReturnValue(mockReader)
      vi.mocked(mockSerialPort.writable!.getWriter).mockReturnValue(mockWriter)
      
      await serialManager.connectToDevice()
      expect(serialManager.connected).toBe(true)

      // Then disconnect
      await serialManager.disconnect()

      expect(serialManager.connected).toBe(false)
      expect(serialManager.port).toBeNull()
      expect(serialManager.reader).toBeNull()
      expect(serialManager.writer).toBeNull()
    })
  })

  describe('Device Detection', () => {
    test('should handle device plugged in event', () => {
      const mockDevice = {
        usbVendorId: 1234,
        usbProductId: 5678,
        port: mockSerialPort
      }

      runInAction(() => {
        serialManager.handleDevicePluggedIn(mockSerialPort)
      })

      expect(serialManager.detectedDevices).toHaveLength(1)
      expect(serialManager.detectedDevices[0].port).toBe(mockSerialPort)
    })

    test('should handle device unplugged event', () => {
      const mockDevice = {
        usbVendorId: 1234,
        usbProductId: 5678,
        port: mockSerialPort
      }

      // First add a device
      runInAction(() => {
        serialManager.handleDevicePluggedIn(mockSerialPort)
      })

      expect(serialManager.detectedDevices).toHaveLength(1)

      // Then remove it
      runInAction(() => {
        serialManager['handleDeviceUnplugged'](mockSerialPort)
      })

      expect(serialManager.detectedDevices).toHaveLength(0)
    })

    test('should request new device', async () => {
      vi.mocked(navigator.serial.requestPort).mockResolvedValue(mockSerialPort)

      await serialManager.requestNewDevice()

      expect(navigator.serial.requestPort).toHaveBeenCalled()
    })
  })

  describe('Pip State Management', () => {
    test('should track pip turned on state', () => {
      expect(serialManager.pipTurnedOn).toBe(false)

      runInAction(() => {
        serialManager.pipTurnedOn = true
      })

      expect(serialManager.pipTurnedOn).toBe(true)
    })

    test('should reset pip state on disconnect', async () => {
      // Set pip as turned on
      runInAction(() => {
        serialManager.pipTurnedOn = true
      })

      expect(serialManager.pipTurnedOn).toBe(true)

      // Disconnect should reset state
      await serialManager.disconnect()

      expect(serialManager.pipTurnedOn).toBe(false)
    })
  })

  describe('Message Handling', () => {
    beforeEach(async () => {
      // Setup connection for message tests
      vi.mocked(navigator.serial.requestPort).mockResolvedValue(mockSerialPort)
      vi.mocked(mockSerialPort.readable!.getReader).mockReturnValue(mockReader)
      vi.mocked(mockSerialPort.writable!.getWriter).mockReturnValue(mockWriter)
      
      await serialManager.connectToDevice()
    })

    test('should handle incoming serial messages', async () => {
      const mockMessage = new Uint8Array([1, 2, 3, 4])
      mockReader.read.mockResolvedValueOnce({ done: false, value: mockMessage })
      mockReader.read.mockResolvedValueOnce({ done: true, value: undefined })

      // Start reading messages
      const readPromise = serialManager['readLoop']()
      
      // Wait a bit for the message to be processed
      await new Promise(resolve => setTimeout(resolve, 10))
      
      // Cancel the reader to stop the infinite loop
      mockReader.cancel()

      expect(serialMessageManagerClass.handleRawMessage).toHaveBeenCalledWith(mockMessage)
    })

    test('should handle message reading errors gracefully', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      mockReader.read.mockRejectedValue(new Error('Read error'))

      // Start reading messages
      const readPromise = serialManager['readLoop']()
      
      // Wait a bit for the error to be processed
      await new Promise(resolve => setTimeout(resolve, 10))
      
      // Cancel the reader to stop the infinite loop
      mockReader.cancel()

      expect(consoleSpy).toHaveBeenCalledWith('Error reading from serial port:', expect.any(Error))
      
      consoleSpy.mockRestore()
    })
  })

  describe('Keepalive Management', () => {
    test('should start keepalive when connected', async () => {
      vi.mocked(navigator.serial.requestPort).mockResolvedValue(mockSerialPort)
      vi.mocked(mockSerialPort.readable!.getReader).mockReturnValue(mockReader)
      vi.mocked(mockSerialPort.writable!.getWriter).mockReturnValue(mockWriter)

      await serialManager.connectToDevice()

      // Keepalive should be started
      expect(serialManager['keepAliveInterval']).toBeDefined()
    })

    test('should stop keepalive when disconnected', async () => {
      vi.mocked(navigator.serial.requestPort).mockResolvedValue(mockSerialPort)
      vi.mocked(mockSerialPort.readable!.getReader).mockReturnValue(mockReader)
      vi.mocked(mockSerialPort.writable!.getWriter).mockReturnValue(mockWriter)

      await serialManager.connectToDevice()
      expect(serialManager['keepAliveInterval']).toBeDefined()

      await serialManager.disconnect()
      expect(serialManager['keepAliveInterval']).toBeNull()
    })

    test('should send keepalive messages', async () => {
      vi.mocked(navigator.serial.requestPort).mockResolvedValue(mockSerialPort)
      vi.mocked(mockSerialPort.readable!.getReader).mockReturnValue(mockReader)
      vi.mocked(mockSerialPort.writable!.getWriter).mockReturnValue(mockWriter)

      await serialManager.connectToDevice()

      // Trigger keepalive manually
      await serialManager['sendKeepaliveFromWorker']()

      expect(mockWriter.write).toHaveBeenCalled()
    })
  })

  describe('Error Handling', () => {
    test('should handle connection errors gracefully', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      vi.mocked(navigator.serial.requestPort).mockRejectedValue(new Error('Connection failed'))

        await serialManager.connectToDevice()

      expect(consoleSpy).toHaveBeenCalledWith('Error connecting to serial port:', expect.any(Error))
      expect(serialManager.connected).toBe(false)
      
      consoleSpy.mockRestore()
    })

    test('should handle disconnection errors gracefully', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      
      // Setup connection first
      vi.mocked(navigator.serial.requestPort).mockResolvedValue(mockSerialPort)
      vi.mocked(mockSerialPort.readable!.getReader).mockReturnValue(mockReader)
      vi.mocked(mockSerialPort.writable!.getWriter).mockReturnValue(mockWriter)
      
      await serialManager.connectToDevice()

      // Mock close to throw error
      vi.mocked(mockSerialPort.close).mockRejectedValue(new Error('Close failed'))

      await serialManager.disconnect()

      expect(consoleSpy).toHaveBeenCalledWith('Error disconnecting from serial port:', expect.any(Error))
      
      consoleSpy.mockRestore()
    })

    test('should handle write errors gracefully', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      
      vi.mocked(navigator.serial.requestPort).mockResolvedValue(mockSerialPort)
      vi.mocked(mockSerialPort.readable!.getReader).mockReturnValue(mockReader)
      vi.mocked(mockSerialPort.writable!.getWriter).mockReturnValue(mockWriter)
      
      await serialManager.connectToDevice()

      // Mock write to throw error
      mockWriter.write.mockRejectedValue(new Error('Write failed'))

      await serialManager['sendKeepaliveFromWorker']()

      expect(consoleSpy).toHaveBeenCalledWith('Error sending keepalive:', expect.any(Error))
      
      consoleSpy.mockRestore()
    })
  })

  describe('State Cleanup', () => {
    test('should cleanup on beforeunload', () => {
      const disconnectSpy = vi.spyOn(serialManager, 'disconnect').mockResolvedValue(undefined)
      
      // Simulate beforeunload event
      const beforeUnloadEvent = new Event('beforeunload')
      window.dispatchEvent(beforeUnloadEvent)

      expect(disconnectSpy).toHaveBeenCalled()
    })

    test('should reset state when not logged in', () => {
      // Mock the auth class to simulate not being logged in
      vi.mocked(authClass).isLoggedIn = false
      authClass.logout()
      
      // Use the singleton instance
      const newManager = SerialConnectionManagerClass
      newManager.logout()
      
      // Should not initialize keepalive worker when not logged in
      expect(newManager['keepaliveWorker']).toBeNull()
    })
  })
})
