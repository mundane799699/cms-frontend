import apiClient from "./apiClient";

export const updateDescription = (description: string) => {
  return apiClient.post("/system/user/profile/updateDescription", {
    description,
  });
};

export const updateAvatar = (file: File) => {
  const formData = new FormData();
  formData.append("avatarfile", file);

  return apiClient.post("/system/user/profile/avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
