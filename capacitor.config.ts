import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "org.bigben.order",
  appName: "点餐应用",
  webDir: "dist",
  plugins: {
    LiveUpdates: {
      appId: "2d266be9",
      channel: "Production",
      autoUpdateMethod: "background",
      maxVersions: 2,
    },
  },
};

export default config;
