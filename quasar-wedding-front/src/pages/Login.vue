<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center bg-grey-2">
        <q-card class="login-card q-pa-md">
          <q-card-section>
            <div class="text-h5 text-center q-mb-md">Login</div>
          </q-card-section>

          <q-card-section>
            <q-form
              v-if="!formRegister"
              @submit="handleLogin"
              class="q-gutter-md"
            >
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

              <div class="q-flex">
                <q-btn
                  type="submit"
                  label="Entrar"
                  color="primary"
                  class="full-width q-mb-sm"
                  :loading="loading"
                />

                <q-btn
                  label="Não sou cadastrado"
                  flat
                  dense
                  color="negative"
                  class="full-width"
                  @click="register"
                  :loading="loading"
                />
              </div>
            </q-form>

            <q-form v-else @submit="handleRegister" class="q-gutter-md">
              <q-input
                filled
                v-model="form.name"
                label="Nome"
                type="text"
                :rules="[(val) => !!val || 'Nome é obrigatória']"
              >
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
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

              <div class="q-flex">
                <q-btn
                  type="submit"
                  label="Entrar"
                  color="primary"
                  class="full-width q-mb-sm"
                  :loading="loading"
                />

                <q-btn
                  label="Não sou cadastrado"
                  flat
                  dense
                  color="negative"
                  class="full-width"
                  @click="register"
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
import { api } from "src/boot/api";

const router = useRouter();
const $q = useQuasar();

const form = reactive({
  name: "",
  email: "",
  password: "",
});

const showPassword = ref<boolean>(false);
const loading = ref<boolean>(false);
const formRegister = ref<boolean>(false);

const handleLogin = async () => {
  loading.value = true;

  try {
    const { password, email } = form;

    const { data } = await api.post("/user/sign-in", {
      password,
      email,
    });

    router.push("/");

    $q.notify({
      type: "positive",
      message: `Seja bem-vindo, ${data.user.name}!`,
      position: "top",
    });
    loading.value = false;
  } catch (error) {
    $q.notify({
      type: "negative",
      message: "Erro ao realizar login",
      position: "top",
    });

    loading.value = false;
    return;
  }
};

const handleRegister = async () => {
  loading.value = true;

  try {
    await api.post("/user/register", form);

    register();

    $q.notify({
      type: "positive",
      message: "Cadastro realizado com sucesso!",
      position: "top",
    });
    loading.value = false;
  } catch (error) {
    $q.notify({
      type: "negative",
      message: "Erro ao realizar cadastro",
      position: "top",
    });
    loading.value = false;
    return;
  }
};

const register = () => {
  formRegister.value = !formRegister.value;
};
</script>

<style scoped>
.login-card {
  width: 100%;
  max-width: 400px;
}
</style>
