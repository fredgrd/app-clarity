import { OnboardingStep } from './onboarding-step.model';

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  surname: string;
  gender: number;
  onboarding_step: OnboardingStep;
}
