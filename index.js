// index.js
const { fetchMyIP, fetchCoordsByIP } = require('./iss');

let myIp;

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  myIp = ip;
  console.log('It worked! Returned IP:' , ip);
});

fetchCoordsByIP('23.17.65.5', (error, coords) => {
  if (error) {
    console.log('Error details:', error);
  } else {
    console.log(coords);
  }
});
