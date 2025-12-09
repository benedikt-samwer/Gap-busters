import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader
import { createVuetify } from "vuetify";

export default createVuetify({
  icons: {
    defaultSet: "mdi",
    sets: {},
  },
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          "cyan-1": "#00FFFF",
          "cyan-2": "#00CCCC",
          "cyan-3": "#009999",
          "cyan-4": "#006666",
          "cyan-5": "#003636",
        },
      },
    },
  },
});
