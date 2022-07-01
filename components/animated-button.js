import { motion, useAnimation } from "framer-motion";

export function AnimatedButton({ onClick = () => {}, ...rest }) {
  const controls = useAnimation();

  return (
    <motion.button
      animate={controls}
      onClick={() => onClick(controls)}
      {...rest}
    />
  );
}
