import axios from "axios";
import { getItem, addItem, removeItem } from "./LocalStorage";

export function hasAuthenticated() {
  const token = getItem("token");
  const result = token ? true : false;

  if (result === false) {
    removeItem("token");
  }
  return result;
}

export function login(credentials) {
  return axios
    .post("http://localhost:5002/auth/checkCredentials", credentials)
    .then((res) => res.data)
    .then((resToken) => {
      addItem("token", resToken);
      return true;
    });
}

//Réauthentifie l'admin pour permettre la modification de ses infos
export function relog(credentials) {
  return axios
    .post("http://localhost:5002/auth/checkCredentials", credentials)
    .then((res) => {
      if (res.status == 403) return false;
      else return true;
    });
}

export function checkToken(token, setAccess, navigate) {
  return axios
    .post("http://localhost:5002/auth/checkToken", "", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      setAccess(res.data.access);
      if (res.status == 403) navigate("/login");
    })
    .catch((err) => {
      console.log(err);
      setAccess(false);
      navigate("/login");
    });
}

export function logout() {
  removeItem("token");
}

// function tokenIsValid(token) {
//   const { exp: expiration } = jwtDecode(token)

//   if (expiration * 1000 > new Date().getTime()) {
//     return true
//   }
//   return false
// }
