import { createRouter, createWebHashHistory } from "vue-router";
import Editor from "@/pages/Editor/index.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/editor",
    },
    {
      path: "/editor",
      component: Editor,
    },
  ],
});

export default router;
