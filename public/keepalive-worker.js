// public/keepalive-worker.js
// Web Worker for background keepalive messages

let keepaliveInterval = null
let isRunning = false

self.onmessage = function(e) {
    const { type, data } = e.data

    switch (type) {
        case 'START_KEEPALIVE':
            if (!isRunning) {
                isRunning = true
                console.log('Worker: Starting keepalive with interval:', data.interval)
                
                keepaliveInterval = setInterval(() => {
                    // Tell main thread to send keepalive
                    self.postMessage({
                        type: 'SEND_KEEPALIVE',
                        timestamp: Date.now()
                    })
                }, data.interval || 100) // Default 100ms
            }
            break

        case 'STOP_KEEPALIVE':
            if (keepaliveInterval) {
                clearInterval(keepaliveInterval)
                keepaliveInterval = null
                isRunning = false
                console.log('Worker: Stopped keepalive')
            }
            break

        case 'PING':
            // Health check from main thread
            self.postMessage({
                type: 'PONG',
                timestamp: Date.now(),
                isRunning: isRunning
            })
            break

        default:
            console.warn('Worker: Unknown message type:', type)
    }
}

// Handle worker errors
self.onerror = function(error) {
    console.error('Worker error:', error)
    self.postMessage({
        type: 'ERROR',
        error: error.message
    })
}

console.log('Keepalive Worker loaded and ready')
