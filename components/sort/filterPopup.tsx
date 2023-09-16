import React, { useState } from "react";
import { Select, Slider } from "antd";
import { categories } from "@/pages/categories/[id]";

interface FilterPopupProps {
  onApplyFilters: (filters: Filters) => void;
  onResetFilters: () => void;
}

// interface Filters {
//   sortOrder: string;
//   category: string;
//   subcategory: string[];
//   color: string[];
//   price: { min: number; max: number };
//   //   size: string;
//   //   brand: string;
//   // 다른 필터 옵션들을 여기에 추가하세요
// }
interface Filters {
  sortOrder: string;
  category: string;
  subcategory: string[];
  color: string[];
  price: { min: number; max: number };
  //   size: string;
  //   brand: string;
  // 다른 필터 옵션들을 여기에 추가하세요
}

const FilterPopup: React.FC<FilterPopupProps> = ({
  onApplyFilters,
  onResetFilters,
}) => {
  const [filters, setFilters] = useState<Filters>({
    sortOrder: "",
    category: "",
    subcategory: [],
    color: [],
    price: { min: 0, max: 500000 },
    // size: "",
    // brand: "",
  });

  const handleChange = (filterType: keyof Filters, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  const handleApplyFilters = () => {
    // 슬라이드로 선택한 가격 범위를 price 필터에 저장합니다.
    const priceFilter = {
      min: priceRange[0],
      max: priceRange[1],
    };
    setFilters((prevFilters) => ({
      ...prevFilters,
      price: priceFilter,
    }));

    // 업데이트된 filters를 사용하여 onApplyFilters 함수 호출
    onApplyFilters({
      ...filters,
      price: priceFilter,
    });
  };

  const handleResetFilters = () => {
    setFilters({
      sortOrder: "",
      category: "",
      subcategory: [],
      color: [],
      price: { min: 0, max: 500000 },
      //   size: "",
      //   brand: "",
    });
    onResetFilters();
  };

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  const handlePriceChange = (value: [number, number]) => {
    setPriceRange(value);
  };

  const [choicedCategory, setChoicedCategory] = useState("전체");
  const handleCategoryChange = (value: string) => {
    setChoicedCategory(value);
    // 카테고리가 변경되면 하위 카테고리 선택을 초기화
    setFilters((prevFilters) => ({
      ...prevFilters,
      subcategory: [],
    }));
  };
  // 하위 카테고리 클릭 시 적용될 함수
  const handleSubCategoryChange = (subCategory: string) => {
    setFilters((prevFilters) => {
      // 기존에 선택된 하위 카테고리가 이미 filters.subcategory 배열에 있는지 확인하여 선택 여부 토글
      const updatedSubCategories = prevFilters.subcategory.includes(subCategory)
        ? prevFilters.subcategory.filter((item) => item !== subCategory)
        : [...prevFilters.subcategory, subCategory];

      return {
        ...prevFilters,
        subcategory: updatedSubCategories,
      };
    });
  };

  // 색상 필터를 적용할 때 사용할 함수
  const handleColorChange = (colorValue: string) => {
    if (filters.color.includes(colorValue)) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        color: prevFilters.color.filter((item) => item !== colorValue),
      }));
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        color: [...prevFilters.color, colorValue],
      }));
    }
  };

  const showList = [
    { value: "recommended", label: "추천순" },
    { value: "popularity", label: "인기순" },
    { value: "priceLowToHigh", label: "낮은 가격순" },
    { value: "priceHighToLow", label: "높은 가격순" },
  ];
  const categoryList = [
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
    { value: "mgoods", label: "패션잡화" },
  ];

  const colorList = [
    { value: "white", label: "화이트" },
    { value: "black", label: "블랙" },
    { value: "gray", label: "그레이" },
    { value: "charcoal", label: "차콜" },
    { value: "brown", label: "브라운" },
    { value: "beige", label: "베이지" },
    { value: "cream", label: "크림" },
    { value: "pink", label: "핑크" },
    { value: "green", label: "그린" },
    { value: "yellow", label: "옐로우" },
    { value: "navy", label: "네이비" },
    { value: "skyblue", label: "스카이블루" },
    { value: "purple", label: "퍼플" },
    { value: "red", label: "레드" },
    { value: "mint", label: "민트" },
    { value: "khaki", label: "카키" },
    { value: "orange", label: "오렌지" },
    { value: "blue", label: "블루" },
    { value: "silver", label: "실버" },
    { value: "gold", label: "골드" },
    { value: "etc", label: "기타" },
  ];

  return (
    <div className=" popup-container p-4 bg-white border rounded shadow-md mobile:h-[850px] mobile:overflow-auto  mobile:scrollbar-hide">
      <div className="text-xl font-bold mb-4">필터</div>

      <div className="filter-section mb-4">
        <p className="font-bold">정렬</p>
        <div className="filter-options flex flex-wrap">
          {showList.map((option) => (
            <button
              key={option.value}
              className={`filter-option px-4 py-2 border rounded mr-2 mb-2 ${
                filters.sortOrder === option.value ? "bg-mc text-white" : ""
              }`}
              onClick={() => handleChange("sortOrder", option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-section mb-4">
        <p className="font-bold">카테고리</p>
        <div className="filter-options flex flex-wrap">
          {categoryList.map((category) => (
            <button
              key={category.value}
              className={`filter-option px-4 py-2 border rounded mr-2 mb-2 ${
                filters.category === category.value ? "bg-mc text-white" : ""
              }`}
              onClick={() => {
                handleChange("category", category.value);
                handleCategoryChange(category.value); // 선택된 카테고리를 업데이트
              }}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* 하위 카테고리 표시 */}
      {choicedCategory !== "전체" &&
        choicedCategory !== "기타" &&
        categories[choicedCategory] && (
          <div className="filter-section mb-4">
            <p className="font-bold">하위 카테고리</p>
            <div className="filter-options flex flex-wrap">
              {categories[choicedCategory].map((subCategory) => (
                <button
                  key={subCategory.cate}
                  className={`filter-option px-4 py-2 border rounded mr-2 mb-2 ${
                    filters.subcategory.includes(subCategory.cate)
                      ? "bg-mc text-white"
                      : ""
                  }`}
                  onClick={() => handleSubCategoryChange(subCategory.cate)} // 하위 카테고리 클릭 시 handleSubCategoryChange 함수 호출
                >
                  {subCategory.cate}
                </button>
              ))}
            </div>
          </div>
        )}

      <div className="filter-section mb-4">
        <p className="font-bold">색상</p>
        <div className="filter-options flex flex-wrap">
          {colorList.map((color) => (
            <button
              key={color.value}
              className={`filter-option px-4 py-2 border rounded mr-2 mb-2 ${
                filters.color.includes(color.value) ? "bg-mc text-white" : ""
              }`}
              onClick={() => handleColorChange(color.value)}
            >
              {color.label}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-section mb-4">
        <p className="font-bold">가격</p>
        <div className="mt-1">
          {priceRange[0].toLocaleString()}원 - {priceRange[1].toLocaleString()}
          원
        </div>

        <div className="w-[300px]">
          <Slider
            range
            defaultValue={priceRange}
            onChange={handlePriceChange}
            min={0}
            max={500000}
          />

          {/* <button
            className={`filter-option px-4 py-2 border rounded mr-2 mb-2 ${
              filters.price === "0-10000" ? "bg-mc text-white" : ""
            }`}
            onClick={() => handleChange("price", "0-10000")}
          >
            0 ~ 10,000
          </button> */}
        </div>
      </div>

      {/* Add other filter sections here */}

      <div className="filter-buttons flex justify-end">
        <button
          className="apply-button px-4 py-2 bg-mc text-white rounded cursor-pointer"
          onClick={handleApplyFilters}
        >
          필터 적용
        </button>
        <button
          className="reset-button px-4 py-2 bg-[#cccccc] text-white rounded cursor-pointer ml-2"
          onClick={handleResetFilters}
        >
          필터 초기화
        </button>
      </div>
    </div>
  );
};

export default FilterPopup;
