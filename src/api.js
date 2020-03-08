import { mockEvents } from "./mock-events";
import axios from "axios";
//File to be a placeholder for the real api

async function getOrRenewAccessToken(type, key) {
  let url;
  if (type === "get") {
    url =
      "https://h5gxqq7w59.execute-api.eu-central-1.amazonaws.com/dev/api/token/" +
      key;
  } else if (type === "renew") {
    url =
      "https://h5gxqq7w59.execute-api.eu-central-1.amazonaws.com/dev/api/refresh/" +
      key;
  }

  //Use axios to make the request
  const tokenInfo = await axios.get(url);

  //Save the tokens
  localStorage.setItem("access_token", tokenInfo.data.access_token);
  localStorage.setItem("refresh_token", tokenInfo.data.refresh_token);
  localStorage.setItem("last_saved_time", Date.now());

  //Return the token
  return tokenInfo.data.access_token;
}

async function getAccessToken() {
  //Get token from local storage
  const accessToken = localStorage.getItem("access_token");

  //If there's no token
  if (!accessToken) {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");

    //if there's no code
    if (!code) {
      window.location.href =
        "https://secure.meetup.com/oauth2/authorize?client_id=8ve7uhod2no3bti56p8lfc6ncn&response_type=code&redirect_uri=https://marktiddy.github.io/hangout/";
      return null;
    }
    //there's a code but no access token
    return getOrRenewAccessToken("get", code);
  }
  //check the access token is valid
  const lastSavedTime = localStorage.getItem("last_saved_time");
  if (accessToken && Date.now() - lastSavedTime < 3600000) {
    return accessToken;
  } else {
    //Access token is expired so we need to renew it
    const refreshToken = localStorage.getItem("refresh_token");
    return getOrRenewAccessToken("renew", refreshToken);
  }
}

async function getSuggestions(query) {
  if (window.location.href.startsWith("http://localhost")) {
    return [
      {
        city: "Munich",
        country: "de",
        localized_country_name: "Germany",
        name_string: "Munich, Germany",
        zip: "meetup3",
        lat: 48.14,
        lon: 11.58
      },
      {
        city: "Munich",
        country: "us",
        localized_country_name: "USA",
        state: "ND",
        name_string: "Munich, North Dakota, USA",
        zip: "58352",
        lat: 48.66,
        lon: -98.85
      }
    ];
  }

  //This means we're live
  const token = await getAccessToken();
  if (token) {
    const url =
      "https://api.meetup.com/find/locations?&sign=true&photo-host=public&query=" +
      query +
      "&access_token=" +
      token;
    const result = await axios.get(url);
    return result.data;
  }
  return [];
}

async function getEvents(lat, lon) {
  if (window.location.href.startsWith("http://localhost")) {
    return mockEvents.events;
  }

  if (!navigator.onLine) {
    const events = localStorage.getItem("lastEvents");
    return JSON.parse(events);
  }

  const token = await getAccessToken();

  if (token) {
    let url =
      "https://api.meetup.com/find/upcoming_events?&sign=true&photo-host=public" +
      "&access_token=" +
      token;
    if (lat && lon) {
      url += "&lat=" + lat + "&lon=" + lon;
    }
    const result = await axios.get(url);
    const events = result.data.events;
    if (events.length) {
      localStorage.setItem("lastEvents", JSON.stringify(events));
    }
    return events;
  }
}

export { getSuggestions, getEvents };
