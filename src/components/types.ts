export interface IGoodsItem {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  isInCart?: boolean;
  countInCart?: number;
}

export interface Itest {
  id: number;
  countInCart: number;
}

export interface IFilters {
  category: string[],
  brand: string[],
  minPrice: number,
  maxPrice: number,
  minRating: number,
  maxRating: number,
  sortBy: string,
  contains: string,
  view: viewType,  
}

export type viewType = 'cube' | 'list';

export interface IGoodInCart {
  count: number,
  item: IGoodsItem | undefined,
}
