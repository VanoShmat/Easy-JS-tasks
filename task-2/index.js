const fs = require("fs");
const json = JSON.parse(fs.readFileSync("data.json", "utf-8"));

function processData(json) {
    const { data, condition } = json;
    let result = data;

    if (condition.include) {
        for (let i = 0; i < condition.include.length; i++) {
            let key = Object.keys(condition.include[i])[0];
            let value = condition.include[i][key];
            result = result.filter((item) => item[key] === value);
        }
    }

    if (condition.exclude) {
        for (let i = 0; i < condition.exclude.length; i++) {
            let key = Object.keys(condition.exclude[i])[0];
            let value = condition.exclude[i][key];
            result = result.filter((item) => item[key] !== value);
        }
    }

    if (condition.sortBy) {
        result.sort((a, b) => {
            for (let i = 0; i < condition.sortBy.length; i++) {
                let key = condition.sortBy[i];
                if (a[key] < b[key]) {
                    return -1;
                } else if (a[key] > b[key]) {
                    return 1;
                }
            }
            return 0;
        });
    }

    return result;
}

const filteredData = processData(json);
console.log(filteredData);
