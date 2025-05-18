import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
const TiltCard = ({ children, className }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [0, 1], [8, -8]);
  const rotateY = useTransform(x, [0, 1], [-8, 8]);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    x.set(px);
    y.set(py);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default TiltCard;
