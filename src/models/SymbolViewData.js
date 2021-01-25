class SymbolViewData {
    constructor(symbol, price, percentChange, name = null) {
        this.symbol = symbol;
        this.price = price;
        this.percentChange = percentChange;
        this.name = name;
    }
}

export default SymbolViewData;