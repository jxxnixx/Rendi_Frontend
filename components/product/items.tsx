import Item from "./item";

export default function Items() {
  return (
    <div className="w-[1040px] relative overflow-hidden bg-white">
      <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 w-[1040px] relative gap-[35px] px-[25px] py-[5px] mb-[10px]">
        <Item item={"test1"} /> {/* 각 item에 고유한 값을 전달 */}
        <Item item={"test2"} />
        <Item item={"test3"} />
        <Item item={"test4"} />
      </div>
      <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 w-[1040px] relative gap-[35px] px-[25px] py-[5px] mb-[10px] ">
        <Item item={"test5"} />
        <Item item={"test6"} />
        <Item item={"test7"} />
        <Item item={"test8"} />
      </div>
      <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 w-[1040px] relative gap-[35px] px-[25px] py-[5px] mb-[10px]">
        <Item item={"test9"} />
        <Item item={"test10"} />
        <Item item={"test11"} />
        <Item item={"test12"} />
      </div>
    </div>
  );
}
