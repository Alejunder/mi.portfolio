// components/PageWrapper.jsx
import { motion, AnimatePresence } from "framer-motion";

const PageWrapper = ({ isFadingOut, children }) => {
  return (
    <AnimatePresence mode="wait">
      {!isFadingOut && (
        <motion.div
          key="page"
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 1 }}
          style={{ width: "100%" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageWrapper;
