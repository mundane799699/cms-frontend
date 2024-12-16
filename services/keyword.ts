import apiClient from "./apiClient";

export const getKeyword = () => {
  return apiClient.get("/system/keywords/getKeyword");
};

export const getHistory = () => {
  return apiClient.get("/system/keywords/list");
};
