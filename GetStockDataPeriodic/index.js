const getCodes = require("../src/codes");
const returnAsxDataAsync = require("../src/stock");

module.exports = function (context, myTimer) {
    var timeStamp = new Date().toISOString();
    
    if(myTimer.isPastDue)
    {
        context.log('JavaScript is running late!');
    }
    context.log('JavaScript timer trigger function ran!', timeStamp);   

    getCodes(context).then(async codes => {
        
        await returnAsxDataAsync(context, codes, (results) => {
            //do something
            context.bindings.outputBlob = results;
            context.bindings.outputHub = results;
            context.log("done");
            context.done();
        });

    }).catch(err => {
        context.log("Error Getting Codes");
        context.log(err);
    });

};