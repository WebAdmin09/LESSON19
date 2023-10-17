import axios from "axios";

const request = axios.create({
  baseURL: "https://652d8b70f9afa8ef4b2799bc.mockapi.io/",
  timeout: 10000,
});

export default request;
