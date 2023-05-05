// @ts-ignore
import DVSOIDVC from '@idscan/onboarding';
import DVSOConfig from '../../helpers/DVSOConfig.ts';
import User from '../../store/user.ts';
import { updateUi } from '../update.ts';

export default async (lib: DVSOIDVC) => {
  try {
    updateUi('auth');
    const config = {
      ...DVSOConfig(User.applicantId, true),
      callbacks: {
        submit(data: unknown) {
          console.log(data);
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
