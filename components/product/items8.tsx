import Item from "./item";

export default function Items8() {
  const items8 = [
    "test1",
    "test2",
    "test3",
    "test4",
    "test5",
    "test6",
    "test7",
    "test8",
  ]; // 아이템 목록

  const renderItems8 = () => {
    const rows = [];
    const numItems8PerRow = 4;

    for (let i = 0; i < items8.length; i += numItems8PerRow) {
      const rowItems8 = items8.slice(i, i + numItems8PerRow);
      const row = (
        <div
          key={i}
          className="flex justify-start items8-start flex-grow-0 flex-shrink-0 w-[1040px] relative gap-[35px] px-[25px] py-[5px] mb-[10px]"
        >
          {rowItems8.map((item) => (
            <Item key={item} item={item} />
          ))}
        </div>
      );
      rows.push(row);
    }

    return rows;
  };

  return <div className="w-[1040px]  bg-white">{renderItems8()}</div>;
}
