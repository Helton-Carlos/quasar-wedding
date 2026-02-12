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
        {{ isEdit ? "Editar Presente" : "Cadastrar Presente" }}
      </div>

      <q-form @submit="salvarPresente" class="q-gutter-md">
        <q-input
          filled
          v-model="form.name"
          label="Nome do Presente *"
          :rules="[(val) => !!val || 'Nome é obrigatório']"
        >
          <template v-slot:prepend>
            <q-icon name="card_giftcard" />
          </template>
        </q-input>

        <q-input
          filled
          v-model="form.price"
          label="Valor *"
          prefix="R$"
          :rules="[(val) => !!val || 'Valor é obrigatório']"
        >
          <template v-slot:prepend>
            <q-icon name="attach_money" />
          </template>
        </q-input>

        <q-select
          filled
          v-model="form.status"
          :options="['Disponível', 'Reservado', 'Comprado']"
          label="Status *"
          :rules="[(val) => !!val || 'Selecione um status']"
        >
          <template v-slot:prepend>
            <q-icon name="info" />
          </template>
        </q-select>

        <q-input
          filled
          v-model="form.idGuest"
          label="Comprado Por"
          :disable="form.status === 'Disponível'"
        >
          <template v-slot:prepend>
            <q-icon name="person" />
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
import { ref, watch, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useQuasar } from "quasar";
import type { Gift } from "src/utils/presente";

const router = useRouter();
const route = useRoute();
const $q = useQuasar();

const isEdit = ref(false);
const loading = ref(false);

const form = ref<Gift>({
  name: "",
  price: "",
  status: "Disponível",
  idGuest: -1,
});

const mockPresentes = [
  {
    id: 1,
    name: "Jogo de Panelas",
    price: "R$ 450,00",
    status: "Disponível",
    idGuest: -1,
  },
  {
    id: 2,
    name: "Liquidificador",
    price: "R$ 250,00",
    status: "Reservado",
    idGuest: 1,
  },
  {
    id: 3,
    name: "Jogo de Cama",
    price: "R$ 350,00",
    status: "Disponível",
    idGuest: -1,
  },
];

onMounted(() => {
  const id = route.query.id;
  if (id) {
    isEdit.value = true;

    const presente = mockPresentes.find((p) => p.id === Number(id));
    if (presente) {
      form.value = { ...presente };
    }
  }
});

watch(
  () => form.value.status,
  (newStatus) => {
    if (newStatus === "Disponível") {
      form.value.status = "-";
    }
  },
);

const salvarPresente = () => {
  loading.value = true;

  setTimeout(() => {
    $q.notify({
      type: "positive",
      message: isEdit.value
        ? "Presente atualizado com sucesso!"
        : "Presente cadastrado com sucesso!",
      position: "top",
    });
    loading.value = false;
    router.push("/lista-presentes");
  }, 500);
};

const voltar = () => {
  router.push("/lista-presentes");
};
</script>
