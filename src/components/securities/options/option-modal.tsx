import {
  StepperModal,
  StepperModalContent,
  type StepperModalProps,
  StepperStep,
} from "@/components/ui/stepper";
import { StockOptionFormProvider } from "@/providers/stock-option-form-provider";
import { api } from "@/trpc/server";
import { Documents } from "./steps/documents";
import { GeneralDetails } from "./steps/general-details";
import { RelevantDates } from "./steps/relevant-dates";
import { VestingDetails } from "./steps/vesting-details";

async function VestingDetailsStep() {
  const [stakeholders, equityPlans] = await Promise.all([
    api.stakeholder.getStakeholders.query(),
    api.equityPlan.getPlans.query(),
  ]);
  return (
    <VestingDetails stakeholders={stakeholders} equityPlans={equityPlans} />
  );
}

export const OptionModal = (props: Omit<StepperModalProps, "children">) => {
  return (
    <StepperModal {...props}>
      <StockOptionFormProvider>
        <StepperStep title="General details">
          <StepperModalContent>
            <GeneralDetails />
          </StepperModalContent>
        </StepperStep>
        <StepperStep title="Vesting details">
          <StepperModalContent>
            <VestingDetailsStep />
          </StepperModalContent>
        </StepperStep>
        <StepperStep title="Relevant dates">
          <StepperModalContent>
            <RelevantDates />
          </StepperModalContent>
        </StepperStep>
        <StepperStep title="Documents">
          <StepperModalContent>
            <Documents />
          </StepperModalContent>
        </StepperStep>
      </StockOptionFormProvider>
    </StepperModal>
  );
};
