class Socket {

    constructor() {
        this.socket = null;
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
    }

    //connect
    connect(url, defaultSymbols, onMessageReceived) {
        this.socket = new WebSocket(url);
        this.setupSocketListeners(defaultSymbols, onMessageReceived);
    }

//Subscribe
    subscribe(symbol) {
        this.socket.send(JSON.stringify({'type': 'subscribe', 'symbol': symbol}));
    }

// Unsubscribe
    unsubscribe(symbol) {
        this.socket.send(JSON.stringify({'type': 'unsubscribe', 'symbol': symbol}));
    }

//disconnect
    disconnect() {
        this.socket.close();
    }

    isOpen() {
        if (this && this.socket != null) {
            return this.socket.OPEN > 0;
        } else {
            return false;
        }
    }
}

export default Socket;