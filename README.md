# XMTP PWA with Capsule Tutorial

### Installation

```bash
yarn install
yarn start
```

### API KEY

While building in Beta environment no API KEY is needed. Could be surfaced in the Docs.

```jsx
const capsule = new Capsule(Environment.BETA, undefined);
```

### Polyfills with Craco

This file is important for successfully installing the SDKs. Could be surfaced more in the Docs.

```jsx
const webpack = require("webpack");
module.exports = {
  webpack: {
    plugins: {
      add: [
        new webpack.ProvidePlugin({
          Buffer: ["buffer", "Buffer"],
        }),
      ],
    },
    configure: (webpackConfig) => {
      // ts-loader is required to reference external typescript projects/files (non-transpiled)
      webpackConfig.module.rules.push({
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
          configFile: "tsconfig.json",
        },
      });
      webpackConfig.resolve.fallback = {
        // crypto and stream needed for @celo/utils
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
        url: false,
        zlib: false,
        https: false,
        http: false,
      };

      return webpackConfig;
    },
  },
};
```

### CapsuleModal is Blank

If i try to switch to `CapsuleModal`, nothing shows in the screen?

### Logout

How can i handle `Logout` programatically if the button is not displayed anymore?

### Reactivity

How can i know that i `logged in` into the SDK with the button. Is there a hook i can use or a callback?
