require('dotenv').config();
const axios = require('axios');
const ejs = require('ejs');

const W3W_API_ENDPOINT = 'https://api.what3words.com/v2';
const W3W_GEOCODE_URL = `${W3W_API_ENDPOINT}/forward`;
const W3W_REV_GEOCODE_URL = `${W3W_API_ENDPOINT}/reverse`;

const LEAFLET_TEMPLATE = './templates/leafletjs.ejs';
const ESRI_TEMPLATE = './templates/esrijs.ejs';
const GOOGLE_TEMPLATE = './templates/google.ejs';

/**
 * [loadTemplate description]
 * @param  {[type]}   data     [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
const loadTemplate = (data, callback) => {
  let filename;
  if (data.type && data.type === 'esri') {
    filename = ESRI_TEMPLATE;
  } else if (data.type && data.type === 'google') {
    filename = GOOGLE_TEMPLATE;
  } else {
    filename = LEAFLET_TEMPLATE;
  }
  const options = {};
  ejs.renderFile(filename, data, options, (err, str) => {
    if (err) {
      callback(null, {
        statusCode: 400,
        body: JSON.stringify(err)
      });
    } else {
      callback(null, {
        statusCode: 200,
        headers: {
          'Content-Type': 'text/html'
        },
        body: str
      });
    }
  });
};

/**
 * [geocode description]
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
const geocode = params => axios.get(W3W_GEOCODE_URL, {
  params
});

/**
 * [revgeocode description]
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
const revgeocode = params => axios.get(W3W_REV_GEOCODE_URL, {
  params
});

/**
 * entry point
 * @param  {[type]}   event    [description]
 * @param  {[type]}   context  [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
module.exports.what3wordsMap = (event, context, callback) => {
  if (!event.queryStringParameters) {
    callback(null, {
      statusCode: 400,
      body: {
        error: 400,
        message: 'Couldn\'t read query parameters',
      }
    });
    return;
  }
  const w3wParams = event.queryStringParameters;
  w3wParams.key = process.env.W3W_API_KEY;
  let p;
  if (w3wParams.addr) {
    p = geocode(w3wParams);
  } else if (w3wParams.coords) {
    p = revgeocode(w3wParams);
  } else {
    callback(null, {
      statusCode: 400,
      body: {
        error: 400,
        message: 'MIssing required query parameters',
      }
    });
    return;
  }
  p.then((response) => {
    // console.log(response);
    const data = {
      lat: response.data.geometry.lat,
      lng: response.data.geometry.lng,
      w3w: response.data.words,
      type: event.queryStringParameters.type,
      googleKey: event.queryStringParameters.googleKey
    };
    loadTemplate(data, callback);
  }).catch((err) => {
    // console.log(err);
    callback(null, {
      statusCode: 400,
      body: JSON.stringify(err.data)
    });
  });
};
