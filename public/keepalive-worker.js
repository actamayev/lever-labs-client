// Simplified Web Worker for background keepalive messages (without this worker, the keep alive messages to the ESP over USB stop sending when the user changes their tab)
let keepaliveInterval = null

self.onmessage = function(e) {
    const { type, data } = e.data

    if (type === 'START_KEEPALIVE') {
        // Stop any existing interval first
        if (keepaliveInterval) {
            clearInterval(keepaliveInterval)
        }

        // Start new interval
        keepaliveInterval = setInterval(() => {
            self.postMessage({ type: 'SEND_KEEPALIVE' })
        }, data.interval || 100)

    } else if (type === 'STOP_KEEPALIVE') {
        if (keepaliveInterval) {
            clearInterval(keepaliveInterval)
            keepaliveInterval = null
            console.log('Worker: Stopped keepalive')
        }
    }
}
