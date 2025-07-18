import { useState } from "react";
import "./OnboardingFlow.css";

import OnboardingNav from "./OnboardingNav";
import EmailStep from "./steps/EmailStep";
import NameStep from "./steps/NameStep";
import CompanyNameStep from "./steps/CompanyNameStep";
import WebsiteUrlStep from "./steps/WebsiteUrlStep";
import ProductPreferenceStep from "./steps/ProductPreferenceStep";
import PlatformStep from "./steps/PlatformStep";
import Completed from "./steps/Completed";
import OnboardingFooter from "./OnboardingFooter";
import ProgressBar from "./ui/ProgressBar";
import CardAnimation from "./ui/card/CardAnimation";
import BusinessCard from "./ui/card/BusinessCard";
import OnboardingContent from "./OnboardingContent";
import OnBoardingStepsAnimation from "./OnboardingStepsAnimation";
import EcommercePlatformIcon from "./icons/EcommercePlatformIcon";

const steps = [
  EmailStep,
  NameStep,
  CompanyNameStep,
  WebsiteUrlStep,
  PlatformStep,
  ProductPreferenceStep,
  Completed,
];

function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const OnboardingComponent = steps[currentStep];
  const websiteUrlActive = currentStep === 3;

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    companyName: "",
    platform: "",
    websiteUrl: "",
    ProductPreference: [],
  });

  const handleChange = (field: string, value: string | string[]) => {
    setFormData((prevState) => ({ ...prevState, [field]: value }));
  };

  const nextStep = () =>
    currentStep < steps.length - 1 && setCurrentStep((j) => j + 1);
  const prevStep = () => currentStep > 0 && setCurrentStep((j) => j - 1);

  return (
    <>
      <ProgressBar steps={steps.length} currentStep={currentStep} />
      <div className="onboarding">
        <OnboardingNav />

        <OnboardingContent currentStep={currentStep}>
          <OnBoardingStepsAnimation currentStep={currentStep}>
            <OnboardingComponent
              formData={formData}
              onChange={handleChange}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          </OnBoardingStepsAnimation>
          <CardAnimation currentStep={currentStep}>
            <BusinessCard
              formData={formData}
              websiteUrlActive={websiteUrlActive}
            />
          </CardAnimation>
          {currentStep === 4 && (
            <EcommercePlatformIcon selectedPlatform={formData.platform} />
          )}
        </OnboardingContent>

        <OnboardingFooter />
      </div>
    </>
  );
}

export default OnboardingFlow;