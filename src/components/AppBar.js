import React, {useState} from "react";
import {Typeahead} from "react-bootstrap-typeahead";
import {Col, Row} from "react-bootstrap";

const AppBar = ({symbols, selectSymbol}) => {

    const [selected, setSelected] = useState([]);

    const filterByFields = ['name', 'symbol'];

    const onSymbolSelected = (selection) => {
        setSelected(selection);
        if (selection[0]) {
            selectSymbol(selection[0].symbol);
        }
    }

    return (
        <Row>
            <Col>
                <Typeahead
                    id="symbol-search-box"
                    labelKey="name"
                    filterBy={filterByFields}
                    options={symbols}
                    placeholder={'Search for symbol...'}
                    renderMenuItemChildren={(option) => (
                        <div>
                            {option.name}
                            <div>
                                <small>Symbol: {option.symbol}</small>
                            </div>
                        </div>
                    )}
                    onChange={(selection) => onSymbolSelected(selection)}
                    selected={selected}
                />
            </Col>
        </Row>
    );
}

export default AppBar;