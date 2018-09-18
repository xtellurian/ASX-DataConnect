const request = require("async-request");
module.exports = getCodesAsync;


var reg = /[A-Z0-9]{3}(?:List)?/gi

async function getCodesAsync() {
    console.log('getting');
    var response = await request("https://www.asx.com.au/asx/research/ASXListedCompanies.csv");
    if (response.code > 299) {
        console.log("ERROR");
    }
    var listings = response.body.split('\n');
    console.log(`Got ${listings.length} stock listings from ASX`);
    var data = [];
    console.log(listings[0]);
    for (let index = 1; index < listings.length; index++) {
        var lines = listings[index].split(',');
        if (lines && lines[1]) {
            var code = lines[1].match(reg);
            if (code) {
                data.push({ name: lines[0], code: code, class: lines[3] });
            } else {
                console.log(`bad code ${lines[1]} at index ${index}`);
            }
        }
    }

    return data;
}

