// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false
};

export const app = {
  title: '昌平健康云医院后台',
  api_url: 'http://10.2.10.142:8088/changping-internal',
  // api_url: 'http://10.1.64.194/changping-internal',
  qiniu_url: 'http://10.2.10.10/pci-operation/',
  pci: {
    BASE_URL: 'http://10.2.10.10/pci-operation/',
    COMMON_URL: 'http://10.2.10.10/pro-health/',
    UPLOAD_URL: 'http://10.2.10.10/pci-operation/api/upload'
  },
  kidney: {
    BASE_URL: 'http://10.2.10.10:80/kidney-backend-test/',
    CAN_URL: 'http://10.2.10.10:80/kidney-scheduler-test/',
    COMMON_URL: 'http://10.2.10.10/pro-health/',
    UPLOAD_URL: 'http://10.2.10.10/pci-operation/api/upload'
  }
};

