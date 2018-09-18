const getCodes = require("../src/codes");
const getAsxDataAsync = require("../src/stock");

module.exports = function (context, myTimer) {
    var timeStamp = new Date().toISOString();
    
    if(myTimer.isPastDue)
    {
        context.log('JavaScript is running late!');
    }
    context.log('JavaScript timer trigger function ran!', timeStamp);   

    getCodes().then(async codes => {
        
        await getAsxDataAsync(codes, (results) => {
            //do something
            context.bindings.outputBlob = results;
            console.log("done");
            context.done();
        });

    }).catch(err => {
        console.log("Error Getting Codes");
        console.log(err);
    });

};