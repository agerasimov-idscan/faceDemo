interface IInvalidDataError {
  code: string,
  message: string,
}
interface IDocumentValidationTest {
  displayName: string,
  name: string,
  status: number,
  statusString: string,
  reason: string
}

interface IValidationStatus {
  expired: boolean,
  documentIsValid: boolean,
  faceIsValid: boolean,
  antiSpoofingIsValid: boolean,
}

interface IDocumentParse {
  abbr3Country: string,
  abbrCountry: string,
  address: string,
  city: string,
  class: string,
  country: string,
  dob: string,
  expires: string,
  eyes: string,
  familyName: string,
  firstName: string,
  fullName: string,
  gender: string,
  hair: string,
  height: string,
  id: string,
  idType: string,
  issued: string,
  middleName: string,
  postalBox: string,
  state: string,
  issuedBy: string,
  template: string,
  weight: string,
  zip: string,
  privateName: string,
}

export interface IValidationResponse {
  documentType: number,
  document: IDocumentParse,
  status: number,
  validationStatus: IValidationStatus,
  invalidDataErrors: IInvalidDataError[],
  faceSuccess: boolean,
  documentSuccess: boolean,
  documentHasNotExpired: boolean,
  documentValidationTests: IDocumentValidationTest[],
  callBackUrl: string,
  applicantId: string,
  attemptId: number,
  attemptsLeft: number,
}
