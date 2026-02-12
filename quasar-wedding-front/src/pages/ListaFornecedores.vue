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
import { onMounted } from "vue";
import { api } from "src/boot/api";

const $q = useQuasar();
const router = useRouter();
const fornecedores = ref([]);

const columns = [
  {
    name: "name",
    required: true,
    label: "Nome",
    align: "left" as const,
    field: "name" as const,
    sortable: true,
  },
  {
    name: "categories",
    label: "Categoria",
    align: "left" as const,
    field: "categories" as const,
    sortable: true,
  },
  {
    name: "phone",
    label: "Telefone",
    align: "left" as const,
    field: "phone" as const,
  },
  {
    name: "price",
    label: "Valor",
    align: "left" as const,
    field: "price" as const,
    sortable: true,
  },
  {
    name: "actions",
    label: "Ações",
    align: "center" as const,
    field: "actions" as const,
  },
];

onMounted(async () => {
  await getAllSupplier();
});

const pagination = ref({
  rowsPerPage: 10,
});

async function getAllSupplier() {
  try {
    const response = await api.get("/supplier/get-all-suppliers");
    fornecedores.value = response.data.data;

    $q.notify({
      type: "success",
      message: response.data.message || "Fornecedores carregados com sucesso",
      position: "top",
    });
  } catch (error) {
    $q.notify({
      type: "negative",
      message: "Erro ao carregar fornecedores",
      position: "top",
    });
  }
}

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
