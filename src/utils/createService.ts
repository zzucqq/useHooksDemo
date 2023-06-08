import request from './request';

const createService = (apis: any): any => {
  const service: { [key: string]: any } = {};
  Object.keys(apis).forEach(v => {
    if (typeof apis[v] === 'string') {
      service[v] = (data = {}): Promise<any> => {
        return request.post(apis[v] as string, data);
      };
    } else if (apis[v].method === 'get') {
      service[v] = (data = {}): Promise<any> => {
        return request.get(apis[v].url as string, data);
      };
    }
  });
  return service;
};

export default createService;
