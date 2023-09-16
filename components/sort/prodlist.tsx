import React, { useState } from "react";
import { Select, Button } from "antd";
import FilterPopup from "./filterPopup";
import { set } from "react-hook-form";

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

export default function Prodlist({ products }: ProdlistProps) {
  const [showPopup, setShowPopup] = useState(false);

  const [sortResult, setSortResult] = useState({
    sortOrder: "정렬순",
    category: "카테고리",
    subcategory: ["서브카테고리"],
    color: ["색상"],
    price: { min: 0, max: 1000000 },
  });

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="gap-[30px]">
      <div className="flex gap-[10px]">
        {sortResult.sortOrder !== "" && (
          <Button className="hover:mc" onClick={handleShowPopup}>
            {sortResult.sortOrder}
          </Button>
        )}
        {sortResult.category !== "" && (
          <Button className="" onClick={handleShowPopup}>
            {sortResult.category}
          </Button>
        )}

        {sortResult.subcategory.length > 0 && (
          <Button className="" onClick={handleShowPopup}>
            {sortResult.subcategory.join(", ")}
          </Button>
        )}
        {sortResult.color.length > 0 && (
          <Button className="" onClick={handleShowPopup}>
            {sortResult.color.join(", ")}
          </Button>
        )}
        <Button className="" onClick={handleShowPopup}>
          {sortResult.price.min.toLocaleString()} ~{" "}
          {sortResult.price.max.toLocaleString()}원
        </Button>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-20">
          <FilterPopup
            onApplyFilters={(filters) => {
              console.log("Applied filters:", filters);
              setSortResult(filters);
              handleClosePopup(); // 필터 적용 후 팝업 숨기기
            }}
            onResetFilters={() => {
              console.log("Reset filters");
              handleClosePopup(); // 필터 초기화 후 팝업 숨기기
              setSortResult({
                sortOrder: "정렬순",
                category: "카테고리",
                subcategory: ["서브카테고리"],
                color: ["색상"],
                price: { min: 0, max: 1000000 },
              });
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
}
