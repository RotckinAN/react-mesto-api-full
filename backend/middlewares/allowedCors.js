const allowedCors = [
  'https://manovieta.nomoredomains.club',
  'http://manovieta.nomoredomains.club',
  'localhost:3000',
];

const allowedCorsMiddleware = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  return next();
};

module.exports = {
  allowedCorsMiddleware,
};
