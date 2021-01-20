import React from 'react'
import {Button} from 'react-bootstrap'

const UnsubscribeSelector = ({symbols, unsubscribe}) => {

    return (
        symbols.map(symbol => (
            <div key={symbol}>
                <Button onClick={() => unsubscribe(symbol)}>Unsubscribe from: {symbol}</Button>
            </div>
        ))
    );
}

export default UnsubscribeSelector;