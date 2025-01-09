import apiClient from "./apiClient";

export const getProjectList = () => {
  return apiClient.get("/system/project/all");
};
