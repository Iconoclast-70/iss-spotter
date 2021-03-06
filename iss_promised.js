const request = require('request-promise-native');

const fetchMyIP = function() {
  // use request to fetch IP address from JSON API
  return request(`https://api.ipify.org?format=json`);
};

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${ip}`);
};

const fetchISSFlyOverTimes = function(body) {
  let lat = JSON.parse(body).latitude;
  let lon = JSON.parse(body).longitude;
  return request(`http://api.open-notify.org/iss/v1/?lat=${lat}&lon=${lon}`);
};

const nextISSTimesForMyLocation = function() {
  fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(body => {
      let flyover = JSON.parse(body).response;
      for (const times in flyover) {
        let flyoverDate = new Date(0);
        flyoverDate.setUTCSeconds(flyover[times].risetime);
        console.log(`Next pass at ${flyoverDate} for ${flyover[times].duration} seconds`);
      }
    })
    .catch((error) => {
      console.log("It didn't work: ", error.message);
    });
};

module.exports = { nextISSTimesForMyLocation };