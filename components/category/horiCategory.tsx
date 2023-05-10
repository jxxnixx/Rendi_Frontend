import Circle from "./circle";

export default function HoriCategory() {
  return (
    <div className="relative h-[100px] w-screen items-center justify-center bg-white shadow-md">
      <Circle icon={"Top"} />
      <Circle icon={"Outer"} />
      <Circle icon={"Dress"} />
      <Circle icon={"Pants"} />
      <Circle icon={"Skirt"} />
      <Circle icon={"Inner"} />
      <Circle icon={"Swimsuit"} />
      <Circle icon={"Shoes"} />
      <Circle icon={"Bag"} />
      <Circle icon={"Mgoods"} />
      <Circle icon={"ETC"} />
    </div>
  );
}
