import {useState} from "react";
import Socket from "./services/Socket";
import UnsubscribeSelector from "./components/UnsubscribeSelector";
import ConnectDisconnect from "./components/ConnectDisconnect";
import DataModel from "./models/DataModel";
const App = () => {
    const [tickerPriceMap, setTickerPriceMap] = useState(new Map([['BINANCE:BTCUSDT', 0], ['BINANCE:ETHUSDT', 0]]));
    const [socket] = useState(new Socket());
    const [socketOpen, setSocketOpen] = useState(false);

    const url = 'wss://ws.finnhub.io?token=' + process.env.REACT_APP_API_KEY;

    const onSocketMessageReceived = (data) => {
        const dataModels = JSON.parse(data).data.map(apiObject => DataModel.fromApiObject(apiObject));
        console.log(dataModels);
    }

    const onSocketClosed = () => setSocketOpen(false);

    const onSocketOpened = () => {
        Array.from(tickerPriceMap.keys()).forEach((symbol) => {
            socket.subscribe(symbol);
        });
        setSocketOpen(true);
    }

    const unsubscribe = (symbol) => {
        const tickerPriceMapToUpdate = new Map(tickerPriceMap);
        tickerPriceMapToUpdate.delete(symbol);
        setTickerPriceMap(tickerPriceMapToUpdate);
        socket.unsubscribe(symbol);
    }

    return (
        <div>
            <UnsubscribeSelector unsubscribe={(symbol) => unsubscribe(symbol)}
                                 symbols={Array.from(tickerPriceMap.keys())}
            />
            <ConnectDisconnect connect={() => socket.connect(url, onSocketOpened, onSocketMessageReceived, onSocketClosed)}
                               disconnect={() => socket.disconnect()}
                               socketOpen={socketOpen}
            />
        </div>
    );

}

export default App;
