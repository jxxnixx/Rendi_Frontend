import { useState } from "react";
import type {
  MouseEventHandler,
  ChangeEventHandler,
  FocusEventHandler,
} from "react";

export default function Search() {
  const examples = ["rendi", "YJ", "S2Y", "HJ"];

  const [isHidden, setIsHidden] = useState(true);
  const [liOver, setLiOver] = useState(false);
  const [result, setResult] = useState("");
  const [search, setSearch] = useState("");

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.currentTarget;
    setSearch(value);
  };
  const onFocusIn: FocusEventHandler<HTMLInputElement> = (e) => {
    setIsHidden(false);
  };
  const onFocusOut: FocusEventHandler<HTMLInputElement> = (e) => {
    if (liOver) return;
    setIsHidden(true);
  };

  const onMouseOver: MouseEventHandler<HTMLLIElement> = (e) => {
    setLiOver(true);
    e.currentTarget.style.background = "pink";
  };
  const onMouseLeave: MouseEventHandler<HTMLLIElement> = (e) => {
    setLiOver(false);
    e.currentTarget.style.background = "none";
  };
  const onAddResultClick: MouseEventHandler<HTMLLIElement> = (e) => {
    const { textContent } = e.currentTarget;
    setResult(textContent as string);
    setIsHidden(true);
  };
  return (
    <div className="container">
      <section>
        <input
          type={"search"}
          onFocus={onFocusIn}
          onBlur={onFocusOut}
          onChange={onChange}
          value={search}
          className="bg-slate-200 w--30"
        />
        <ul hidden={isHidden}>
          {examples.map((example, idx) => (
            <li
              key={idx}
              onMouseOver={onMouseOver}
              onMouseLeave={onMouseLeave}
              onClick={onAddResultClick}
              style={{ cursor: "pointer" }}
              hidden={!example.includes(search)}
            >
              {example}
            </li>
          ))}
        </ul>
      </section>
      <div>{result}</div>
    </div>
  );
}
