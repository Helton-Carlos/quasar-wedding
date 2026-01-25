<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center bg-grey-2">
        <q-card class="login-card q-pa-md">
          <q-card-section>
            <div class="text-h5 text-center q-mb-md">Login</div>
          </q-card-section>

          <q-card-section>
            <q-form @submit="handleLogin" class="q-gutter-md">
              <q-input
                filled
                v-model="form.email"
                label="Email"
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
                v-model="form.password"
                label="Senha"
                :type="showPassword ? 'text' : 'password'"
                :rules="[(val) => !!val || 'Senha é obrigatória']"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="showPassword ? 'visibility' : 'visibility_off'"
                    class="cursor-pointer"
                    @click="showPassword = !showPassword"
                  />
                </template>
              </q-input>

              <div>
                <q-btn
                  type="submit"
                  label="Entrar"
                  color="primary"
                  class="full-width"
                  :loading="loading"
                />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

const router = useRouter();
const $q = useQuasar();

const form = reactive({
  email: "",
  password: "",
});

const showPassword = ref(false);
const loading = ref(false);

const handleLogin = () => {
  loading.value = true;

  setTimeout(() => {
    if (form.email === "admin@gmail.com" && form.password === "admin123") {
      $q.notify({
        type: "positive",
        message: "Login realizado com sucesso!",
        position: "top",
      });
      router.push("/");
    } else {
      $q.notify({
        type: "negative",
        message: "Email ou senha incorretos",
        position: "top",
      });
    }
    loading.value = false;
  }, 500);
};
</script>

<style scoped>
.login-card {
  width: 100%;
  max-width: 400px;
}
</style>
