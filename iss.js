const request = require("request");

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request("https://api.ipify.org?format=json", (error, response, body) => {
    if (error) {
      callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const data = JSON.parse(body);
    if (data) {
      callback(null, data);
    } else {
      callback(`Error retrieving IP`, null);
    }
    
  });
};

const fetchCoordsByIP = function(ip, callback) {
  // use request to fetch coordinates from https://freegeoip.app/
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const data = JSON.parse(body);
    
    if (data) {
      let coords = {};
      coords.latitude = data.latitude;
      coords.longitute = data.longitude;
      callback(null, coords);
    } else {
      callback(`Error retrieving coordinates`, null);
    }
    
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {

  request(`http://api.open-notify.org/iss/v1/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {

    console.log(`LATITUDE ${coords.latitude} LONGITUDE ${coords.longitude}`);

    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching flyover times. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const flyoverTimes = JSON.parse(body);
    if (flyoverTimes) {
      callback(null, flyoverTimes.response);
    } else {
      callback(`Error retrieving flyovertimes`, null);
    }
    
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };