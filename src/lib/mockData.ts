import { Category, Dua } from '@/types';

// Mock data for testing when MongoDB is not available
export const mockCategories: Category[] = [
  {
    _id: '1',
    name: 'Morning Prayers',
    nameArabic: 'أدعية الصباح',
    icon: '🌅',
    description: 'Duas for the morning',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '2',
    name: 'Evening Prayers',
    nameArabic: 'أدعية المساء',
    icon: '🌙',
    description: 'Duas for the evening',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const mockDuas: Dua[] = [
  {
    _id: '1',
    title: 'Morning Dua',
    titleArabic: 'دعاء الصباح',
    content: 'O Allah, by You we enter the morning and by You we enter the evening...',
    contentArabic: 'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا...',
    reference: 'Abu Dawud',
    referenceArabic: 'أبو داود',
    categories: ['1'],
    isBookmarked: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Mock data service
export class MockDataService {
  private categories: Category[] = [...mockCategories];
  private duas: Dua[] = [...mockDuas];

  async getCategories(): Promise<Category[]> {
    return Promise.resolve(this.categories);
  }

  async getDuas(): Promise<Dua[]> {
    return Promise.resolve(this.duas);
  }

  async createCategory(categoryData: Omit<Category, '_id' | 'createdAt' | 'updatedAt'>): Promise<Category> {
    const newCategory: Category = {
      ...categoryData,
      _id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.categories.push(newCategory);
    return Promise.resolve(newCategory);
  }

  async createDua(duaData: Omit<Dua, '_id' | 'createdAt' | 'updatedAt'>): Promise<Dua> {
    const newDua: Dua = {
      ...duaData,
      _id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.duas.push(newDua);
    return Promise.resolve(newDua);
  }
}
