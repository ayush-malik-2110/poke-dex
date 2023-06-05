import { AXIOS_METHODS } from '../../vendors/axios'


export const fetchAppConfig = (): { url: string; method: string } => ({
  url: 'ui_config/app.json',
  method: AXIOS_METHODS.GET,
});