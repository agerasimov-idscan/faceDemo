import { isApplicantID } from './store/applicant.ts';

export enum applicationType {
  REGISTER,
  AUTH,
}

export const getApplicationType = () => isApplicantID() ? applicationType.AUTH : applicationType.REGISTER;
