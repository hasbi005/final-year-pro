import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getFlights = async () => {
  const response = await API.get("/flights");
  return response.data;
};

export const getAircraft = async () => {
  const response = await API.get("/aircraft");
  return response.data;
};

export const getPredictions = async () => {
  const response = await API.get("/predictions");
  return response.data;
};

export const getReallocations = async () => {
  const response = await API.get("/reallocations");
  return response.data;
};

export const createReallocation = async (data) => {
  const response = await API.post(
    "/reallocations",
    data
  );

  return response.data;
};

export default API;