const percentChange = (value1, value2) => {
    return ((value2 - value1)/(Math.abs(value1))) * 100;
}

export default percentChange;