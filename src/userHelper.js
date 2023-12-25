function getUserData() {
  return JSON.parse(sessionStorage.getItem("userData"));
}

function setUserData(userData) {
  return sessionStorage.setItem("userData", JSON.stringify(userData));
}

function getUserId() {
  const userData = getUserData();
  return userData.objectId;
}

function getUserToken() {
  const userData = getUserData();
  return userData.sessionToken;
}

function removeUserData(userData) {
  return sessionStorage.removeItem("userData");
}

export const userHelper = {
  getUserData,
  setUserData,
  getUserId,
  removeUserData,
};
