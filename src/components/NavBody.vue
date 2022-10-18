<template>
  <div class="bg-[#6D2E5D] lg:px-20 lg:py10 px-5 pt-0 pb-10 rounded-b-[30px] top-28 z-30 fixed w-screen transition-position">
    <div v-if="hasSlot('body')">
      <slot name="body"></slot>
    </div>
    <div v-else>
      <p class="font-normal text-2xl italic text-white font-cooper">{{ currentRouteName }}</p>
      <p class="font-normal text-base text-white/80">{{ currentRouteSubText }}</p>
    </div>
  </div>
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
