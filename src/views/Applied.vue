<template>
  <div>
    <NavBody />
    <Card :details="card" viewType="application" class="cursor-pointer mt-24" :path="route.path" />
  </div>
</template>

<script setup>
import Card from '@/components/Card.vue';
import NavBody from '@/components/NavBody.vue';
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const currentRouteName = computed(() => {
  return route.meta.title || route.name;
});

const currentRouteSubText = computed(() => {
  return route.meta.text;
});

const card = ref([
  {
    id: '1',
    image: 'https://via.placeholder.com/320X430',
    role: 'Product Design Lead',
    companyName: 'COWRYWISE',
    type: 'Full time | Remote',
    amount: '$8,000 - $11,000',
    status: 'pending',
    contact: 'Alison',
    time: '14days',
  },
  {
    id: '2',
    image: 'https://via.placeholder.com/320X430',
    role: 'Product Design Lead',
    companyName: 'COWRYWISE',
    type: 'Full time | Remote',
    amount: '$11,000 - $15,000',
    status: 'interview',
    contact: 'Alison',
    time: '14days',
  },
  {
    id: '3',
    image: 'https://via.placeholder.com/320X430',
    role: 'Product Design Lead',
    companyName: 'COWRYWISE',
    type: 'Full time | Remote',
    amount: '$10,000 - $12,000',
    status: 'hired',
    contact: 'Alison',
    time: '14days',
  },
  {
    id: '4',
    image: 'https://via.placeholder.com/320X430',
    role: 'Product Design Lead',
    companyName: 'COWRYWISE',
    type: 'Full time | Remote',
    amount: '$1,000 - $20,000',
    status: 'rejected',
    contact: 'Alison',
    time: '14days',
  },
  {
    id: '5',
    image: 'https://via.placeholder.com/320X430',
    role: 'Product Design Lead',
    companyName: 'COWRYWISE',
    type: 'Full time | Remote',
    amount: '$18,000 - $2,000',
    status: 'Pending',
    contact: 'Alison',
    time: '14days',
  },
  {
    id: '6',
    image: 'https://via.placeholder.com/320X430',
    role: 'Product Design Lead',
    companyName: 'COWRYWISE',
    type: 'Full time | Remote',
    amount: '$60,000 - $92,000',
    status: 'interview',
    contact: 'Alison',
    time: '14days',
  },
]);
</script>
