import React, {useEffect, useState} from "react";
import {AsyncTypeahead} from "react-bootstrap-typeahead";
import {Col} from "react-bootstrap";
import './AppBar.scss';

const AppBar = ({symbols, selectSymbol}) => {

    const [selected, setSelected] = useState([]);
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        if (!symbols.length) {
            setIsDisabled(true);
            setIsLoading(true);
        } else if (isDisabled) {
            setIsDisabled(false);
            setIsLoading(false);
        }
    }, [symbols, isDisabled])

    const onSymbolSelected = (selection) => {
        setSelected(selection);
        if (selection[0]) {
            selectSymbol(selection[0].symbol);
        }
    }

    const handleSearch = (query) => {
        if (!symbols.isEmpty) {
            setIsLoading(true);

            setFilteredOptions(symbols.filter(symbolModel =>
                (symbolModel.symbol.toLowerCase().includes(query.toLowerCase())) ||
                (symbolModel.name.toLowerCase().includes(query.toLowerCase()))
            ));

            setIsLoading(false);
        }
    }

    return (
        <Col>
                <AsyncTypeahead
                    className={'flex'}
                    id="symbol-search-box"
                    labelKey="name"
                    filterBy={() => true}
                    options={filteredOptions}
                    placeholder={'Search for symbol...'}
                    minLength={1}
                    onSearch={handleSearch}
                    isLoading={isLoading}
                    onChange={(selection) => onSymbolSelected(selection)}
                    selected={selected}
                    disabled={isDisabled}
                    renderMenuItemChildren={(option) => (
                        <div>
                            {option.name}
                            <div>
                                <small>Symbol: {option.symbol}</small>
                            </div>
                        </div>
                    )}
                />
        </Col>
    );
}

export default AppBar;