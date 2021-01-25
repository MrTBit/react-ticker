import React from "react";
import {Carousel, Col, Row} from "react-bootstrap";
import './CarouselView.css';
import '../App.css'

const CarouselView = ({items, changeItemName}) => {

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
                    const ref = React.createRef();
                    return (<Carousel.Item key={item.symbol}>
                            <Row className={'carousel-title'}>
                                <Col>
                                    <input ref={ref}
                                           className={'title-input'}
                                           size={itemNameToShow(item).length - 1}
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