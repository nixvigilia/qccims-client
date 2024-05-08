import axios from "axios";

const clientApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CLIENT_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const serverApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
    "Client-Token": process.env.NEXT_PUBLIC_CLIENT_TOKEN,
  },
});

export {clientApi, serverApi};
