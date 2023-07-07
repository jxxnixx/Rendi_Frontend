import Circle from "./circle";

export default function HoriCategory() {
  const icons = [
    "Top",
    "Outer",
    "Dress",
    "Pants",
    "Skirt",
    "Training",
    "Inner",
    "Swimsuit",
    "Shoes",
    "Bag",
    "Mgoods",
    "ETC",
  ];

  return (
    <div className="flex h-[100px] w-[1040px] items-center justify-center bg-white shadow">
      {icons.map((icon) => (
        <Circle key={icon} icon={icon} />
      ))}
    </div>
  );
}
