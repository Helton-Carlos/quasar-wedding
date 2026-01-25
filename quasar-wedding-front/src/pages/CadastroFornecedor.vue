<template>
  <q-page padding>
    <div class="q-pa-md" style="max-width: 600px; margin: 0 auto">
      <div class="text-h5 q-mb-md">
        {{ isEdit ? "Editar Fornecedor" : "Cadastrar Fornecedor" }}
      </div>

      <q-form @submit="salvarFornecedor" class="q-gutter-md">
        <q-input
          filled
          v-model="form.nome"
          label="Nome do Fornecedor *"
          :rules="[(val) => !!val || 'Nome é obrigatório']"
        >
          <template v-slot:prepend>
            <q-icon name="business" />
          </template>
        </q-input>

        <q-select
          filled
          v-model="form.categoria"
          :options="categorias"
          label="Categoria *"
          :rules="[(val) => !!val || 'Selecione uma categoria']"
        >
          <template v-slot:prepend>
            <q-icon name="category" />
          </template>
        </q-select>

        <q-input
          filled
          v-model="form.telefone"
          label="Telefone *"
          mask="(##) ####-####"
          :rules="[(val) => !!val || 'Telefone é obrigatório']"
        >
          <template v-slot:prepend>
            <q-icon name="phone" />
          </template>
        </q-input>

        <q-input
          filled
          v-model="form.valor"
          label="Valor do Serviço *"
          prefix="R$"
          :rules="[(val) => !!val || 'Valor é obrigatório']"
        >
          <template v-slot:prepend>
            <q-icon name="attach_money" />
          </template>
        </q-input>

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
import type { Fornecedor } from "src/utils/fornecedor";

const router = useRouter();
const route = useRoute();
const $q = useQuasar();

const isEdit = ref(false);
const loading = ref(false);

const categorias = [
  "Buffet",
  "Fotografia",
  "Decoração",
  "Música/DJ",
  "Filmagem",
  "Bolo",
  "Convites",
  "Flores",
  "Iluminação",
  "Outros",
];

const form = ref<Fornecedor>({
  nome: "",
  categoria: "",
  telefone: "",
  valor: "",
});

// Mock de dados para simular carregamento
const mockFornecedores = [
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
];

onMounted(() => {
  const id = route.query.id;
  if (id) {
    isEdit.value = true;
    // Simula carregamento de dados
    const fornecedor = mockFornecedores.find((f) => f.id === Number(id));
    if (fornecedor) {
      form.value = { ...fornecedor };
    }
  }
});

const salvarFornecedor = () => {
  loading.value = true;

  setTimeout(() => {
    $q.notify({
      type: "positive",
      message: isEdit.value
        ? "Fornecedor atualizado com sucesso!"
        : "Fornecedor cadastrado com sucesso!",
      position: "top",
    });
    loading.value = false;
    router.push("/fornecedores");
  }, 500);
};

const voltar = () => {
  router.push("/fornecedores");
};
</script>
