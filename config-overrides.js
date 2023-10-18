module.exports = function override(config, env) {
  // Add the fallback to the config
  config.resolve.fallback = {
    ...config.resolve.fallback,
    crypto: require.resolve("crypto-browserify"),
  };

  return config;
};
