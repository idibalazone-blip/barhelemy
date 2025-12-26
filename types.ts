export type CategoryType = 'IMMOBILIER' | 'RESTAURATION';

export type RealEstateSubCategory = 
  | 'Hotel' | 'Motel' | 'Auberge' | 'SalleFete' | 'EspaceVert' 
  | 'SalleReunion' | 'AgentImmo' | 'Cinema' | 'Autre';

export type FoodSubCategory = 'Restaurant';

export interface User {
  id: string;
  name: string;
  role: 'admin' | 'user' | 'member';
  avatar?: string;
  username?: string;
  password?: string;
  phone?: string;
}

export interface Comment {
  id: string;
  user: string;
  text: string;
  date: string;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  category: CategoryType;
  subCategory: RealEstateSubCategory | FoodSubCategory;
  image: string;
  location: {
    city: string; // e.g., Douala, Yaoundé
    lat: number;
    lng: number;
    address: string;
  };
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
  };
  authorId: string;
  likes: number;
  isLiked: boolean;
  comments: Comment[];
  isAvailable: boolean;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  date: string;
  isRead: boolean;
  type: 'alert' | 'promo' | 'system';
}

export const ADMIN_IDS = ['admin1', 'admin2'];