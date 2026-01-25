<template>
  <q-page padding>
    <div class="q-pa-md" style="max-width: 600px; margin: 0 auto">
      <div class="text-h5 q-mb-md">
        {{ isEdit ? "Editar Presente" : "Cadastrar Presente" }}
      </div>

      <q-form @submit="salvarPresente" class="q-gutter-md">
        <q-input
          filled
          v-model="form.nome"
          label="Nome do Presente *"
          :rules="[(val) => !!val || 'Nome é obrigatório']"
        >
          <template v-slot:prepend>
            <q-icon name="card_giftcard" />
          </template>
        </q-input>

        <q-input
          filled
          v-model="form.valor"
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
          v-model="form.compradoPor"
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
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useQuasar } from "quasar";
import type { Presente } from "src/utils/presente";

const router = useRouter();
const route = useRoute();
const $q = useQuasar();

const isEdit = ref(false);
const loading = ref(false);

const form = ref<Presente>({
  nome: "",
  valor: "",
  status: "Disponível",
  compradoPor: "-",
});

watch(
  () => form.value.status,
  (newStatus) => {
    if (newStatus === "Disponível") {
      form.value.compradoPor = "-";
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
