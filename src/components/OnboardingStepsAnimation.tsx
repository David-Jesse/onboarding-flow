import { AnimatePresence, motion } from "framer-motion";

interface OnboardingStepsAnimationProps {
  currentStep: number;
  children: React.ReactNode;
}

const OnBoardingStepsAnimation = ({
  children,
  currentStep,
}: OnboardingStepsAnimationProps) => {
  const fadeVariants = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0, transition: { duration: 1 } },
    exit: { opacity: 0, y: -40, transition: { duration: 0.6 } },
  };

  const firstStepVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, y: 0, transition: { duration: 1 } },
    exit: { opacity: 0, transition: { duration: 0.4 } },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentStep}
        className="step-motion-container"
        variants={currentStep === 0 ? firstStepVariants : fadeVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default OnBoardingStepsAnimation;