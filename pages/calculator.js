import { AnimatedButton } from "../components/animated-button";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config.js";
let fullConfig = resolveConfig(tailwindConfig);
let colors = fullConfig.theme.colors;

export default function CalculatorPage() {
  return (
    <div className="flex min-h-screen flex-col justify-end space-y-4 bg-black px-6 pb-12">
      <div className="flex space-x-4">
        <Button>7</Button>
        <Button>8</Button>
        <Button>9</Button>
        <Button>X</Button>
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

function Button({ children }) {
  return (
    <button className="aspect-square w-full rounded-full bg-neutral-800 text-4xl font-light text-white duration-[1s] active:bg-neutral-500 active:transition">
      {children}
    </button>
  );
}

// function Button({ children }) {
//   function handleClick(controls) {
//     controls.start({
//       background: [
//         transparentize(colors.neutral[500], 1),
//         transparentize(colors.neutral[800], 1),
//       ],
//       transition: {
//         duration: 0.75,
//       },
//     });
//   }

//   return (
//     <AnimatedButton
//       onClick={handleClick}
//       className="aspect-square w-full rounded-full bg-neutral-800 text-4xl font-light text-white"
//     >
//       {children}
//     </AnimatedButton>
//   );
// }

function transparentize(hexColor, opacity) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor);
  return result
    ? `rgba(${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(
        result[3],
        16
      )} / ${opacity})`
    : null;
}
