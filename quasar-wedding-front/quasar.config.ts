// Configuration for your app
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-file

import { defineConfig } from "#q-app/wrappers";

export default defineConfig((/* ctx */) => {
  return {
    boot: ["api"],
    css: ["app.scss"],
    extras: ["fontawesome-v6", "roboto-font", "material-icons"],

    build: {
      target: {
        browser: ["es2022", "firefox115", "chrome115", "safari14"],
        node: "node20",
      },

      typescript: {
        strict: true,
        vueShim: true,
      },

      vueRouterMode: "history",

      env: {
        API_URL: "http://localhost:8080",
      },
    },

    devServer: {
      open: true,
    },

    framework: {
      config: {},
      plugins: ["Notify", "Dialog"],
      lang: "pt-BR",
    },

    animations: [],

    ssr: {
      prodPort: 3000,

      middlewares: ["render"],

      pwa: false,
    },

    pwa: {
      workboxMode: "GenerateSW",
    },

    cordova: {},

    capacitor: {
      hideSplashscreen: true,
    },

    electron: {
      preloadScripts: ["electron-preload"],
      inspectPort: 5858,

      bundler: "packager",

      packager: {},

      builder: {
        appId: "quasar-wedding",
      },
    },

    bex: {
      extraScripts: [],
    },
  };
});
