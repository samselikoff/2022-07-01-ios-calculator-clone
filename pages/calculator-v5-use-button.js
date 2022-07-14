import { useButton } from "@react-aria/button";
import { FocusRing } from "@react-aria/focus";
import { motion, useAnimation } from "framer-motion";
import { useRef } from "react";

export default function CalculatorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="w-full max-w-[350px] space-y-3 bg-black">
        <div className="flex space-x-3">
          <Button>7</Button>
          <Button>8</Button>
          <Button>9</Button>
        </div>
        <div className="flex space-x-3">
          <Button>4</Button>
          <Button>5</Button>
          <Button>6</Button>
        </div>
        <div className="flex space-x-3">
          <Button>1</Button>
          <Button>2</Button>
          <Button>3</Button>
        </div>
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
        transition: { duration: 0.6 },
      });
    },
    onPress: () => {
      onClick();
      controls.start({
        background: [null, "#353336"],
        transition: { duration: 0.6 },
      });
    },
  });

  return (
    <FocusRing focusRingClass="ring ring-offset-[3px] ring-offset-black">
      <motion.button
        {...buttonProps}
        ref={ref}
        animate={controls}
        className="aspect-square w-full touch-none overscroll-contain rounded-full bg-[#353336] text-[40px] text-white"
        {...props}
      >
        {children}
      </motion.button>
    </FocusRing>
  );
}
