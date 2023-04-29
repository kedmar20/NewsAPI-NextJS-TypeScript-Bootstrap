export interface NewsArticle {
   author: string;
   title: string;
   description: string;
   url: string;
   image_url?: string | undefined;
   news_site: string;
   summary: string;
}

export interface NewsResponse {
   results: NewsArticle[];
}
