import {myAxios} from './helper';

export const addQuery = (formData) => {
  return myAxios.post('/api/addQuery', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};