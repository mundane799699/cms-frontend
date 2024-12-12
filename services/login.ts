import apiClient from "./apiClient";

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
