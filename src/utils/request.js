/* global sessionStorage */

import axios from 'axios';

/* Helps when User reload the page or come from a Login page */
let authorizationHeader = sessionStorage.getItem('authorizationHeader') || '';

const request = async (args) => {
  if (typeof args === 'string') {
    args = {
      url: args,
    };
  }

  args.method = args.method || 'GET';

  /* Check if we can start using User authorization for every request he makes */
  if (authorizationHeader) {
    if (!args.headers ||
        typeof args.headers !== 'object'
    ) {
      args.headers = {};
    }

    args.headers.authorization = authorizationHeader;
  }

  const response = await axios(args);

  const newAuthorizationHeader = response.headers.authorization || response.headers.Authorization;
  if (newAuthorizationHeader) {
    authorizationHeader = newAuthorizationHeader;
    sessionStorage.setItem('authorizationHeader', authorizationHeader);
  }

  return response;
};

/* Short-hands */
request.getAuthorizationHeader = () => authorizationHeader;
request.get = (url, args) => request(url, {...args, method: 'GET'});
request.put = (url, args) => request(url, {...args, method: 'PUT'});
request.post = (url, args) => request(url, {...args, method: 'POST'});
request.delete = (url, args) => request(url, {...args, method: 'DELETE'});

export default request;
