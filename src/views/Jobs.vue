<template>
  <main>
    <NavBody>
      <template #body>
        <p class="font-normal text-xl text-white/80 lg:text-center uppercase">Welcome {{ userDetails.first_name }}</p>
        <p class="font-normal text-lg xl:text-3xl text-white lg:text-center font-cooper">We have 217 opportunities for your next step.</p>
      </template>
    </NavBody>
    <div class="lg:px-20 px-5 py-8 mt-20">
      <form class="grid gap-4 md:flex mb-10">
        <div class="relative md:w-1/4">
          <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <Search />
          </div>
          <input
            type="keyword"
            v-model="keyword"
            id="keyword"
            :name="keyword"
            class="border text-sm placeholder:text-brand-placholder rounded-md w-full pl-10 p-3 appearance-none focus:outline-none border-brand-black/10 focus:ring-0 focus:border-brand-primary"
            placeholder="Keywords..."
            required=""
          />
        </div>
        <div class="relative md:w-1/4">
          <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <Search />
          </div>
          <input
            type="keyword"
            v-model="keyword"
            id="keyword"
            :name="keyword"
            class="border text-sm placeholder:text-brand-placholder rounded-md w-full pl-10 p-3 appearance-none focus:outline-none border-brand-black/10 focus:ring-0 focus:border-brand-primary"
            placeholder="Keywords..."
            required=""
          />
        </div>
        <div class="relative md:w-1/4">
          <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <Search />
          </div>
          <input
            type="keyword"
            v-model="keyword"
            id="keyword"
            :name="keyword"
            class="border text-sm placeholder:text-brand-placholder rounded-md w-full pl-10 p-3 appearance-none focus:outline-none border-brand-black/10 focus:ring-0 focus:border-brand-primary"
            placeholder="Keywords..."
            required=""
          />
        </div>
        <Button label="Search Jobs" color="primary" size="4px" class="md:w-1/4" />
      </form>
      <div><Card :details="card" class="cursor-pointer" :path="route.path" /></div>
    </div>
  </main>
</template>

<script setup>
import Search from '@/assets/icons/search.svg?inline';
import Button from '@/components/Button.vue';
import Card from '@/components/Card.vue';
import NavBody from '@/components/NavBody.vue';
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

const route = useRoute();
const store = useStore();

const userDetails = computed(() => {
  return store.state.auth.userDetails;
});

const card = ref([
  {
    id: '1',
    image: 'https://via.placeholder.com/320X430',
    role: 'Product Design Lead',
    companyName: 'COWRYWISE',
    type: 'Full time | Remote',
    amount: '$8,000 - $11,000',
  },
  {
    id: '2',
    image: 'https://via.placeholder.com/320X430',
    role: 'Product Design Lead',
    companyName: 'COWRYWISE',
    type: 'Full time | Remote',
    amount: '$11,000 - $15,000',
  },
  {
    id: '3',
    image: 'https://via.placeholder.com/320X430',
    role: 'Product Design Lead',
    companyName: 'COWRYWISE',
    type: 'Full time | Remote',
    amount: '$10,000 - $12,000',
  },
  {
    id: '4',
    image: 'https://via.placeholder.com/320X430',
    role: 'Product Design Lead',
    companyName: 'COWRYWISE',
    type: 'Full time | Remote',
    amount: '$1,000 - $20,000',
  },
  {
    id: '5',
    image: 'https://via.placeholder.com/320X430',
    role: 'Product Design Lead',
    companyName: 'COWRYWISE',
    type: 'Full time | Remote',
    amount: '$18,000 - $2,000',
  },
  {
    id: '6',
    image: 'https://via.placeholder.com/320X430',
    role: 'Product Design Lead',
    companyName: 'COWRYWISE',
    type: 'Full time | Remote',
    amount: '$60,000 - $92,000',
  },
]);
</script>
