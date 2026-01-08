
export interface Product {
  id: string;
  name: string;
  short_name?: string; // For navigation
  description: string;
  long_description?: string; // For the detail page
  price_rials: string;
  image_url: string; // Thumbnail/Main
  gallery: string[]; // Array of mixed media (videos/images) for the slider
  active: boolean;
  size: string;
  category: 'supplement' | 'skincare' | 'pets' | 'decor';
  benefits?: string[];
  video_url?: string;
  created_at?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  image?: string; // Base64 string for multimodal support
  timestamp: number;
}
