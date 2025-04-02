export interface NewsItem {
  title: string;
  description: string;
  content: string;
  url: string;
  image_url: string | null;
  source_id: string;
  category: string[];
  published_at: string;
}
