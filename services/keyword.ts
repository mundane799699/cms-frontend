import apiClient from "./apiClient";

export const getKeyword = () => {
  return apiClient.get("/system/keywords/getKeyword");
};
