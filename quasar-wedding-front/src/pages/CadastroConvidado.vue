<template>
  <q-page padding>
    <q-btn
      class="q-pb-md"
      label="Voltar"
      flat
      icon="arrow_back"
      @click="voltar"
    />

    <div class="q-pa-md" style="max-width: 600px; margin: 0 auto">
      <div class="text-h5 q-mb-md">
        {{ isEdit ? "Editar Convidado" : "Cadastrar Convidado" }}
      </div>

      <q-form @submit="salvarConvidado" class="q-gutter-md">
        <q-input
          filled
          v-model="form.name"
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
          v-model="form.phone"
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
          v-model="form.confirmed"
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
import { api } from "src/boot/api";
import type { Guest } from "src/utils/convidado";

const router = useRouter();
const route = useRoute();
const $q = useQuasar();

const isEdit = ref(false);
const loading = ref(false);

const form = ref<Guest>({
  name: "",
  email: "",
  phone: "",
  confirmed: "Pendente",
});

onMounted(async () => {
  const id = route.query.id;
  if (id) {
    isEdit.value = true;

    await getGuest(id as string);
  }
});

const getGuest = async (id: string) => {
  try {
    const response = await api.get(`/guest/get-guest/${id}`);

    form.value = response.data.data;
  } catch (error) {
    console.error("Erro ao buscar convidado:", error);
    $q.notify({
      type: "negative",
      message: "Erro ao carregar dados do convidado",
      position: "top",
    });
  }
};

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
