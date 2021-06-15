class Randomizer {
    static getNumber(minValue, maxValue) {
        return Math.floor(Math.random() * (maxValue - minValue)) + minValue;
    }
}

export default Randomizer;
