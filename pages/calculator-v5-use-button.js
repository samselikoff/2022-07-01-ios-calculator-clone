import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config.js";
import { motion, useAnimation } from "framer-motion";
import { FocusRing } from "@react-aria/focus";
import { useRef } from "react";
import { useButton } from "@react-aria/button";

let fullConfig = resolveConfig(tailwindConfig);
let colors = fullConfig.theme.colors;

export default function CalculatorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="w-full max-w-[350px] space-y-3 bg-black">
        <div className="flex space-x-3">
          <Button>7</Button>
          <Button>8</Button>
          <Button>9</Button>
          <Button>&times;</Button>
        </div>
        <div className="flex space-x-3">
          <Button>4</Button>
          <Button>5</Button>
          <Button>6</Button>
          <Button>-</Button>
        </div>
        <div className="flex space-x-3">
          <Button>1</Button>
          <Button>2</Button>
          <Button>3</Button>
          <Button>+</Button>
        </div>
      </div>
    </div>
  );
}

function Button({
  onClick = () => {
    console.log("click");
  },
  children,
  ...props
}) {
  let ref = useRef();
  const controls = useAnimation();

  let { buttonProps } = useButton({
    onPressStart: () => {
      controls.stop();
      controls.set({ background: colors.neutral[500] });
    },
    onPressEnd: () => {
      controls.start({
        background: colors.neutral[700],
        transition: { duration: 0.5, ease: "easeInOut" },
      });
    },
    onPress: () => {
      onClick();
      controls.start({
        background: [null, colors.neutral[700]],
        transition: { duration: 0.5, ease: "easeInOut" },
      });
    },
  });

  return (
    <FocusRing focusRingClass="ring ring-offset-[3px] ring-offset-black">
      <motion.button
        {...buttonProps}
        ref={ref}
        animate={controls}
        className="aspect-square w-full touch-none overscroll-contain rounded-full bg-neutral-700 text-[40px] text-white"
        {...props}
      >
        {children}
      </motion.button>
    </FocusRing>
  );
}
