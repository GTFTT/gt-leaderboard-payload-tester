const axios = require('axios');
var moment = require('moment')

const API = 'https://gt-leaderboard-api.herokuapp.com';
// users/{userId}/score

/**
 * 
 * @param {*} max 
 * @returns Random number from 0 to 'max'(not including)
 * @example
 * console.log(getRandomInt(3));
 * // expected output: 0, 1 or 2
 */
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

let successCount = 0;
const countOfRequests = 100;
const promises = [];

const startDate = moment();
for(let i = 0; i < countOfRequests; i++) {
    const promise = axios
        .post(`${API}/users/${1000 + i}/score`, {
            score: getRandomInt(201)-100, //Random value on range [-100, 100]
        })
        .then(res => {
            // console.log(`statusCode: ${res.status}`);
            if(res.status == 200) successCount++;
        })
        .catch(error => {
            console.error(error)
        });
    
    promises.push(promise);
}

Promise.all(promises).then(() => {
    const endDate = moment();

    var secondsDiff = endDate.diff(startDate, 'milliseconds')
    console.log("DONE;");
    console.log("Success count: ", successCount);
    console.log("Time(ms): ", secondsDiff);
});
