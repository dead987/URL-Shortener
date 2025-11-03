// url-api.js
import { apiClient } from "../../../shared/services/api-client";

export const urlApiCall = async (bigUrl) => {
  console.log("Big-url: ", bigUrl);
  try {
    const response = await apiClient.post("/short-url", { bigurl: bigUrl });
    return response.data; // return only the useful data
  } catch (error) {
    console.error("URL API Error: ", error);
    throw error;
  }
};

export const getAllUrls = async () => {
  try {
    const response = await apiClient.get("/short-url");
    return response.data;
  } catch (error) {
    console.error("Get URLs Error: ", error);
    throw error;
  }
};

export const updateUrlLabel = async (id, label) => {
  try {
    const response = await apiClient.patch(`/short-url/${id}`, { label });
    return response.data;
  } catch (error) {
    console.error('Update URL Error: ', error);
    throw error;
  }
};
