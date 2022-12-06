import { createApp } from "vue";
import App from "./App.vue";
import StarfishEditor from "starfish-editor";

import Router from './router'
import 'starfish-editor/dist/style.css';
const app = createApp(App);
app.use(StarfishEditor);
app.use(Router);

app.mount("#app");
