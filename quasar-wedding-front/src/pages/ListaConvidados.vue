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

const $q = useQuasar();

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
    name: "email",
    label: "Email",
    align: "left" as const,
    field: "email" as const,
    sortable: true,
  },
  {
    name: "telefone",
    label: "Telefone",
    align: "left" as const,
    field: "telefone" as const,
  },
  {
    name: "confirmado",
    label: "Confirmado",
    align: "center" as const,
    field: "confirmado" as const,
    sortable: true,
  },
  {
    name: "actions",
    label: "Ações",
    align: "center" as const,
    field: "actions" as const,
  },
];

const convidados = ref([
  {
    id: 1,
    nome: "João Silva",
    email: "joao@email.com",
    telefone: "(11) 98765-4321",
    confirmado: "Sim",
  },
  {
    id: 2,
    nome: "Maria Santos",
    email: "maria@email.com",
    telefone: "(11) 98765-1234",
    confirmado: "Não",
  },
  {
    id: 3,
    nome: "Pedro Oliveira",
    email: "pedro@email.com",
    telefone: "(11) 98765-5678",
    confirmado: "Sim",
  },
]);

const pagination = ref({
  rowsPerPage: 10,
});

const adicionarConvidado = () => {
  $q.notify({
    type: "info",
    message: "Funcionalidade de adicionar convidado",
    position: "top",
  });
};

const editarConvidado = (convidado: any) => {
  $q.notify({
    type: "info",
    message: `Editar: ${convidado.nome}`,
    position: "top",
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
