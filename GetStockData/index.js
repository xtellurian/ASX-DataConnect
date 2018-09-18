const getCodes = require("../src/codes");
const returnAsxDataAsync = require("../src/stock");

module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    getCodes(context).then(async codes => {

        await returnAsxDataAsync( context, codes, (results) => {
            context.res = {
                status: 200,
                body: results
            }
    
            context.done();
        });

    }).catch(err => {
        context.log("Error Getting Codes");
        context.log(err);
    });

};
