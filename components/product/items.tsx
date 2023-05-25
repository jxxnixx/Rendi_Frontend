import Item from "./item";

export default function Items() {
  const items = [
    "test1",
    "test2",
    "test3",
    "test4",
    "test5",
    "test6",
    "test7",
    "test8",
    "test9",
    "test10",
    "test11",
    "test12",
  ]; // 아이템 목록

  const renderItems = () => {
    const rows = [];
    const numItemsPerRow = 4;

    for (let i = 0; i < items.length; i += numItemsPerRow) {
      const rowItems = items.slice(i, i + numItemsPerRow);
      const row = (
        <div
          key={i}
          className="flex justify-start items-start flex-grow-0 flex-shrink-0 w-[1040px] relative gap-[35px] px-[25px] py-[5px] mb-[10px]"
        >
          {rowItems.map((item) => (
            <Item key={item} item={item} />
          ))}
        </div>
      );
      rows.push(row);
    }

    return rows;
  };

  return (
    <div className="w-[1040px] relative overflow-hidden bg-white">
      {renderItems()}
    </div>
  );
}
