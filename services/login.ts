import apiClient from "@/services/apiClient";

export const login = (data: any) => {
  return apiClient.post("/login", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getInfo = () => {
  return apiClient.get("/getInfo");
};

export const logout = () => {
  return apiClient.post("/logout");
};
