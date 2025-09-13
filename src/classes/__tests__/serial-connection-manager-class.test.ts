import { describe, test, expect, beforeEach, vi, afterEach } from "vitest"
import { runInAction } from "mobx"
import serialConnectionManagerClass from "../serial-connection-manager-class"
import authClass from "../auth-class"
import serialMessageManagerClass from "../serial-message-manager-class"
import workbenchClass from "../workbench-class"
import pipClass from "../pip-class"

// --- Mock dependencies ---
vi.mock("../auth-class", () => ({
  default: {
    isFinishedWithSignup: true,
  },
}))

vi.mock("../serial-message-manager-class", () => ({
  default: {
    handleConnected: vi.fn(),
    handleDisconnected: vi.fn(),
    handleRawMessage: vi.fn(),
    handleMessageSent: vi.fn(),
  },
}))

vi.mock("../workbench-class", () => ({
  default: {
    setBatteryDataNull: vi.fn(),
  },
}))

vi.mock("../pip-class", () => ({
  default: {
    setPipPluggedInSerial: vi.fn(),
  },
}))

// --- Mock Web Serial API ---
const mockReader = {
  read: vi.fn().mockResolvedValue({ done: false, value: new Uint8Array([1, 2, 3]) }),
  cancel: vi.fn(),
  releaseLock: vi.fn(),
}

const mockWriter = {
  write: vi.fn().mockResolvedValue(undefined),
  releaseLock: vi.fn(),
}

const mockSerialPort = {
  open: vi.fn().mockResolvedValue(undefined),
  close: vi.fn().mockResolvedValue(undefined),
  getInfo: vi.fn().mockReturnValue({ usbVendorId: 1234, usbProductId: 5678 }),
  readable: { getReader: vi.fn(() => mockReader) },
  writable: { getWriter: vi.fn(() => mockWriter) },
} as unknown as SerialPort

Object.defineProperty(global.navigator, "serial", {
  value: {
    requestPort: vi.fn(),
    getPorts: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  },
  writable: true,
  configurable: true,
})

// --- Mock Worker ---
global.Worker = vi.fn().mockImplementation(() => ({
  postMessage: vi.fn(),
  terminate: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
}))

describe("SerialConnectionManagerClass", () => {
  let serialManager: typeof serialConnectionManagerClass

  beforeEach(() => {
    serialManager = serialConnectionManagerClass
    vi.clearAllMocks()
  })

  afterEach(() => {
    if (serialManager["keepAliveInterval"]) {
      clearInterval(serialManager["keepAliveInterval"])
    }
    if (serialManager["keepaliveWorker"]) {
      serialManager["keepaliveWorker"].terminate()
    }
  })

  describe("Connection State Management", () => {
    test("should initialize with disconnected state", () => {
      expect(serialManager.connected).toBe(false)
      expect(serialManager.port).toBeNull()
      expect(serialManager.reader).toBeNull()
      expect(serialManager.writer).toBeNull()
      expect(serialManager.pipTurnedOn).toBe(false)
    })

    test("should update connection state when connecting", async () => {
      vi.mocked(navigator.serial.requestPort).mockResolvedValue(mockSerialPort)

      await serialManager.connectToDevice()

      expect(serialManager.connected).toBe(true)
      expect(serialManager.port).toBe(mockSerialPort)
      expect(serialManager.reader).toBe(mockReader)
      expect(serialManager.writer).toBe(mockWriter)
    })

    test("should update connection state when disconnecting", async () => {
      vi.mocked(navigator.serial.requestPort).mockResolvedValue(mockSerialPort)
      await serialManager.connectToDevice()

      expect(serialManager.connected).toBe(true)

      await serialManager.disconnect()

      expect(serialManager.connected).toBe(false)
      expect(serialManager.port).toBeNull()
      expect(serialManager.reader).toBeNull()
      expect(serialManager.writer).toBeNull()
    })
  })

  describe("Device Handling", () => {
    test("should request new device", async () => {
      vi.mocked(navigator.serial.requestPort).mockResolvedValue(mockSerialPort)

      await serialManager.requestNewDevice()

      expect(navigator.serial.requestPort).toHaveBeenCalled()
    })
  })

  describe("Pip State Management", () => {
    test("should track pip turned on state", () => {
      expect(serialManager.pipTurnedOn).toBe(false)

      runInAction(() => {
        serialManager.pipTurnedOn = true
      })

      expect(serialManager.pipTurnedOn).toBe(true)
    })

    test("should reset pip state on disconnect", async () => {
      runInAction(() => {
        serialManager.pipTurnedOn = true
      })

      expect(serialManager.pipTurnedOn).toBe(true)

      await serialManager.disconnect()

      expect(serialManager.pipTurnedOn).toBe(false)
    })
  })

  describe("Message Handling", () => {
    beforeEach(async () => {
      vi.mocked(navigator.serial.requestPort).mockResolvedValue(mockSerialPort)
      await serialManager.connectToDevice()
    })

    test("should handle incoming serial messages", async () => {
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {})
      mockReader.read.mockResolvedValueOnce({ done: true, value: undefined })

      await serialManager["readLoop"]()

      expect(consoleSpy).not.toHaveBeenCalled()
      consoleSpy.mockRestore()
    })

    test("should handle message reading errors gracefully", async () => {
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {})
      mockReader.read.mockRejectedValue(new Error("Read error"))

      await serialManager["readLoop"]()

      expect(consoleSpy).toHaveBeenCalledWith("Error in read loop:", expect.any(Error))
      consoleSpy.mockRestore()
    })
  })

  describe("Keepalive Management", () => {
    test("should start and stop keepalive", async () => {
      vi.mocked(navigator.serial.requestPort).mockResolvedValue(mockSerialPort)

      await serialManager.connectToDevice()
      expect(serialManager["keepAliveInterval"]).toBeDefined()

      await serialManager.disconnect()
      expect(serialManager["keepAliveInterval"]).toBeNull()
    })

    test("should send keepalive messages", async () => {
      vi.mocked(navigator.serial.requestPort).mockResolvedValue(mockSerialPort)
      await serialManager.connectToDevice()

      await serialManager["sendKeepaliveFromWorker"]()

      expect(mockWriter.write).toHaveBeenCalled()
    })
  })

  describe("Error Handling", () => {
    test("should handle connection errors gracefully", async () => {
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {})
      vi.mocked(navigator.serial.requestPort).mockRejectedValue(new Error("Connection failed"))

      await serialManager.connectToDevice()

      expect(consoleSpy).toHaveBeenCalledWith("Error requesting port:", expect.any(Error))
      expect(serialManager.connected).toBe(false)
      consoleSpy.mockRestore()
    })

    test("should handle write errors gracefully", async () => {
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {})
      vi.mocked(navigator.serial.requestPort).mockResolvedValue(mockSerialPort)
      await serialManager.connectToDevice()

      mockWriter.write.mockRejectedValue(new Error("Write failed"))
      await serialManager["sendKeepaliveFromWorker"]()

      expect(consoleSpy).toHaveBeenCalledWith("Keepalive error from worker:", expect.any(Error))
      consoleSpy.mockRestore()
    })
  })

  describe("State Cleanup", () => {
    test("should cleanup on logout", async () => {
      await serialManager.logout()
      expect(serialManager["keepaliveWorker"]).toBeNull()
    })
  })
})
