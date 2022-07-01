import { motion, useAnimation } from "framer-motion";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config.js";
let fullConfig = resolveConfig(tailwindConfig);
let colors = fullConfig.theme.colors;

export default function Home() {
  const controls = useAnimation();

  return (
    <div className="mt-16 text-center">
      <motion.button
        animate={controls}
        onClick={async () => {
          await controls.start({
            background: [
              transparentize(colors.gray[300], 1),
              transparentize(colors.gray[300], 0),
              // transparentize(colors.violet[500], 0),
              // transparentize(colors.violet[500], 1),
            ],
            transition: {
              duration: 0.5,
              // duration: 0.2,
              // times: [0.3, 0.3, 0.6, 0.6],
            },
          });
        }}
        className="rounded border border-gray-300 px-3 py-2"
      >
        Click me
      </motion.button>
    </div>
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
