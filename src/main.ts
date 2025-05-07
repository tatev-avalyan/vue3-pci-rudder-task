import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';
import * as rudderanalytics from "rudder-sdk-js";

const app = createApp(App);
app.use(router);

rudderanalytics.load(
  import.meta.env.VITE_RUDDER_WRITE_KEY,
  import.meta.env.VITE_RUDDER_DATAPLANE_URL,
  {
    integrations: { All: true },
  }
);

rudderanalytics.ready(() => {
  console.log("RudderStack is ready");
});

app.mount('#app');
