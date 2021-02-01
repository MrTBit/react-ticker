import React, {useState, useEffect} from "react";
import Socket from "./services/Socket";
import DataModel from "./models/DataModel";
import SymbolViewData from "./models/SymbolViewData";
import percentChange from "./utils/MathUtils";
import View from "./components/View";
import {Container, Row} from "react-bootstrap";
import _ from "lodash";
import './App.css';
import {getAllSymbols, getLatestPrice} from "./services/FetchSymbols";
import AppBar from "./components/AppBar";

const App = () => {
    const [tickerData, setTickerData] = useState([new SymbolViewData('BINANCE:ETHUSDT', -1)]);
    const [socket] = useState(new Socket());
    const [searchModels, setSearchModels] = useState([]);

    const url = 'wss://ws.finnhub.io?token=' + process.env.REACT_APP_API_KEY;

    useEffect(() => {
        getAllSymbols().then(models => setSearchModels(models));
        socket.connect(url, onSocketOpened, onSocketMessageReceived, () => null);
    }, [])

    const onSocketMessageReceived = (data) => {

        let apiMessageJson = JSON.parse(data);
        let dataModels;
        if (apiMessageJson.type === 'trade') {
            dataModels = apiMessageJson.data.map(apiObject => DataModel.fromApiObject(apiObject)).sort((a, b) => b.time - a.time);
        } else {
            return;
        }


        //only update the state based on the previous state, not whatever garbage is the current state which probably hasn't updated yet
        setTickerData(prevState => {
            const tickerDataToUpdate = _.cloneDeep(prevState);

            //find the latest price for each tracked symbol
            prevState.forEach((symbolViewData, index) => {
                const latestApiData = dataModels.find(dataModel => dataModel.symbol === symbolViewData.symbol);
                if (latestApiData) {
                    tickerDataToUpdate[index] = new SymbolViewData(symbolViewData.symbol, latestApiData.price, percentChange(symbolViewData.price, latestApiData.price), symbolViewData.name);
                }
            });

            return tickerDataToUpdate;
        });
    }

    const onSocketOpened = () => {

        tickerData.forEach(symbolViewData => {
            socket.subscribe(symbolViewData.symbol);
        });

    }

    const subscribe = async (symbol) => {
        const tickerDataToUpdate = _.cloneDeep(tickerData);
        let initialPrice = -1;

        if (!symbol.includes(':')) { //if there's a ':' then it's crypto and the price doesn't need to be fetched
            initialPrice = await getLatestPrice(symbol);
        }

        tickerDataToUpdate.push(new SymbolViewData(symbol, initialPrice));
        setTickerData(tickerDataToUpdate);

        socket.subscribe(symbol);
    }

    const unsubscribe = (symbol) => {
        let tickerDataToUpdate = _.clone(tickerData);
        tickerDataToUpdate = tickerDataToUpdate.filter(symbolViewData => symbolViewData.symbol !== symbol);
        setTickerData(tickerDataToUpdate);
        socket.unsubscribe(symbol);
    }

    const changeSymbolViewDataName = (symbolViewDataToUpdate, newName) => {

        setTickerData(prevState => {
            let tickerDataToUpdate = _.cloneDeep(prevState);
            tickerDataToUpdate[tickerDataToUpdate.findIndex(symbolViewData => symbolViewData.symbol === symbolViewDataToUpdate.symbol)].name = newName;
            return tickerDataToUpdate;
        });

    }

    return (
            <Container fluid className={'height100 background-color'}>
                <Row className={'toolbar-height'}>
                    <AppBar
                        symbols={searchModels}
                        selectSymbol={subscribe}
                    />
                </Row>
                <Row className={'view-height'}>
                    <View viewDataObjects={tickerData}
                          changeSymbolViewDataName={changeSymbolViewDataName}
                          removeItem={unsubscribe}
                    />
                </Row>
            </Container>
    );
}

export default App;
