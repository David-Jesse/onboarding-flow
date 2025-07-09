import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function CardAnimation({
  currentStep,
  children,
}: {
  currentStep: number;
  children: React.ReactNode;
}) {
  const prevStepRef = useRef(currentStep);
  const prevStep = prevStepRef.current;

  useEffect(() => {
    prevStepRef.current = currentStep;
  }, [currentStep]);

  // When to show card
  const showCard = currentStep >= 1 && currentStep <= 3;

  // what animation to use
  const shouldAnimateIn = currentStep === 1 && prevStep < currentStep;
  const shouldAnimateOut = currentStep === 4 && prevStep === 3;

  // animation variants
  const cardVariants = {
    hidden: { opacity: 0, scale: 0, x: 100, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      transition: { delay: 0.5, type: "spring" as const, stiffness: 100, damping: 12 },
    },
  };

  return (
    <AnimatePresence>
      {showCard && (
        <motion.div
          className="card-wrapper"
          variants={cardVariants}
          initial={shouldAnimateIn ? "initial" : false}
          animate="visible"
          exit={shouldAnimateOut ? { opacity: 0, y: -40 } : undefined}
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CardAnimation;