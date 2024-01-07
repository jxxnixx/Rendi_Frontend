import React, { useEffect, useState, useRef } from "react";
import { Select, Button } from "antd";
import FilterPopup from "./filterPopup";
import { set } from "react-hook-form";
import { getKeyword } from "../category/circle";

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
  onSendData?: (product: Product) => void;
}

export default function Prodlist({ products, onSendData }: ProdlistProps) {
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

  const popupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handlePopupOutsideClick = (e: MouseEvent) => {
      // 팝업 외부를 클릭하면 팝업을 닫습니다.
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        handleClosePopup();
      }
    };
    document.addEventListener("mousedown", handlePopupOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handlePopupOutsideClick);
    };
  }, []);

  const sendDataToParent = (product: Product) => {
    if (onSendData) {
      onSendData(product);
    }
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
          <div ref={popupRef}>
            <FilterPopup
              onApplyFilters={(filters) => {
                console.log("Applied filters:", filters);

                // 필터 값을 가공하여 상위 컴포넌트로 전달
                const filteredData: any = {
                  // productIds: products.map((product) => product.id),
                  sortName: filters.sortOrder,
                  parentCategory: getKeyword(filters.category),
                  childCategory: filters.subcategory.join(", "),
                  colourName: filters.color.join(", "),
                  minPrice: filters.price.min,
                  maxPrice: filters.price.max,
                };

                setSortResult(filters);
                handleClosePopup(); // 필터 적용 후 팝업 숨기기
                sendDataToParent(filteredData); // 상위 컴포넌트로 필터된 데이터 전달
                localStorage.setItem("filteredData", filteredData);
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
