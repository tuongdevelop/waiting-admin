// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_BASE_URL: 'http://waiting-api.dev.hdwebsoft.co/waiting-system-api/',
  DOMAIN: 'http://waiting-api.dev.hdwebsoft.co/waiting-system-api',
  WS_BASE_URL: 'ws://waiting-api.dev.hdwebsoft.co/waiting-system-api/',
  CLIENT_ID: '',
  CLIENT_SECRET: '',
  TENANT: '',
  DASHBOARD_ROUTE: '/event'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
