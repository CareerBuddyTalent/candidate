<template>
  <main>
    <NavBody>
      <template #body>
        <p class="font-normal text-xl text-white/80 lg:text-center uppercase">Welcome {{ userDetails.name }}</p>
        <p class="font-normal text-lg xl:text-3xl text-white lg:text-center font-cooper">
          We have {{ allJobs.length }} opportunities for your next step.
        </p>
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
      <div><Card :details="allJobs" :path="route.path" /></div>
    </div>
  </main>
</template>

<script setup>
import Search from '@/assets/icons/search.svg?inline';
import Button from '@/components/Button.vue';
import Card from '@/components/Card.vue';
import NavBody from '@/components/NavBody.vue';
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

const route = useRoute();
const store = useStore();

const userDetails = computed(() => {
  return store.state.auth.userDetails;
});

const allJobs = ref([]);
onMounted(async () => {
  allJobs.value = await store.dispatch('global/getAllJobs');
});
</script>
