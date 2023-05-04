// @ts-ignore
import DVSOIDVC from '@idscan/onboarding';
import { prettyPrintJson } from 'pretty-print-json';

import { updateHeader } from './UI/header.ts';
import initButtons, { updateButton } from './UI/buttons.ts';
import { applicationType, getApplicationType } from './appType.ts';
import { createApplicant } from './API';
import initModal, { setContent, setHeader, showModal } from './UI/modal.ts';

import { IValidationResponse } from './API/responses';
import { getApplicantId, setApplicantId } from './store/applicant.ts';
import documentParser, {
  createEl,
  createFragment,
  createHeader,
  createHr,
  deviceMetadataParser,
  metadataParser
} from './helpers/documentParser.ts';

import 'sanitize.css';
import '@idscan/onboarding/dist/css/onboarding.css';

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

let metaData;

const faceAuth = async () => {
  try {
    const config = {
      ...libConfig(getApplicantId(), true),
      callbacks: {
        submit(data: unknown) {
          console.log(data);
          metaData = data.metaData;
        },
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
        submit(data: unknown) {
          console.log(data);
          metaData = data.metaData;
        },
        onValidate({ status, applicantId, document, deviceMetadata, browserMetadata }: IValidationResponse) {
          if (status === 0) {
            registerApplicant(applicantId);
            const div = createEl('div');
            div.innerHTML = prettyPrintJson.toHtml(browserMetadata);
            div.classList.add('json-beauty-container');
            const fragment = createFragment();
            fragment.append(
              createHeader('Document Data'),
              documentParser(document),
              createHr(),
              createHeader('Steps Data'),
              metadataParser(metaData),
              createHr(),
              createHeader('Fingerprint Data'),
              deviceMetadataParser(deviceMetadata),
              div,
            )

            setHeader('Registration completed');
            setContent(fragment);
            showModal();
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
