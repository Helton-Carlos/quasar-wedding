import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    component: () => import("pages/Login.vue"),
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "lista-convidados",
        component: () => import("pages/ListaConvidados.vue"),
      },
      {
        path: "lista-presentes",
        component: () => import("pages/ListaPresentes.vue"),
      },
      {
        path: "fornecedores",
        component: () => import("pages/Fornecedores.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
