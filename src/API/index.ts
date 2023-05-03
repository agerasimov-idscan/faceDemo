import { post } from './setup.ts';

type UUID = string;

interface CreateApplicantResponse {
  applicantId: UUID,
  validationLink: string,
  shortValidationLink: string,
}

export const createApplicant = (): Promise<CreateApplicantResponse> => {
  const url = 'api/v2/private/Applicants';
  const body = {
    firstName: "John",
    lastName: "Dow",
    phone: "+11234567890",
    email: "demo@demo.com",
    sendSms: false,
    status: 0,
  }
  return post(url, body);
};
