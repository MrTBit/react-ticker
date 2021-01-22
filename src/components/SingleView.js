import React from "react";
import {Button, Col, Row} from "react-bootstrap";

const SingleView = ({selectedSymbol, selectPrevious, selectNext}) => (
    <div style={{'margin-top': '10px'}}>
        <Row>
            <Col>
                <Button onClick={selectPrevious}>Prev</Button>
            </Col>
            <Col>
                {selectedSymbol.symbol}
                <br/>
                {selectedSymbol.price}
            </Col>
            <Col>
                <Button onClick={selectNext}>Next</Button>
            </Col>
        </Row>
    </div>
)

export default SingleView;