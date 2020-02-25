"use strict";

//Require exios
const axios = require("axios");

//Our module exports which will get the token using our client id, secret, grant type and redirect uri
module.exports.getAccessToken = async event => {
  const MEETUP_OAUTH_URL =
    "https://secure.meetup.com/oauth2/access" +
    "?client_id=8ve7uhod2no3bti56p8lfc6ncn" +
    "&client_secret=envomcfk6pcv9mlmdvb2eu5gpr" +
    "&grant_type=authorization_code" +
    "&redirect_uri=https://marktiddy.github.io/" +
    "&code=" +
    event.pathParameters.code;

  //Here's a const which calls Axios to send the post request
  const info = await axios.post(MEETUP_OAUTH_URL);

  //Here's what we return, a status code and JSON body
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify({
      access_token: info.data.access_token,
      refresh_token: info.data.refresh_token
    })
  };
};

module.exports.refreshAccessToken = async event => {
  const MEETUP_OAUTH_URL =
    "https://secure.meetup.com/oauth2/access" +
    "?client_id=8ve7uhod2no3bti56p8lfc6ncn" +
    "&client_secret=envomcfk6pcv9mlmdvb2eu5gpr" +
    "&grant_type=refresh_token" +
    "&refresh_token=" +
    event.pathParameters.token;

  const info = await axios.post(MEETUP_OAUTH_URL);

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify({
      access_token: info.data.access_token,
      refresh_token: info.data.refresh_token
    })
  };
};
