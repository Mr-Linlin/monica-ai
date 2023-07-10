const productConfig = {
  accessKeyId: 'LTAI5tGyvfLhjiRnVJv2vRpt',
  accessKeySecret: 'wVOHnDXmJskCAxru5RR34l8nwABO62',
  endpoint: 'oss-cn-shenzhen.aliyuncs.com',
  bucket: 'lzt-cartoon',
  region: 'oss-cn-shenzhen',
};

const localConfig = {
  accessKeyId: 'LTAI5t7eGmTkM85gihMs6Kbh',
  accessKeySecret: 'wVOHnDXmJskCAxru5RR34l8nwABO62',
  endpoint: 'oss-cn-shenzhen.aliyuncs.com',
  bucket: 'lzt-cartoon',
  region: 'oss-cn-shenzhen',
};

// 本地运行是没有 process.env.NODE_ENV 的，借此来区分[开发环境]和[生产环境]
const ossConfig = process.env.NODE_ENV ? productConfig : localConfig;

export default ossConfig;
