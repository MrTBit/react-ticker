class DataModel {
    constructor(symbol, price, time, volume) {
        this.symbol = symbol;
        this.price = price;
        this.time = time;
        this.volume = volume;
    }

    static fromApiObject(apiObject) {
        return new DataModel(apiObject.s, apiObject.p, new Date(apiObject.t), apiObject.v);
    }
}

export default DataModel;