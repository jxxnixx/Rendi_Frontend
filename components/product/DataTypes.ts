// DataTypes.ts
export interface Product {
  productId: number;
  price: string;
  brandId: number;
  title: string;
  wishYN: string;
  imgUrls: string[];
  href: string;
}

export interface TasteProduct {
  productId: number;
  title: string;
  imgUrls: string[];
}
