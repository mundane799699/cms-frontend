import apiClient from "./apiClient";

export const uploadFile = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  return apiClient.post("/common/upload", formData);
};
