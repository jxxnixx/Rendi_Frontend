import React, { useState } from "react";
import { Select } from "antd";
import FilterPopup from "./filterPopup";

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

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

const Prodlist: React.FC<ProdlistProps> = ({ products }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="gap-[30px]">
      {/* Sort Order Dropdown */}
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
        onClick={handleShowPopup}
      />

      {/* Categories Dropdown */}
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
        onClick={handleShowPopup}
      />

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-20">
          <FilterPopup
            onApplyFilters={(filters) => {
              console.log("Applied filters:", filters);
              handleClosePopup(); // 필터 적용 후 팝업 숨기기
            }}
            onResetFilters={() => {
              console.log("Reset filters");
              handleClosePopup(); // 필터 초기화 후 팝업 숨기기
            }}
          />
        </div>
      )}

      <div>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.name} - {product.category} - {product.color} -{" "}
              {product.price} - {product.popularity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Prodlist;
