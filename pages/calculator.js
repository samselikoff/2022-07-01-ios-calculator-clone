import { AnimatedButton } from "../components/animated-button";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config.js";
import { motion, useAnimation } from "framer-motion";
let fullConfig = resolveConfig(tailwindConfig);
let colors = fullConfig.theme.colors;

export default function CalculatorPage() {
  return (
    <div className="fixed inset-0 flex select-none flex-col justify-end space-y-4 bg-black px-6 pb-12">
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
  );
}

// function Button({ children }) {
//   return (
//     <button
//       onClick={() => console.log("hi")}
//       className="inline-flex aspect-square w-full items-center justify-center rounded-full bg-neutral-800 text-4xl font-light text-white duration-[1s]  active:bg-neutral-500  active:transition "
//     >
//       <span>{children}</span>
//     </button>
//   );
// }

function Button({ children }) {
  function handleClick() {
    console.log("click");
  }

  const controls = useAnimation();

  return (
    <motion.button
      animate={controls}
      onClick={handleClick}
      onPointerDown={() => {
        controls.stop();
        controls.set({ background: colors.neutral[500] });
      }}
      onPointerUp={() => {
        // console.log("pointer up");
        // controls.stop();
        controls.start({
          // background: [colors.neutral[500], colors.neutral[800]],
          background: colors.neutral[800],
          transition: { duration: 0.75 },
        });
      }}
      onPointerLeave={() => {
        // console.log("pointer up");
        // controls.stop();
        controls.start({
          // background: [colors.neutral[500], colors.neutral[800]],
          background: colors.neutral[800],
          transition: { duration: 0.75 },
        });
      }}
      onPointerEnter={(e) => {
        console.log("hm");
        console.log(e.buttons);
        if (e.buttons === 1) {
          console.log("hi");
          controls.stop();
          controls.set({ background: colors.neutral[500] });
        }
        //   // console.log("pointer up");
        //   // controls.stop();
        //   controls.start({
        //     // background: [colors.neutral[500], colors.neutral[800]],
        //     background: colors.neutral[800],
        //     transition: { duration: 0.75 },
        //   });
      }}
      className="aspect-square w-full overscroll-contain rounded-full text-4xl font-light text-white"
      initial={{ background: colors.neutral[800] }}
      // whileTap={{
      //   background: colors.neutral[500],
      //   transition: { duration: 0 },
      // }}
      // transition={{ duration: 0.75 }}
    >
      {children}
    </motion.button>
  );
}

function transparentize(hexColor, opacity) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor);
  return result
    ? `rgba(${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(
        result[3],
        16
      )} / ${opacity})`
    : null;
}
