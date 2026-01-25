<template>
  <q-page class="q-pa-md">
    <div class="text-h4 q-mb-md text-center">Gerenciamento de Casamento</div>
    <div class="row q-col-gutter-md justify-center">
      <div
        v-for="cardItem in cards"
        :key="cardItem.id"
        class="col-12 col-sm-6 col-md-4"
      >
        <q-card
          class="cursor-pointer card-hover"
          @click="navigateTo(cardItem.path)"
        >
          <q-img :src="cardItem.image" :ratio="16 / 9">
            <div class="absolute-bottom text-h6 text-center">
              {{ cardItem.title }}
            </div>
          </q-img>

          <q-card-section>
            <div class="text-subtitle2">{{ cardItem.description }}</div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              flat
              color="primary"
              label="Acessar"
              icon-right="arrow_forward"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

interface CardItem {
  id: number;
  title: string;
  description: string;
  path: string;
  image: string;
}

const cards = ref<CardItem[]>([
  {
    id: 1,
    title: "Lista de Convidados",
    description: "Gerencie todos os convidados do seu casamento",
    path: "/lista-convidados",
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500&h=300&fit=crop",
  },
  {
    id: 2,
    title: "Lista de Presentes",
    description: "Organize e acompanhe os presentes",
    path: "/lista-presentes",
    image:
      "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=500&h=300&fit=crop",
  },
  {
    id: 3,
    title: "Fornecedores",
    description: "Controle todos os fornecedores e serviços",
    path: "/fornecedores",
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500&h=300&fit=crop",
  },
]);

const navigateTo = (path: string) => {
  router.push(path);
};
</script>

<style scoped>
.card-hover {
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.card-hover:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
</style>
