import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config.js";
import { motion, useAnimation } from "framer-motion";
import { usePress } from "@react-aria/interactions";

let fullConfig = resolveConfig(tailwindConfig);
let colors = fullConfig.theme.colors;

export default function CalculatorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-8">
      <div className="w-full max-w-sm space-y-4 bg-black">
        <div className="flex space-x-4">
          <Button>7</Button>
          <Button>8</Button>
          <Button>9</Button>
          <Button>&times;</Button>
        </div>
        <div className="flex space-x-4">
          <Button>4</Button>
          <Button>5</Button>
          <Button>6</Button>
          <Button>-</Button>
        </div>
        <div className="flex space-x-4">
          <Button>1</Button>
          <Button>2</Button>
          <Button>3</Button>
          <Button>+</Button>
        </div>
      </div>
    </div>
  );
}

function Button({ onClick = () => {}, children, ...props }) {
  const controls = useAnimation();
  let { pressProps } = usePress({
    onPressStart: () => {
      controls.stop();
      controls.set({ background: colors.neutral[500] });
    },
    onPressEnd: () => {
      controls.start({
        background: colors.neutral[800],
        transition: { duration: 0.75 },
      });
    },
    onPress: () => {
      onClick();
      controls.start({
        background: [null, colors.neutral[800]],
        transition: { duration: 0.75 },
      });
    },
  });

  return (
    <motion.button
      {...pressProps}
      animate={controls}
      className="aspect-square w-full overscroll-contain rounded-full bg-neutral-800 text-4xl font-light text-white"
      {...props}
    >
      {children}
    </motion.button>
  );
}
