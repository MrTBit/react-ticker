import {useState, useEffect} from "react";
import Socket from "./components/Socket";

const App = () => {
    const [tickerPriceMap, setTickerPriceMap] = useState(new Map([['BINANCE:BTCUSDT', 0], ['BINANCE:ETHUSDT', 0]]));
    const [socket, setSocket] = useState();

    useEffect(() => {
        setSocket( new Socket('wss://ws.finnhub.io?token=<TOKEN>', Array.from(tickerPriceMap.keys()), onSocketMessageReceived))
    }, [])

    const onSocketMessageReceived = (data) => {
        console.log(data);
    }

    const unsubscribe = (symbol) => {
        const tickerPriceMapToUpdate = new Map(tickerPriceMap);
        tickerPriceMapToUpdate.delete(symbol);
        setTickerPriceMap(tickerPriceMapToUpdate);
        socket.unsubscribe(symbol);
    }

    return (
      Array.from(tickerPriceMap.keys()).map(key => (
          <div key={key}>
              <button onClick={() => unsubscribe(key)}>Unsubscribe from: {key}</button>
          </div>
      ))
    );

}

export default App;
