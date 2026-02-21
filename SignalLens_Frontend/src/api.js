import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE
});

export const getStatus = () => API.get("/status");

export const getCompetitors = () => API.get("/competitors/");

export const addCompetitor = (data) =>
  API.post("/competitors/", data);

export const runCheck = (id) =>
  API.post(`/checks/${id}`);

export const getHistory = (id) =>
  API.get(`/checks/${id}`);
