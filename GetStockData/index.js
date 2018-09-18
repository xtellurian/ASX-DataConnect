const getCodes = require("../src/codes");
const returnAsxDataAsync = require("../src/stock");

module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    getCodes().then(async codes => {

        await returnAsxDataAsync( codes, (results) => {
            context.res = {
                status: 200,
                body: results
            }
    
            context.done();
        });

    }).catch(err => {
        console.log("Error Getting Codes");
        console.log(err);
    });

};
