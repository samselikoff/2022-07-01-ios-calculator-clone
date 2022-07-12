import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config.js";
import { motion, useAnimation } from "framer-motion";
import { usePress } from "@react-aria/interactions";
import { useState } from "react";

let fullConfig = resolveConfig(tailwindConfig);
let colors = fullConfig.theme.colors;

export default function CalculatorPage() {
  let [lastClicked, setLastClicked] = useState();

  return (
    <div className="flex select-none flex-col justify-end space-y-4 bg-black px-6 pb-12 text-white">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro itaque
        ducimus quia suscipit. Recusandae ipsum repellat laboriosam aliquam id
        exercitationem iusto sed assumenda molestiae, suscipit saepe sunt,
        eligendi sint laudantium! Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Porro itaque ducimus quia suscipit. Recusandae ipsum
        repellat laboriosam aliquam id exercitationem iusto sed assumenda
        molestiae, suscipit saepe sunt, eligendi sint laudantium! Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Porro itaque ducimus quia
        suscipit. Recusandae ipsum repellat laboriosam aliquam id exercitationem
        iusto sed assumenda molestiae, suscipit saepe sunt, eligendi sint
        laudantium! Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Porro itaque ducimus quia suscipit. Recusandae ipsum repellat laboriosam
        aliquam id exercitationem iusto sed assumenda molestiae, suscipit saepe
        sunt, eligendi sint laudantium! Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Porro itaque ducimus quia suscipit. Recusandae ipsum
        repellat laboriosam aliquam id exercitationem iusto sed assumenda
        molestiae, suscipit saepe sunt, eligendi sint laudantium! Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Porro itaque ducimus quia
        suscipit. Recusandae ipsum repellat laboriosam aliquam id exercitationem
        iusto sed assumenda molestiae, suscipit saepe sunt, eligendi sint
        laudantium! Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Porro itaque ducimus quia suscipit. Recusandae ipsum repellat laboriosam
        aliquam id exercitationem iusto sed assumenda molestiae, suscipit saepe
        sunt, eligendi sint laudantium! Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Porro itaque ducimus quia suscipit. Recusandae ipsum
        repellat laboriosam aliquam id exercitationem iusto sed assumenda
        molestiae, suscipit saepe sunt, eligendi sint laudantium! Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Porro itaque ducimus quia
        suscipit. Recusandae ipsum repellat laboriosam aliquam id exercitationem
        iusto sed assumenda molestiae, suscipit saepe sunt, eligendi sint
        laudantium!
      </p>
      <div>{lastClicked}</div>
      <div className="flex space-x-4">
        <Button onClick={() => setLastClicked("7")}>7</Button>
        <Button onClick={() => setLastClicked("8")}>8</Button>
        <Button onClick={() => setLastClicked("9")}>9</Button>
        <Button onClick={() => setLastClicked("X")}>&times;</Button>
      </div>
      <div className="flex space-x-4">
        <Button onClick={() => setLastClicked("4")}>4</Button>
        <Button onClick={() => setLastClicked("5")}>5</Button>
        <Button onClick={() => setLastClicked("6")}>6</Button>
        <Button onClick={() => setLastClicked("-")}>-</Button>
      </div>
      <div className="flex space-x-4">
        <Button onClick={() => setLastClicked("1")}>1</Button>
        <Button onClick={() => setLastClicked("2")}>2</Button>
        <Button onClick={() => setLastClicked("3")}>3</Button>
        <Button onClick={() => setLastClicked("+")}>+</Button>
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

function Button({ children, onClick }) {
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
      style={
        {
          // userSelect: "none",
          // WebkitUserSelect: "none",
        }
      }
      animate={controls}
      // onPointerDown={() => {
      //   controls.stop();
      //   controls.set({ background: colors.neutral[500] });
      // }}
      // onPointerUp={() => {
      //   // console.log("pointer up");
      //   // controls.stop();
      //   controls.start({
      //     // background: [colors.neutral[500], colors.neutral[800]],
      //     background: colors.neutral[800],
      //     transition: { duration: 0.75 },
      //   });
      // }}
      // onPointerLeave={() => {
      //   // console.log("pointer up");
      //   // controls.stop();
      //   controls.start({
      //     // background: [colors.neutral[500], colors.neutral[800]],
      //     background: colors.neutral[800],
      //     transition: { duration: 0.75 },
      //   });
      // }}
      // onPointerEnter={(e) => {
      //   console.log("hm");
      //   console.log(e.buttons);
      //   if (e.buttons === 1) {
      //     console.log("hi");
      //     controls.stop();
      //     controls.set({ background: colors.neutral[500] });
      //   }
      //   //   // console.log("pointer up");
      //   //   // controls.stop();
      //   //   controls.start({
      //   //     // background: [colors.neutral[500], colors.neutral[800]],
      //   //     background: colors.neutral[800],
      //   //     transition: { duration: 0.75 },
      //   //   });
      // }}
      className="aspect-square w-full touch-none overscroll-contain rounded-full text-4xl font-light text-white"
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
