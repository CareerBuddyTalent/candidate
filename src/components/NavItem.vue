<template>
  <main class="flex">
    <div class="hidden lg:block" v-for="nav in navItems" :key="nav">
      <router-link :to="nav.url" class="p-3 mr-3 text-[#FEE1E6]">{{ nav.name }}</router-link>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';

const navItems = ref([
  {
    name: 'Job Pool',
    url: '/jobs',
  },
  {
    name: 'Applied',
    url: '/applied',
  },
  {
    name: 'Assessment',
    url: '/assessment',
  },
  {
    name: 'Wallet',
    url: '/wallet',
  },
]);
</script>
