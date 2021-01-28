import React from "react";
import CarouselView from "./CarouselView";

const View = ({viewDataObjects, changeSymbolViewDataName, removeItem}) => {

    return (
        <CarouselView items={viewDataObjects}
                      changeItemName={changeSymbolViewDataName}
                      removeItem={removeItem}
        />
    )
}

export default View;