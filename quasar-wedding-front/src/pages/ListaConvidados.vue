<template>
  <q-page padding>
    <div class="q-pa-md">
      <div class="row justify-between items-center q-mb-md">
        <div class="text-h5">Lista de Convidados</div>
        <q-btn
          color="primary"
          icon="add"
          label="Adicionar Convidado"
          @click="adicionarConvidado"
        />
      </div>

      <q-table
        :rows="convidados"
        :columns="columns"
        row-key="id"
        :pagination="pagination"
      >
        <template v-slot:body-cell-confirmado="props">
          <q-td :props="props">
            <q-badge
              :color="
                props.row.confirmado === 'Sim'
                  ? 'green'
                  : props.row.confirmado === 'Não'
                    ? 'red'
                    : 'orange'
              "
            >
              {{ props.row.confirmado }}
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
              @click="editarConvidado(props.row)"
            />
            <q-btn
              flat
              dense
              round
              icon="delete"
              color="negative"
              @click="deletarConvidado(props.row.id)"
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
const convidados = ref([]);

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
    name: "email",
    label: "Email",
    align: "left" as const,
    field: "email" as const,
    sortable: true,
  },
  {
    name: "phone",
    label: "Telefone",
    align: "left" as const,
    field: "phone" as const,
  },
  {
    name: "confirmed",
    label: "Confirmado",
    align: "center" as const,
    field: "confirmed" as const,
    sortable: true,
  },
  {
    name: "actions",
    label: "Ações",
    align: "center" as const,
    field: "actions" as const,
  },
];

onMounted(() => {
  getAllGuests();
});

const pagination = ref({
  rowsPerPage: 10,
});

async function getAllGuests() {
  try {
    const response = await api.get("/api/guest/get-all-guests");
    convidados.value = response.data.data;

    $q.notify({
      type: "success",
      message: response.data.message || "Convidados carregados com sucesso",
      position: "top",
    });
  } catch (error) {
    $q.notify({
      type: "negative",
      message: "Erro ao carregar convidados",
      position: "top",
    });
  }
}

const adicionarConvidado = () => {
  router.push("/cadastro-convidado");
};

const editarConvidado = (convidado: any) => {
  router.push({
    path: "/cadastro-convidado",
    query: { id: convidado.id },
  });
};

const deletarConvidado = (id: number) => {
  $q.notify({
    type: "negative",
    message: "Convidado removido",
    position: "top",
  });
};
</script>
