import CustomInput from "../custom-input/CustomInput";
import Button from "../ui/Button";
import BgIllustration from "../ui/BgIllustration";
import "./EmailStep.css";

function EmailStep({
  formData,
  onChange,
  nextStep,
}: {
  formData: any;
  onChange: (field: string, value: string) => void;
  nextStep: () => void;
}) {
  return (
    <>
      <BgIllustration />
      <div className="get-started-step">
        <h2>Get started with your email</h2>

        <div className={`${formData.email ? "" : "centered-custom-input"}`}>
          <CustomInput
            placeholder="type here"
            value={formData.email}
            onValueChange={(value) => onChange("email", value)}
            onEnterPress={nextStep}
            required
          />
        </div>
        <Button variant="primary" onClick={nextStep} text="Get Started" />

        <p className="agreement-text">
          By clicking on the button above, you agree to our terms of use and
          data policy on behalf of the company identified above.
        </p>
      </div>
    </>
  );
}

export default EmailStep;
