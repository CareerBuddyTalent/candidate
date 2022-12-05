<template>
  <header class="bg-brand-primary rounded-b-[30px] shadow w-screen">
    <div class="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
      <div v-if="hasSlot('body')">
        <slot name="body"></slot>
      </div>
      <div v-else>
        <p class="font-normal text-2xl italic text-white font-cooper">{{ currentRouteName }}</p>
        <p class="font-normal text-base text-white/80">{{ currentRouteSubText }}</p>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, useSlots } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const slots = useSlots();

const hasSlot = (name) => {
  return !!slots[name];
};

const currentRouteName = computed(() => {
  return route.meta.title || route.name;
});

const currentRouteSubText = computed(() => {
  return route.meta.text;
});
</script>
