const request = require("async-request");
const asyncLib = require("async");

module.exports = returnAsxDataAsync;

async function returnAsxDataAsync (context, codes, callback ) {
    asyncLib.mapLimit(codes, 50, async (c) => {
        // console.log(`GET data for ${c.name}, code: ${c.code}`)
        if (c && c.code && c.code !== "") {
            var res = await request(`https://www.asx.com.au/asx/1/share/${c.code}`);
            if(res.statusCode == 200) {
                var x = JSON.parse(res.body);
                // console.log(`Got data for code ${x.code}`);
                return x;

            } else {
                context.log(`There was an error getting code ${c.code}`);
            }
        }
    }, (err, results) => {
        context.log("Finished");
        results = results.filter(n=>n); // filter null values
        context.log(`There are ${results.length} results`);
        
        callback(results);
    });
}