// index.js
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

//http://api.open-notify.org/iss/v1/

let myIp;
let latLong = {latitude: "51.0207", longitude: "-114.1011" };

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
    latLong = coords;
    console.log(coords);
  }
});

fetchISSFlyOverTimes(latLong, (error, passTimes) => {
  if (error) {
    console.log('Error details:', error);
  } else {
    console.log(passTimes);
  }
});
