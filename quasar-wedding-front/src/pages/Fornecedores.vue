<template>
  <q-page padding>
    <div class="q-pa-md">
      <div class="row justify-between items-center q-mb-md">
        <div class="text-h5">Fornecedores</div>
        <q-btn
          color="primary"
          icon="add"
          label="Adicionar Fornecedor"
          @click="adicionarFornecedor"
        />
      </div>

      <q-table
        :rows="fornecedores"
        :columns="columns"
        row-key="id"
        :pagination="pagination"
      >
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              flat
              dense
              round
              icon="edit"
              color="primary"
              @click="editarFornecedor(props.row)"
            />
            <q-btn
              flat
              dense
              round
              icon="delete"
              color="negative"
              @click="deletarFornecedor(props.row.id)"
            />
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

const $q = useQuasar();
const router = useRouter();

const columns = [
  {
    name: "nome",
    required: true,
    label: "Nome",
    align: "left" as const,
    field: "nome" as const,
    sortable: true,
  },
  {
    name: "categoria",
    label: "Categoria",
    align: "left" as const,
    field: "categoria" as const,
    sortable: true,
  },
  {
    name: "telefone",
    label: "Telefone",
    align: "left" as const,
    field: "telefone" as const,
  },
  {
    name: "valor",
    label: "Valor",
    align: "left" as const,
    field: "valor" as const,
    sortable: true,
  },
  {
    name: "actions",
    label: "Ações",
    align: "center" as const,
    field: "actions" as const,
  },
];

const fornecedores = ref([
  {
    id: 1,
    nome: "Buffet Delícias",
    categoria: "Buffet",
    telefone: "(11) 3456-7890",
    valor: "R$ 15.000,00",
  },
  {
    id: 2,
    nome: "Foto & Vídeo Premium",
    categoria: "Fotografia",
    telefone: "(11) 3456-1234",
    valor: "R$ 5.000,00",
  },
  {
    id: 3,
    nome: "Flores & Decoração",
    categoria: "Decoração",
    telefone: "(11) 3456-5678",
    valor: "R$ 8.000,00",
  },
]);

const pagination = ref({
  rowsPerPage: 10,
});

const adicionarFornecedor = () => {
  router.push("/cadastro-fornecedor");
};

const editarFornecedor = (fornecedor: any) => {
  router.push({
    path: "/cadastro-fornecedor",
    query: { id: fornecedor.id },
  });
};

const deletarFornecedor = (id: number) => {
  $q.notify({
    type: "negative",
    message: "Fornecedor removido",
    position: "top",
  });
};
</script>
