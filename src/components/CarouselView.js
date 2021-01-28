import React, { useState } from "react";
import {Carousel, Col, Row, Button} from "react-bootstrap";
import './CarouselView.css';
import '../App.css';
import {MdClear} from 'react-icons/md';

const CarouselView = ({items, changeItemName, removeItem}) => {

    const [clearIconState, setClearIconState] = useState(false);

    const priceColorClass = (percentChange) => {
        if (percentChange > 0) {
            return 'color-up';
        } else if (percentChange < 0) {
            return 'color-down';
        } else {
            return 'color-neutral';
        }
    }

    const itemNameToShow = (item) => item.name ? item.name : item.symbol;

    const inputFocus = (event) => {
        event.target.focus();
        event.target.select();
    };

    const inputKeyDown = (item, event) => {
        if (event.key === 'Enter') {
            event.target.blur();
            changeItemName(item, event.target.value);
        }
    }

    return (
        <Carousel className={'carousel-expand'}>
            {
                items.map(item => {
                    return (
                        <Carousel.Item key={item.symbol} onMouseEnter={() => setClearIconState(true)} onMouseLeave={() => setClearIconState(false)}>
                            <Row className={clearIconState ? 'clear-active-item-show' : 'clear-active-item-hide'}>
                                <Button type={null} className={'opaque-button'} onClick={() => removeItem(item.symbol)}>
                                    <MdClear/>
                                </Button>
                            </Row>
                            <Row className={'carousel-title'}>
                                <Col>
                                    <input className={'title-input'}
                                           size={itemNameToShow(item).length}
                                           defaultValue={itemNameToShow(item)}
                                           onFocus={inputFocus}
                                           onKeyDown={(event) => inputKeyDown(item, event)}
                                    />
                                </Col>
                            </Row>
                            <Carousel.Caption className={'carousel-caption ' + priceColorClass(item.percentChange)}>
                                ${item.price.toFixed(2)}
                            </Carousel.Caption>
                        </Carousel.Item>
                    )
                })
            }
        </Carousel>
    );
}

export default CarouselView;