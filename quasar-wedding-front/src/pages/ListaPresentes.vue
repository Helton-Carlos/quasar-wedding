<template>
  <q-page padding>
    <div class="q-pa-md">
      <div class="row justify-between items-center q-mb-md">
        <div class="text-h5">Lista de Presentes</div>
        <q-btn
          color="primary"
          icon="add"
          label="Adicionar Presente"
          @click="adicionarPresente"
        />
      </div>

      <q-table
        :rows="presentes"
        :columns="columns"
        row-key="id"
        :pagination="pagination"
      >
        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-badge
              :color="props.row.status === 'Disponível' ? 'green' : 'orange'"
            >
              {{ props.row.status }}
            </q-badge>
          </q-td>
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              flat
              dense
              round
              icon="edit"
              color="primary"
              @click="editarPresente(props.row)"
            />
            <q-btn
              flat
              dense
              round
              icon="delete"
              color="negative"
              @click="deletarPresente(props.row.id)"
            />
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { api } from "src/boot/api";

const $q = useQuasar();
const router = useRouter();

const columns = [
  {
    name: "name",
    required: true,
    label: "Presente",
    align: "left" as const,
    field: "name" as const,
    sortable: true,
  },
  {
    name: "price",
    label: "Valor",
    align: "left" as const,
    field: "price" as const,
    sortable: true,
  },
  {
    name: "status",
    label: "Status",
    align: "center" as const,
    field: "status" as const,
    sortable: true,
  },
  {
    name: "idGuest",
    label: "Comprado Por",
    align: "left" as const,
    field: "idGuest" as const,
  },
  {
    name: "actions",
    label: "Ações",
    align: "center" as const,
    field: "actions" as const,
  },
];

const presentes = ref([]);

const pagination = ref({
  rowsPerPage: 10,
});

onMounted(async () => {
  await getAllGifts();
});

async function getAllGifts() {
  try {
    const response = await api.get("/gift/get-all-gifts");
    presentes.value = response.data.data;

    $q.notify({
      type: "success",
      message: response.data.message || "Presentes carregados com sucesso",
      position: "top",
    });
  } catch (error) {
    $q.notify({
      type: "negative",
      message: "Erro ao carregar presentes",
      position: "top",
    });
  }
}

const adicionarPresente = () => {
  router.push("/cadastro-presente");
};

const editarPresente = (presente: any) => {
  router.push({
    path: "/cadastro-presente",
    query: { id: presente.id },
  });
};

const deletarPresente = (id: number) => {
  try {
    api.delete(`/gift/delete-gift/${id}`);
    presentes.value = presentes.value.filter((p) => p.id !== id);

    $q.notify({
      type: "positive",
      message: "Presente removido com sucesso",
      position: "top",
    });
  } catch (error) {
    $q.notify({
      type: "negative",
      message: "Erro ao remover presente",
      position: "top",
    });
  }
};
</script>
