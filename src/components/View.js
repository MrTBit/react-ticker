import React from "react";
import CarouselView from "./CarouselView";

const View = ({viewDataObjects, changeSymbolViewDataName}) => {

    return (
        <CarouselView items={viewDataObjects}
                      changeItemName={changeSymbolViewDataName}
        />
    )
}

export default View;