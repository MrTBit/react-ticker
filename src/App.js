import {useState} from "react";
import Socket from "./services/Socket";
import UnsubscribeSelector from "./components/UnsubscribeSelector";
import ConnectDisconnect from "./components/ConnectDisconnect";

const App = () => {
    const [tickerPriceMap, setTickerPriceMap] = useState(new Map([['BINANCE:BTCUSDT', 0], ['BINANCE:ETHUSDT', 0]]));
    const [socket] = useState(new Socket());
    const [socketOpen, setSocketOpen] = useState(false);

    const url = 'wss://ws.finnhub.io?token=c035nmn48v6v2t3i3n00';

    const onSocketMessageReceived = (data) => {
        console.log(data);
    }

    const unsubscribe = (symbol) => {
        const tickerPriceMapToUpdate = new Map(tickerPriceMap);
        tickerPriceMapToUpdate.delete(symbol);
        setTickerPriceMap(tickerPriceMapToUpdate);
        socket.unsubscribe(symbol);
    }

    const connectSocket = () => {
        socket.connect(url, Array.from(tickerPriceMap.keys()), onSocketMessageReceived);
        setSocketOpen(socket.isOpen());
    }

    const disconnectSocket = () => {
        socket.disconnect();
        setSocketOpen(socket.isOpen());
    }

    return (
        <div>
            <UnsubscribeSelector unsubscribe={(symbol) => unsubscribe(symbol)}
                                 symbols={Array.from(tickerPriceMap.keys())}
            />
            <ConnectDisconnect connect={() => connectSocket()}
                               disconnect={() => disconnectSocket()}
                               socketOpen={socketOpen}
            />
        </div>
    );

}

export default App;
