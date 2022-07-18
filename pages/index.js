import { useState } from "react";

export default function CalculatorPage() {
  let [nums, setNums] = useState([]);

  function handleClick(num) {
    setNums([...nums, num]);
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-xs flex-col items-center justify-center p-6">
      <div className="ml-auto text-8xl font-extralight tabular-nums text-white">
        {nums.length ? nums.slice(-3).join("") : 0}
      </div>
      <div className="mt-9 flex flex-wrap justify-between gap-4">
        <Button onClick={() => handleClick(7)}>7</Button>
        <Button onClick={() => handleClick(8)}>8</Button>
        <Button onClick={() => handleClick(9)}>9</Button>
        <Button onClick={() => handleClick(4)}>4</Button>
        <Button onClick={() => handleClick(5)}>5</Button>
        <Button onClick={() => handleClick(6)}>6</Button>
        <Button onClick={() => handleClick(1)}>1</Button>
        <Button onClick={() => handleClick(2)}>2</Button>
        <Button onClick={() => handleClick(3)}>3</Button>
      </div>
    </div>
  );
}

function Button({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="h-20 w-20 rounded-full bg-[#353336] text-[40px] text-white focus:outline-none focus-visible:ring focus-visible:ring-offset-2 focus-visible:ring-offset-black active:bg-[#757376]"
    >
      {children}
    </button>
  );
}
