var moment = require('moment');

const { emulatePayload } = require('./test');

let emulatesCount = 10;
const countOfRequestsPerEmulation = 100;
const promises = [];

const startDate = moment();
for(let i = 0; i < emulatesCount; i++) {
    const promise = emulatePayload(countOfRequestsPerEmulation);
    
    promises.push(promise);
}

Promise.all(promises).then(() => {
    console.log("\n\n\nDONE emulation");

    const endDate = moment();

    var secondsDiff = endDate.diff(startDate, 'milliseconds')
    console.log("Time(ms): ", secondsDiff);
});