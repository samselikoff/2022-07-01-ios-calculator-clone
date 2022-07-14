import { useButton } from "@react-aria/button";
import { FocusRing } from "@react-aria/focus";
import { motion, useAnimation } from "framer-motion";
import { useRef, useState } from "react";

export default function CalculatorPage() {
  let [number, setNumber] = useState(0);

  return (
    <div className="mx-auto flex min-h-screen max-w-xs flex-col items-center justify-end p-6">
      <div className="ml-auto text-8xl font-extralight text-white">
        {number}
      </div>
      <div className="mt-9 flex flex-wrap justify-between gap-4">
        <Button onClick={() => setNumber(7)}>7</Button>
        <Button onClick={() => setNumber(8)}>8</Button>
        <Button onClick={() => setNumber(9)}>9</Button>
        <Button onClick={() => setNumber(4)}>4</Button>
        <Button onClick={() => setNumber(5)}>5</Button>
        <Button onClick={() => setNumber(6)}>6</Button>
        <Button onClick={() => setNumber(1)}>1</Button>
        <Button onClick={() => setNumber(2)}>2</Button>
        <Button onClick={() => setNumber(3)}>3</Button>
      </div>
    </div>
  );
}

function Button({ onClick = () => {}, children, ...props }) {
  let ref = useRef();
  let controls = useAnimation();
  let { buttonProps } = useButton({
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
  });

  return (
    <FocusRing focusRingClass="ring ring-offset-[3px] ring-offset-black">
      <motion.button
        {...buttonProps}
        ref={ref}
        animate={controls}
        className="aspect-square h-20 w-20 touch-none select-none overscroll-contain rounded-full bg-[#353336] text-[40px] text-white"
        {...props}
      >
        {children}
      </motion.button>
    </FocusRing>
  );
}
