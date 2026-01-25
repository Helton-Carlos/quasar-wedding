<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Quasar-Wedding </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Menu </q-item-label>

        <q-item
          v-for="link in menuLinks"
          :key="link.path"
          clickable
          :to="link.path"
          active-class="text-primary"
        >
          <q-item-section avatar>
            <q-icon :name="link.icon" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ link.title }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface MenuLink {
  title: string;
  icon: string;
  path: string;
}

const menuLinks: MenuLink[] = [
  {
    title: "Início",
    icon: "home",
    path: "/",
  },
  {
    title: "Lista de Convidados",
    icon: "people",
    path: "/lista-convidados",
  },
  {
    title: "Lista de Presentes",
    icon: "card_giftcard",
    path: "/lista-presentes",
  },
  {
    title: "Fornecedores",
    icon: "business",
    path: "/fornecedores",
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
