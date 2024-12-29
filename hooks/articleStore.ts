import { create } from "zustand";

type ArticleStore = {
  articles: any[];
  currentArticle: any;
  setArticles: (articles: any[]) => void;
  setCurrentArticle: (article: any) => void;
};

export const useArticleStore = create<ArticleStore>((set) => ({
  articles: [],
  currentArticle: null,
  setArticles: (articles) => set({ articles }),
  setCurrentArticle: (currentArticle) => set({ currentArticle }),
}));