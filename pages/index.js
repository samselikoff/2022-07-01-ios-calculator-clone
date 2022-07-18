import { useButton } from "@react-aria/button";
import { useRef, useState } from "react";
import { FocusRing } from "@react-aria/focus";
import { motion, useAnimation } from "framer-motion";

export default function CalculatorPage() {
  let [nums, setNums] = useState([]);

  function handleClick(num) {
    setNums([...nums, num]);
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-xs flex-col items-center justify-end p-6 md:justify-center">
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
  let controls = useAnimation();
  let ref = useRef();

  let { buttonProps } = useButton(
    {
      onPressStart: () => {
        controls.stop();
        controls.set({ background: "#757376" });
      },
      onPressEnd: () => {
        controls.start({
          background: "#353336",
          transition: { duration: 0.4 },
        });
      },
      onPress: () => {
        onClick();
        controls.start({
          background: [null, "#353336"],
          transition: { duration: 0.4 },
        });
      },
    },
    ref
  );

  return (
    <FocusRing focusRingClass="ring ring-offset-2 ring-offset-black">
      <motion.button
        animate={controls}
        ref={ref}
        {...buttonProps}
        className="h-20 w-20 touch-none select-none rounded-full bg-[#353336] text-[40px] text-white focus:outline-none"
      >
        {children}
      </motion.button>
    </FocusRing>
  );
}
