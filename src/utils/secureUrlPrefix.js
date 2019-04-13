function secureUrlPrefix(url) {
  url = String(url || '');

  return url.startsWith('http')
    ? url
    : `http://${url}`;
}

export default secureUrlPrefix;
