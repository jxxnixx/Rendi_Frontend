// import React, { useState } from "react";
// import SDropdown from "./sdropdown";

// interface Product {
//   id: number;
//   name: string;
//   category: Categories;
//   color: Colors;
//   price: number;
//   popularity: number;
// }
// interface ProdlistProps {
//   products: Product[]; // 상품 목록 배열
// }

// enum SortOrder {
//   Recommended = "recommended",
//   Popularity = "popularity",
//   PriceLowToHigh = "priceLowToHigh",
// }

// enum Categories {
//   Top = "Top",
//   Outer = "Outer",
//   Dress = "Dress",
//   Pants = "Pants",
//   Skirt = "Skirt",
//   Training = "Training",
//   Inner = "Inner",
//   Swimsuit = "Swimsuit",
//   Shoes = "Shoes",
//   Bag = "Bag",
//   ETC = "ETC",
// }

// enum Colors {
//   Red = "Red",
//   Blue = "Blue",
//   Black = "Black",
// }

// export default function Prodlist({ products }: ProdlistProps) {
//   const [selectedCategories, setSelectedCategories] = useState<Categories[]>(
//     []
//   );
//   const [selectedColors, setSelectedColors] = useState<Colors[]>([]);
//   const [selectedSortOrder, setSelectedSortOrder] = useState<SortOrder>(
//     SortOrder.Recommended
//   ); // 선택된 정렬 순서 상태

//   // 카테고리 선택 콜백 함수
//   const handleCategorySelect = (selectedItems: Categories | Categories[]) => {
//     setSelectedCategories(selectedItems as Categories[]);
//   };

//   // 색상 선택 콜백 함수
//   const handleColorSelect = (selectedItems: Colors | Colors[]) => {
//     setSelectedColors(selectedItems as Colors[]);
//   };

//   // 정렬 순서 선택 콜백 함수
//   const handleSortOrderSelect = (selectedOrder: SortOrder | SortOrder[]) => {
//     if (Array.isArray(selectedOrder)) {
//       setSelectedSortOrder(selectedOrder[0]);
//     } else {
//       setSelectedSortOrder(selectedOrder);
//     }
//   };

//   // 카테고리와 색상으로 상품 필터링 함수
//   const filterProducts = (): Product[] => {
//     if (selectedCategories.length === 0 && selectedColors.length === 0) {
//       // 선택된 카테고리와 색상이 없을 경우 모든 상품 반환
//       return products;
//     }

//     return products.filter((product) => {
//       if (
//         selectedCategories.length > 0 &&
//         !selectedCategories.includes(product.category)
//       ) {
//         // 선택된 카테고리 중에 해당 상품의 카테고리가 포함되지 않을 경우 필터링
//         return false;
//       }

//       if (
//         selectedColors.length > 0 &&
//         !selectedColors.includes(product.color)
//       ) {
//         // 선택된 색상 중에 해당 상품의 색상이 포함되지 않을 경우 필터링
//         return false;
//       }

//       return true; // 카테고리와 색상이 모두 일치하는 상품 반환
//     });
//   };

//   // 정렬 순서에 따라 상품 정렬 함수
//   const sortProducts = (filteredProducts: Product[]): Product[] => {
//     switch (selectedSortOrder) {
//       case SortOrder.Popularity:
//         return filteredProducts.sort((a, b) => b.popularity - a.popularity);
//       case SortOrder.PriceLowToHigh:
//         return filteredProducts.sort((a, b) => a.price - b.price);
//       default:
//         return filteredProducts;
//     }
//   };

//   const filteredAndSortedProducts = sortProducts(filterProducts());

//   return (
//     <div className="gap-[30px]">
//       {/* Sort Order Dropdown */}
//       <SDropdown<SortOrder>
//         options={[
//           { label: "추천순", value: SortOrder.Recommended },
//           { label: "인기순", value: SortOrder.Popularity },
//           { label: "낮은 가격순", value: SortOrder.PriceLowToHigh },
//         ]}
//         onSelect={handleSortOrderSelect}
//         defaultValue={SortOrder.Recommended}
//       />

//       {/* Categories Dropdown */}
//       <SDropdown<Categories>
//         options={[
//           { label: "상의", value: Categories.Top },
//           { label: "아우터", value: Categories.Outer },
//           { label: "원피스", value: Categories.Dress },
//           { label: "바지", value: Categories.Pants },
//           { label: "스커트", value: Categories.Skirt },
//           { label: "트레이닝", value: Categories.Training },
//           { label: "이너웨어", value: Categories.Inner },
//           { label: "수영복", value: Categories.Swimsuit },
//           { label: "슈즈", value: Categories.Shoes },
//           { label: "가방", value: Categories.Bag },
//           { label: "기타", value: Categories.ETC },
//         ]}
//         onSelect={handleCategorySelect}
//         // multiSelect
//       />

//       {/* Colors Dropdown */}
//       <SDropdown<Colors>
//         options={[
//           { label: "Red", value: Colors.Red },
//           { label: "Blue", value: Colors.Blue },
//           { label: "Black", value: Colors.Black },
//         ]}
//         onSelect={handleColorSelect}
//         // multiSelect
//       />

//       <div>
//         <ul>
//           {filteredAndSortedProducts.map((product) => (
//             <li key={product.id}>
//               {product.name} - {product.category} - {product.color} -{" "}
//               {product.price} - {product.popularity}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

import React from "react";
import { Select, Space } from "antd";

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

const App: React.FC = () => (
  <Space wrap>
    <Select
      defaultValue={"전체"}
      style={{ width: 120 }}
      onChange={handleChange}
      options={[
        { value: "all", label: "전체" },
        { value: "top", label: "상의" },
        { value: "outer", label: "아우터" },
        { value: "dress", label: "원피스" },
        { value: "pants", label: "바지" },
        { value: "skirt", label: "스커트" },
        { value: "training", label: "트레이닝" },
        { value: "inner", label: "이너웨어" },
        { value: "swimsuit", label: "수영복" },
        { value: "shoes", label: "슈즈" },
        { value: "bag", label: "가방" },
        { value: "etc", label: "기타" },
      ]}
    />
    <Select
      defaultValue={"추천순"}
      style={{ width: 120 }}
      onChange={handleChange}
      options={[
        { value: "recommended", label: "추천순" },
        { value: "popularity", label: "인기순" },
        { value: "priceLowToHigh", label: "낮은 가격순" },
        { value: "priceHighToLow", label: "높은 가격순" },
      ]}
    />
  </Space>
);

export default App;
