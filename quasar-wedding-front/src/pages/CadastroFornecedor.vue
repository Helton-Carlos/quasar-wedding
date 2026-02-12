<template>
  <q-page padding>
    <q-btn
      class="q-mb-md"
      label="Voltar"
      flat
      icon="arrow_back"
      @click="voltar"
    />

    <div class="q-pa-md" style="max-width: 600px; margin: 0 auto">
      <div class="text-h5 q-mb-md">
        {{ isEdit ? "Editar Fornecedor" : "Cadastrar Fornecedor" }}
      </div>

      <q-form @submit="salvarFornecedor" class="q-gutter-md">
        <q-input
          filled
          v-model="form.name"
          label="Nome do Fornecedor *"
          :rules="[(val) => !!val || 'Nome é obrigatório']"
        >
          <template v-slot:prepend>
            <q-icon name="business" />
          </template>
        </q-input>

        <q-select
          filled
          v-model="form.categories"
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
          v-model="form.phone"
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
          v-model="form.price"
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
import type { Supplier } from "src/utils/fornecedor";

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

const form = ref<Supplier>({
  name: "",
  categories: "",
  phone: "",
  price: "",
});

const mockFornecedores = [
  {
    id: 1,
    name: "Buffet Delícias",
    categories: "Buffet",
    phone: "(11) 3456-7890",
    price: "R$ 15.000,00",
  },
  {
    id: 2,
    name: "Foto & Vídeo Premium",
    categories: "Fotografia",
    phone: "(11) 3456-1234",
    price: "R$ 5.000,00",
  },
  {
    id: 3,
    name: "Flores & Decoração",
    categories: "Decoração",
    phone: "(11) 3456-5678",
    price: "R$ 8.000,00",
  },
];

onMounted(() => {
  const id = route.query.id;
  if (id) {
    isEdit.value = true;
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
    router.push("/lista-fornecedores");
  }, 500);
};

const voltar = () => {
  router.push("/lista-fornecedores");
};
</script>
