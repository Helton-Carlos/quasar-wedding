<template>
  <q-page padding>
    <div class="q-pa-md" style="max-width: 600px; margin: 0 auto">
      <div class="text-h5 q-mb-md">
        {{ isEdit ? "Editar Convidado" : "Cadastrar Convidado" }}
      </div>

      <q-form @submit="salvarConvidado" class="q-gutter-md">
        <q-input
          filled
          v-model="form.nome"
          label="Nome Completo *"
          :rules="[(val) => !!val || 'Nome é obrigatório']"
        >
          <template v-slot:prepend>
            <q-icon name="person" />
          </template>
        </q-input>

        <q-input
          filled
          v-model="form.email"
          label="Email *"
          type="email"
          :rules="[
            (val) => !!val || 'Email é obrigatório',
            (val) => /.+@.+\..+/.test(val) || 'Email inválido',
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="email" />
          </template>
        </q-input>

        <q-input
          filled
          v-model="form.telefone"
          label="Telefone *"
          mask="(##) #####-####"
          :rules="[(val) => !!val || 'Telefone é obrigatório']"
        >
          <template v-slot:prepend>
            <q-icon name="phone" />
          </template>
        </q-input>

        <q-select
          filled
          v-model="form.confirmado"
          :options="['Sim', 'Não', 'Pendente']"
          label="Confirmado *"
          :rules="[(val) => !!val || 'Selecione uma opção']"
        >
          <template v-slot:prepend>
            <q-icon name="check_circle" />
          </template>
        </q-select>

        <div class="row q-gutter-sm">
          <q-btn
            type="submit"
            label="Salvar"
            color="primary"
            icon="save"
            :loading="loading"
          />
          <q-btn
            label="Cancelar"
            color="negative"
            flat
            icon="cancel"
            @click="voltar"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useQuasar } from "quasar";
import type { Convidado } from "src/utils/convidado";

const router = useRouter();
const route = useRoute();
const $q = useQuasar();

const isEdit = ref(false);
const loading = ref(false);

const form = ref<Convidado>({
  nome: "",
  email: "",
  telefone: "",
  confirmado: "Pendente",
});

// Mock de dados para simular carregamento
const mockConvidados = [
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
];

onMounted(() => {
  const id = route.query.id;
  if (id) {
    isEdit.value = true;
    // Simula carregamento de dados
    const convidado = mockConvidados.find((c) => c.id === Number(id));
    if (convidado) {
      form.value = { ...convidado };
    }
  }
});

const salvarConvidado = () => {
  loading.value = true;

  setTimeout(() => {
    $q.notify({
      type: "positive",
      message: isEdit.value
        ? "Convidado atualizado com sucesso!"
        : "Convidado cadastrado com sucesso!",
      position: "top",
    });
    loading.value = false;
    router.push("/lista-convidados");
  }, 500);
};

const voltar = () => {
  router.push("/lista-convidados");
};
</script>
