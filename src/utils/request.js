/* global sessionStorage */

import axios from 'axios'

/* Helps when User reload the page or come from a Login page */
let AuthorizationHeader = sessionStorage.getItem('AuthorizationHeader') || ''

const request = async (args) => {
  if (typeof args === 'string') {
    args = {
      url: args
    }
  }

  args.method = args.method || 'GET'

  /* Check if we can start using User authorization for every request he makes */
  if (AuthorizationHeader) {
    if (!args.headers ||
        typeof args.headers !== 'object'
    ) {
      args.headers = {}
    }

    args.headers.authorization = AuthorizationHeader
  }

  const response = await axios(args)

  const newAuthorizationHeader = response.headers.authorization || response.headers.Authorization
  if (newAuthorizationHeader) {
    AuthorizationHeader = newAuthorizationHeader
    sessionStorage.setItem('AuthorizationHeader', AuthorizationHeader)
  }

  return response
}

/* Short-hands */
request.getAuthorizationHeader = () => AuthorizationHeader
request.get = (url, args) => request(url, {...args, method: 'GET'})
request.put = (url, args) => request(url, {...args, method: 'PUT'})
request.post = (url, args) => request(url, {...args, method: 'POST'})
request.delete = (url, args) => request(url, {...args, method: 'DELETE'})

export default request
