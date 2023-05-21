import React, { useState } from "react";
import Dropdown from "./dropdown";
import SDropdown from "./sdropdown";

interface Product {
  id: number;
  name: string;
  category: string;
  color: string;
  price: number;
  popularity: number;
}

interface ProdlistProps {
  products: Product[]; // 상품 목록 배열
}

enum SortOrder {
  Recommended = "recommended", // 추천순
  Popularity = "popularity", // 인기순
  PriceLowToHigh = "priceLowToHigh", // 낮은 가격순
}

export default function Prodlist({ products }: ProdlistProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // 선택된 카테고리 배열 상태
  const [selectedColors, setSelectedColors] = useState<string[]>([]); // 선택된 색상 배열 상태
  const [selectedSortOrder, setSelectedSortOrder] = useState(
    SortOrder.Recommended
  ); // 선택된 정렬 순서 상태

  // 카테고리 선택 콜백 함수
  const handleCategorySelect = (selectedItems: string[]) => {
    setSelectedCategories(selectedItems);
  };

  // 색상 선택 콜백 함수
  const handleColorSelect = (selectedItems: string[]) => {
    setSelectedColors(selectedItems);
  };

  // 정렬 순서 선택 콜백 함수
  const handleSortOrderSelect = (selectedOrder: SortOrder) => {
    setSelectedSortOrder(selectedOrder);
  };

  // 카테고리와 색상으로 상품 필터링 함수
  const filterProducts = (): Product[] => {
    if (selectedCategories.length === 0 && selectedColors.length === 0) {
      // 선택된 카테고리와 색상이 없을 경우 모든 상품 반환
      return products;
    }

    return products.filter((product) => {
      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(product.category)
      ) {
        // 선택된 카테고리 중에 해당 상품의 카테고리가 포함되지 않을 경우 필터링
        return false;
      }

      if (
        selectedColors.length > 0 &&
        !selectedColors.includes(product.color)
      ) {
        // 선택된 색상 중에 해당 상품의 색상이 포함되지 않을 경우 필터링
        return false;
      }

      return true; // 카테고리와 색상이 모두 일치하는 상품 반환
    });
  };

  // 정렬 순서에 따라 상품 정렬 함수
  const sortProducts = (filteredProducts: Product[]): Product[] => {
    switch (selectedSortOrder) {
      case SortOrder.Popularity:
        return filteredProducts.sort((a, b) => b.popularity - a.popularity);
      case SortOrder.PriceLowToHigh:
        return filteredProducts.sort((a, b) => a.price - b.price);
      default:
        return filteredProducts;
    }
  };

  const filteredAndSortedProducts = sortProducts(filterProducts());

  return (
    <div>
      <h2>Product List</h2>
      <div>
        <h3>Categories:</h3>
        <Dropdown
          options={["Dress", "Top", "Bottom", "Outer"]}
          onSelect={handleCategorySelect}
        />
      </div>
      <div>
        <h3>Colors:</h3>
        <Dropdown
          options={["Red", "Blue", "Black"]}
          onSelect={handleColorSelect}
        />
      </div>
      <div>
        <h3>Sort Order:</h3>
        <SDropdown
          options={[
            { label: "Recommended", value: SortOrder.Recommended },
            { label: "Popularity", value: SortOrder.Popularity },
            { label: "Price Low to High", value: SortOrder.PriceLowToHigh },
          ]}
          onSelect={handleSortOrderSelect}
          defaultValue={SortOrder.Recommended}
        />
      </div>
      <div>
        <h3>Filtered and Sorted Products:</h3>
        <ul>
          {filteredAndSortedProducts.map((product) => (
            <li key={product.id}>
              {product.name} - {product.category} - {product.color} -{" "}
              {product.price} - {product.popularity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
