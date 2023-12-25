import { userHelper } from "./userHelper.js";

const BASE_URL = "https://parseapi.back4app.com/";
const API_KEY = "xeutwAtn8ZeXttEUU2NXqD7lKGoYTWJKI9Qd2aLz";
const APPLICATION_ID = "dsqj3YqNKTRTlyzFZmhrRqdtW2JVahkOphsxgh1G";

async function requester(url, method, data) {
  const option = {
    method,
    headers: {
      "X-Parse-Application-Id": APPLICATION_ID,
      "X-Parse-REST-API-Key": API_KEY,
    },
  };

  const userData = userHelper.getUserData();

  if (userData) {
    option.headers["X-Parse-Session-Token"] = userData.sessionToken;
  }

  if (data) {
    option.headers["Content-Type"] = "application/json";
    option.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(BASE_URL + url, option);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    if (response.status === 204) {
      return response;
    }

    return response.json();
  } catch (err) {
    throw new Error(err);
  }
}

async function get(url) {
  return await requester(url, "GET");
}

async function post(url, data) {
  return await requester(url, "POST", data);
}

async function put(url, data) {
  return await requester(url, "PUT", data);
}

async function del(url) {
  return await requester(url, "DELETE");
}

export const api = {
  get,
  post,
  put,
  del,
};
