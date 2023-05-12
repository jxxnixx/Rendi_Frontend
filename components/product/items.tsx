import Item from "./item";

export default function Items() {
  return (
    <div className="w-[1040px] h-[761px] relative overflow-hidden bg-white">
      <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 w-[1040px] relative gap-[35px] px-[25px] mb-[10px]">
        <Item item={"test"} />
        <Item item={"test"} />
        <Item item={"test"} />
        <Item item={"test"} />
      </div>
      <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 w-[1040px] relative gap-[35px] px-[25px] mb-[10px]">
        <Item item={"test"} />
        <Item item={"test"} />
        <Item item={"test"} />
        <Item item={"test"} />
      </div>
      <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 w-[1040px] relative gap-[35px] px-[25px] mb-[10px]">
        <Item item={"test"} />
        <Item item={"test"} />
        <Item item={"test"} />
        <Item item={"test"} />
      </div>
    </div>
  );
}
