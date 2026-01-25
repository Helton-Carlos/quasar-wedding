<template>
  <q-page class="row items-center justify-evenly">
    <q-card title="Example component" active :todos="card"></q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Card } from "components/models";

const card = ref<Card[]>([
  {
    id: 1,
    content: "Lista de convidados",
    path: "lista-convidados",
  },
  {
    id: 2,
    content: "Lista de presentes",
    path: "lista-presentes",
  },
  {
    id: 3,
    content: "Fornecedores",
    path: "fornecedores",
  },
]);
</script>
