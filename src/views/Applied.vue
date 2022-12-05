<template>
  <div>
    <NavBody />
    <div class="lg:px-20 px-5 py-5 mt-10">
      <Card :details="allApplications" viewType="application" :path="route.path" />
    </div>
  </div>
</template>

<script setup>
import Card from '@/components/applicationCard.vue';
import NavBody from '@/components/NavBody.vue';
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

const route = useRoute();
const store = useStore();

const currentRouteName = computed(() => {
  return route.meta.title || route.name;
});

const currentRouteSubText = computed(() => {
  return route.meta.text;
});

const allApplications = ref([]);
onMounted(async () => {
  allApplications.value = await store.dispatch('global/getAllApplications');
});
</script>
