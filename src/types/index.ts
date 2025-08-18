export interface Category {
  _id?: string;
  name: string;
  nameArabic: string;
  icon: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Dua {
  _id?: string;
  title: string;
  titleArabic: string;
  content: string;
  contentArabic: string;
  reference: string;
  referenceArabic: string;
  categories: string[]; // Category IDs
  isBookmarked?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  _id?: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message: string;
  error?: string;
}
