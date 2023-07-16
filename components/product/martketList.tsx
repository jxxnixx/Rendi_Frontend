import Market from "./market";

export default function Markets8() {
  const markets8 = [
    "test1",
    "test2",
    "test3",
    "test4",
    // "test5",
    // "test6",
    // "test7",
    // "test8",
  ]; // 아이템 목록

  const renderMarkets8 = () => {
    const rows = [];
    const numMarkets8PerRow = 4;

    for (let i = 0; i < markets8.length; i += numMarkets8PerRow) {
      const rowMarkets8 = markets8.slice(i, i + numMarkets8PerRow);
      const row = (
        <div
          key={i}
          className="flex justify-start Markets8-start flex-grow-0 flex-shrink-0 w-[1040px] relative gap-[35px] px-[25px] py-[5px] mb-[10px]"
        >
          {rowMarkets8.map((item) => (
            <Market key={item} market={item} />
          ))}
        </div>
      );
      rows.push(row);
    }

    return rows;
  };

  return <div className="w-[1040px]  bg-white">{renderMarkets8()}</div>;
}
