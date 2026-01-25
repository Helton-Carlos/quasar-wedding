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
import { ref } from "vue";
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
