import axios from "axios";

export const api = axios.create({
  baseURL: "https://evolution.bigdates.com.br:3620",
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiConsultCnpj = axios.create({
  baseURL: "https://cnpj-api.bigdates.com.br/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});
