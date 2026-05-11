export type Category = 'All' | 'Chai & Drinks' | 'Bites & Snacks' | 'Main Course' | 'Desserts' | 'Combos';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  isVeg: boolean;
  isMustTry?: boolean;
  emoji: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  quote: string;
}
