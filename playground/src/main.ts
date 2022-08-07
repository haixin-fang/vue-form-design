
import { createApp } from 'vue'
import App from './App.vue'
import StarfishEditor from 'starfish-editor'
import 'starfish-editor/dist/style.css';

const app = createApp(App);

app.use(StarfishEditor);

app.mount('#app')

