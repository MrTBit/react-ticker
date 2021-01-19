import React from 'react';

class Socket {

    constructor(url,defaultSymbols,  onMessageReceived) {
        this.socket = new WebSocket(url);
        this.setupSocketListeners(defaultSymbols, onMessageReceived);
    }

    setupSocketListeners(defaultSymbols, onMessageReceived) {
        const specialThis = this; //just javascript things

        // Connection opened -> Subscribe
        this.socket.addEventListener('open', function (event) {
            defaultSymbols.forEach((symbol) => {
                specialThis.subscribe(symbol);
            })
        });

        // Listen for messages
        this.socket.addEventListener('message', function (event) {
            onMessageReceived(event.data);
        });

        return defaultSymbols; //temporary
    }

//Subscribe
    subscribe(symbol) {
        this.socket.send(JSON.stringify({'type': 'subscribe', 'symbol': symbol}));
    }

// Unsubscribe
    unsubscribe(symbol) {
        this.socket.send(JSON.stringify({'type': 'unsubscribe', 'symbol': symbol}));
    }

//disconnect (no idea if this works)
    disconnect() {
        this.socket.close();
    }
}

export default Socket;