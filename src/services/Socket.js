class Socket {

    constructor() {
        this.socket = null;
    }

    setupSocketListeners(onSocketOpen, onMessageReceived, onSocketClose) {
        // Connection opened
        this.socket.addEventListener('open', function (event) {
            onSocketOpen();
        });

        // Listen for messages
        this.socket.addEventListener('message', function (event) {
            onMessageReceived(event.data);
        });

        //Listen for socket close
        this.socket.addEventListener('close', () => onSocketClose());
    }

    //connect
    connect(url, onSocketOpen, onMessageReceived, onSocketClose) {
        this.socket = new WebSocket(url);
        this.setupSocketListeners(onSocketOpen, onMessageReceived, onSocketClose);
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
}

export default Socket;