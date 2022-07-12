import { motion, useAnimation } from "framer-motion";

export function AnimatedButton({
  onClick = () => {},
  onPointerUp = () => {},
  onPointerDown = () => {},
  onPointerLeave = () => {},
  ...rest
}) {
  const controls = useAnimation();

  return (
    <motion.button
      animate={controls}
      onClick={() => onClick(controls)}
      onPointerLeave={() => onPointerLeave(controls)}
      onPointerUp={() => onPointerUp(controls)}
      onPointerDown={() => onPointerDown(controls)}
      // onPointerEnter={(e) => {
      //   if (e.buttons)
      //   console.log(e);
      // }}
      {...rest}
    />
  );
}
