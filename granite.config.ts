import { defineConfig } from "@apps-in-toss/web-framework/config";

export default defineConfig({
  appName: "lucky-tomato-game",
  brand: {
    displayName: "멋쟁이 럭키 토마토 게임",
    primaryColor: "#f24c3f",
    icon: "https://raw.githubusercontent.com/newstar9194/green-leaf-lucky-girl/master/appintoss-assets/app-logo-600.png",
  },
  web: {
    host: "localhost",
    port: 5173,
    commands: {
      dev: "vite --host 0.0.0.0",
      build: "vite build",
    },
  },
  webViewProps: {
    type: "game",
    bounces: false,
    pullToRefreshEnabled: false,
    overScrollMode: "never",
    allowsBackForwardNavigationGestures: false,
  },
  navigationBar: {
    withBackButton: false,
    withHomeButton: false,
  },
  permissions: [],
  outdir: "dist",
});
