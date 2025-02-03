import apiClient from "./apiClient";

export const toggleArticleFavorite = async (
  articleId: number,
  isFavorite: boolean,
  type: number
) => {
  return apiClient.post(`/system/favorite/toggle`, {
    status: isFavorite ? 1 : 0,
    type,
    articleId,
  });
};

export const getFavoriteList = async () => {
  return apiClient.get(`/system/favorite/all`, {
    params: {
      status: 1,
    },
  });
};
