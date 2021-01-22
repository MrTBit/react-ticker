import React, {useState} from "react";
import SingleView from "./SingleView";

const View = ({viewDataObjects}) => {
    const [selectedSymbolIndex, setSelectedSymbolIndex] = useState(0);

    const selectNextSymbol = () => {
        if (selectedSymbolIndex === viewDataObjects.length -1) {
            setSelectedSymbolIndex(0);
        } else {
            setSelectedSymbolIndex(selectedSymbolIndex + 1);
        }
    }

    const selectPreviousSymbol = () => {
        if (selectedSymbolIndex === 0) {
            setSelectedSymbolIndex(viewDataObjects.length - 1);
        } else {
            setSelectedSymbolIndex(selectedSymbolIndex-1);
        }
    }

    return (
        <div>
            <SingleView selectedSymbol={viewDataObjects[selectedSymbolIndex]}
                        selectNext={() => selectNextSymbol()}
                        selectPrevious={() => selectPreviousSymbol()}
            />
        </div>
    )
}

export default View;