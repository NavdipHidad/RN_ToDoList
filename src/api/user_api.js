import ApiManager from './Api_manager';

export const user_login = async data => {
  try {
    const result = await ApiManager('/user/loginUser', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      data,
    });
    return result;
  } catch (error) {
    return error.response;
  }
};

export const getUserName = async data => {
  try {
    console.log('Data at api', data);
    const result = await ApiManager('/user/getUserName', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: data.uToken,
      },
      // authorization: data.uToken,
    });
    console.log('Result at user_api', result);
    return result;
  } catch (error) {
    return error.response;
  }
};
