export interface ProjectArticle {
  id: number;
  projectId: number;
  title: string;
  content: string;
  publishDate: string;
  coverImage: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
}
