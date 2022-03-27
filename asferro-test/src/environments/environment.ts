// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { environment as prod_env } from './environment.prod';

export const environment = {
  ...prod_env,
  production: false
};
