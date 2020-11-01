import axios from "axios";
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "./types";

export function loginUser(dataToSubmit) {
  const request = axios
    .post("/api/users/login", dataToSubmit)
    .then((response) => response.data);

  //actionのdocumentを参考して設定
  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function registerUser(dataToSubmit) {
  const request = axios
    .post("/api/users/register", dataToSubmit)
    .then((response) => response.data);
  return {
    type: REGISTER_USER,
    payload: request,
  };
}

//getを使うため、上記のようにbodyは必要ない
export function auth() {
  const request = axios
    .get("/api/users/auth")
    .then((response) => response.data);
  return {
    type: AUTH_USER,
    payload: request,
  };
}
