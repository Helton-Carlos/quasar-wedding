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
        path: "cadastro-convidado",
        component: () => import("pages/CadastroConvidado.vue"),
      },
      {
        path: "lista-presentes",
        component: () => import("pages/ListaPresentes.vue"),
      },
      {
        path: "cadastro-presente",
        component: () => import("pages/CadastroPresente.vue"),
      },
      {
        path: "lista-fornecedores",
        component: () => import("pages/ListaFornecedores.vue"),
      },
      {
        path: "cadastro-fornecedor",
        component: () => import("pages/CadastroFornecedor.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
