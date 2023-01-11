const { override } = require('customize-cra');
const CspHtmlWebpackPlugin = require("@melloware/csp-webpack-plugin");

const cspConfigPolicy = {
  'default-src': "'none'",
  'object-src': "'none'",
  'base-uri': "'self'",
  'connect-src': `'self' https://*`,
  'worker-src': "'none'",
  'img-src': "'self' https://*",
  'font-src': "'self'",
  'frame-src': "'none'",
  'media-src': "'self'",
  'manifest-src': "'self'",
  'style-src': ["'self'","'unsafe-inline'"],
  'script-src': ["'self'", "plausible.io"],
  'require-trusted-types-for': ["'script'"]
};

const cspConfigOptions = {
  enabled: true,
  integrityEnabled: true,
  primeReactEnabled: false,
  trustedTypesEnabled: true,
  hashingMethod: 'sha384',
  hashEnabled: {
    'script-src': true,
    'style-src': true
  },
  nonceEnabled: {
    'script-src': false,
    'style-src': false
  }
}

function addCspHtmlWebpackPlugin(config) {
  if (process.env.NODE_ENV === 'production') {
    config.plugins.push(new CspHtmlWebpackPlugin(cspConfigPolicy, cspConfigOptions));
    config.output.crossOriginLoading = "anonymous";
  }
  return config;
}

module.exports = {
  webpack: override(addCspHtmlWebpackPlugin),
};
