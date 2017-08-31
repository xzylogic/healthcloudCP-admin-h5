export const environment = {
  production: true
};

export const app = {
  title: '昌平健康云医院后台',
  api_url: 'http://10.2.10.10/pci-operation/',
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
