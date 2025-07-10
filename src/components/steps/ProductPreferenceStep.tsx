import { motion } from "framer-motion";
import Button from "../ui/Button";
import { useEffect } from "react";
import ActionWithHint from "../ui/ActionWithHint";
import HintEnter from "../ui/HintEnter";

interface ProductPreferenceProps {
  formData: { ProductPreference: string[] };
  onChange: (field: string, value: string | string[]) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const products = [
  { label: "Jewelry", icon: "💎" },
  { label: "Medical & Rx", icon: "💊" },
  { label: "Electronics", icon: "💻" },
  { label: "Auto", icon: "🚗" },
  { label: "Baby Products", icon: "🍼" },
  { label: "Apparel", icon: "👕" },
  { label: "Games & Media", icon: "🎮" },
  { label: "Sports Outdoor", icon: "⚽️" },
  { label: "Product for Pets", icon: "🐕" },
  { label: "Arts & Crafts", icon: "🎨" },
  { label: "Beauty & Skincare", icon: "👸" },
  { label: "Health & Wellness", icon: "🌸" },
  { label: "Home & Garden", icon: "🏡" },
  { label: "Toys", icon: "🔫" }, // 🧸
  { label: "Food & Grocery", icon: "🍔" },
  { label: "Books", icon: "📕" },
];

const ProductPreferenceStep = ({
  formData,
  onChange,
  nextStep,
  prevStep,
}: ProductPreferenceProps) => {
  const handleSelect = (product: string) => {
    const current = formData.ProductPreference;

    // toggle between selected and unselected
    const updated = current.includes(product)
      ? current.filter((prev) => prev !== product)
      : [...current, product];

    onChange("productPreference", updated);
  };

  // Handle enter key press
  useEffect(() => {
    const handleEnterPress = (e: KeyboardEvent) => {
      if (e.key === "Enter" && formData.ProductPreference.length > 0) {
        nextStep();
      }
    };

    window.addEventListener("keydown", handleEnterPress);
    return () => window.removeEventListener("keydown", handleEnterPress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextStep]);

  return (
    <div className="product-preference-step">
      <Button variant="back" onClick={prevStep} />
      <h2 className="onboarding-title">What kind of products do you sell?</h2>

      <motion.div layout transition={{ duration: 1 }}>
        <motion.ul className="product-group" layout="position">
          {products.map((item) => {
            const isSelected = formData.ProductPreference.includes(item.label);

            return (
              <motion.li
                key={item.label}
                className={`product ${isSelected ? "selected" : ""}`}
                layout
                onClick={() => handleSelect(item.label)}
              >
                <span>{item.icon}</span>
                {item.label}
              </motion.li>
            );
          })}
        </motion.ul>
      </motion.div>

      <ActionWithHint>
        <Button variant="primary" text="Submit" onClick={nextStep} />
        <HintEnter />
      </ActionWithHint>
    </div>
  );
};

export default ProductPreferenceStep;