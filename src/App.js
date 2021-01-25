import React, {useState} from "react";
import Socket from "./services/Socket";
import UnsubscribeSelector from "./components/UnsubscribeSelector";
import ConnectDisconnect from "./components/ConnectDisconnect";
import DataModel from "./models/DataModel";
import SymbolViewData from "./models/SymbolViewData";
import percentChange from "./utils/MathUtils";
import View from "./components/View";
import {Col, Container, Row} from "react-bootstrap";
import _ from "lodash";
import './App.css';

const App = () => {
    const [tickerData, setTickerData] = useState([new SymbolViewData('BINANCE:BTCUSDT', -1), new SymbolViewData('BINANCE:ETHUSDT', -1)]);
    const [socket] = useState(new Socket());
    const [socketOpen, setSocketOpen] = useState(false);

    const url = 'wss://ws.finnhub.io?token=' + process.env.REACT_APP_API_KEY;

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

    const onSocketClosed = () => setSocketOpen(false);

    const onSocketOpened = () => {

        tickerData.forEach(symbolViewData => {
            socket.subscribe(symbolViewData.symbol);
        });

        setSocketOpen(true);
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
                    <Col>
                        <UnsubscribeSelector unsubscribe={(symbol) => unsubscribe(symbol)}
                                             symbols={tickerData.map(symbolViewData => symbolViewData.symbol)}
                        />
                    </Col>
                    <Col>
                        <ConnectDisconnect
                            connect={() => socket.connect(url, onSocketOpened, onSocketMessageReceived, onSocketClosed)}
                            disconnect={() => socket.disconnect()}
                            socketOpen={socketOpen}
                        />
                    </Col>
                </Row>
                <Row className={'view-height'}>
                    <View viewDataObjects={tickerData}
                          changeSymbolViewDataName={changeSymbolViewDataName}
                    />
                </Row>
            </Container>
    );

}

export default App;
