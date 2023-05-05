// @ts-ignore
import DVSOIDVC from '@idscan/onboarding';
import { IValidationResponse } from '../../API/responses';
import documentParser, {
  createEl,
  createFragment,
  createHeader,
  createHr, deviceMetadataParser,
  metadataParser
} from '../../helpers/documentParser.ts';
import { prettyPrintJson } from 'pretty-print-json';
import { setContent, setHeader, showModal } from '../modal.ts';
import DVSOConfig from '../../helpers/DVSOConfig.ts';
import User from '../../store/user.ts';
import { setApplicantId } from '../../store/applicant.ts';
import { updateUi } from '../update.ts';
import { isObject, isString } from '../../helpers/typeGuards.ts';

interface DeviceMetadata {
  ip: string,
  timeZone: string,
  userLanguage: string
}

interface IValidateResponse extends IValidationResponse {
  deviceMetadata: DeviceMetadata,
  browserMetadata: string,
}

export default async (lib: DVSOIDVC) => {
  let metaData: string;
  try {
    updateUi('register');
    const config = {
      ...DVSOConfig(User.applicantId),
      callbacks: {
        submit(data: unknown) {
          console.log(data);
          if (isObject(data) && 'metaData' in data && isString(data.metaData)) {
            metaData = data.metaData || '';
          }
        },
        onValidate({ status, applicantId, document, deviceMetadata, browserMetadata }: IValidateResponse) {
          if (status === 0) {
            setApplicantId(User.login, applicantId, true);
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
