import { createApp } from "vue";
import App from "./App.vue";
import StarfishEditor from "starfish-editor";
import { Dynamicform } from "starfish-form";
import Router from './router'
const app = createApp(App);
app.use(StarfishEditor);
app.use(Router);
app.component(Dynamicform.name, Dynamicform);

app.mount("#app");
