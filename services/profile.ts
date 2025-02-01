import apiClient from "./apiClient";

export const updateDescription = (description: string) => {
  return apiClient.post("/system/user/profile/updateDescription", {
    description,
  });
};
