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
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

const $q = useQuasar();
const router = useRouter();

const columns = [
  {
    name: "nome",
    required: true,
    label: "Presente",
    align: "left" as const,
    field: "nome" as const,
    sortable: true,
  },
  {
    name: "valor",
    label: "Valor",
    align: "left" as const,
    field: "valor" as const,
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
    name: "compradoPor",
    label: "Comprado Por",
    align: "left" as const,
    field: "compradoPor" as const,
  },
  {
    name: "actions",
    label: "Ações",
    align: "center" as const,
    field: "actions" as const,
  },
];

const presentes = ref([
  {
    id: 1,
    nome: "Jogo de Panelas",
    valor: "R$ 450,00",
    status: "Disponível",
    compradoPor: "-",
  },
  {
    id: 2,
    nome: "Liquidificador",
    valor: "R$ 250,00",
    status: "Reservado",
    compradoPor: "Ana Costa",
  },
  {
    id: 3,
    nome: "Jogo de Cama",
    valor: "R$ 350,00",
    status: "Disponível",
    compradoPor: "-",
  },
]);

const pagination = ref({
  rowsPerPage: 10,
});

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
  $q.notify({
    type: "negative",
    message: "Presente removido",
    position: "top",
  });
};
</script>
