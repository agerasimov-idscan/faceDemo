// @ts-ignore
import DVSOIDVC from '@idscan/onboarding';
import { updateHeader } from './UI/header.ts';
import initButtons, { updateButton } from './UI/buttons.ts';
import { applicationType, getApplicationType } from './appType.ts';
import { createApplicant } from './API';
import initModal from './UI/modal.ts';

import 'sanitize.css';
import './assets/style.css';
import '@idscan/onboarding/dist/css/onboarding.css';
import { IValidationResponse } from './API/responses';
import { getApplicantId, setApplicantId } from './store/applicant.ts';

const libConfig = (applicantId: string, isAuth = false) => ({
  applicantId,
  isAuth,
  domainId: import.meta.env.VITE_DOMAIN_ID,
  publicKey: import.meta.env.VITE_PUBLIC_KEY,
  domainApi: import.meta.env.VITE_DVSO_URL.slice(0, -1),
  callbacks: {},
});

let appType = getApplicationType();
let lib: DVSOIDVC;

const updateAppType = () => appType = getApplicationType();

const updateUi = () => {
  updateAppType();
  updateHeader(appType);
  updateButton(appType === applicationType.AUTH);
};

const registerApplicant = (applicantId: string) => {
  setApplicantId(applicantId);
  updateAppType();
  updateUi();
};

const faceAuth = async () => {
  try {
    const config = {
      ...libConfig(getApplicantId(), true),
      callbacks: {
        onValidate(data: any) {
          console.log(data)
        }
      }
    }
    if (lib) {
      lib.updateConfig(JSON.stringify(config));
      lib.restart();
    } else {
      lib = new DVSOIDVC(config);
    }
  } catch (e) {
    console.log(e)
  }

};

const register = async () => {
  try {
    const { applicantId } = await createApplicant();
    const config = {
      ...libConfig(applicantId),
      callbacks: {
        onValidate({ status, applicantId }: IValidationResponse) {
          if (status === 0) {
            registerApplicant(applicantId);
            window.location.reload();
          }
        }
      }
    }
    if (lib) {
      lib.updateConfig(JSON.stringify(config));
      lib.restart();
    } else {
      lib = new DVSOIDVC(config);
    }
  } catch (e) {
    console.log(e)
  }
};

const initDVSO = async () => {
  if (appType === applicationType.REGISTER) {
    register();
  } else {
    faceAuth();
  }

};

const main = () => {
  initModal();
  initButtons();
  updateUi();
  initDVSO();
};

main();
