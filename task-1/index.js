const fs = require("fs");
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const addedRates = JSON.parse(fs.readFileSync("new-rates.json", "utf-8"));

const convertedUnits = [];

const conversionRates = {
    m: {
        cm: 100,
        in: 39.3701,
        ft: 3.28084,
        yd: 1.09361,
    },
    cm: {
        m: 0.01,
        in: 0.393701,
        ft: 0.0328084,
        yd: 0.0109361,
    },
    in: {
        m: 0.0254,
        cm: 2.54,
        ft: 0.0833333,
        yd: 0.0277778,
    },
    ft: {
        m: 0.3048,
        cm: 30.48,
        in: 12,
        yd: 0.333333,
    },
};

Object.assign(conversionRates, addedRates);

const convertor = (data) => {
    for (let i = 0; i < data.examples.length; i++) {
        const { distance, convertTo } = data.examples[i];
        const { unit, value } = distance;

        if (unit === convertTo) {
            return {
                unit: unit,
                value: value,
            };
        }

        let convertedValue;

        if (conversionRates[unit][convertTo]) {
            convertedValue = value * conversionRates[unit][convertTo];
        } else if (conversionRates[convertTo][unit]) {
            convertedValue = value / conversionRates[convertTo][unit];
        } else {
            throw new Error("Unknown units");
        }

        convertedUnits[i] = {
            unit: convertTo,
            value: convertedValue.toFixed(2),
        };
    }
    return convertedUnits;
};

convertor(data);
const result = JSON.stringify(convertedUnits, null, 4);
console.log(result);
