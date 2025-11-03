// user-api.js
import {apiClient} from "../../../shared/services/api-client.js";

export const registerUser = async (data) => {
  try {
    const response = await apiClient.post('/register', data);
    return response;
  } catch (error) {
    console.log("Error",error);
    throw error;
  }
};

export const loginUser = async (data) => {
  try {
    const response = await apiClient.post("/login", data);
    return response;
  } catch (error) {
    console.log("Error",error);
    throw error;
  }
};
