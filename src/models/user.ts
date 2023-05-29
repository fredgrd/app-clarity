import { OnboardingStep } from './onboarding-step';

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  surname: string;
  gender: number;
  onboarding_step: OnboardingStep;
}
