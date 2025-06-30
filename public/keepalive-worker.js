// Simplified Web Worker for background keepalive messages
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
