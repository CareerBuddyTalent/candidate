<template>
  <main>
    <div v-for="detail in details" :key="detail">
      <div
        class="border border-brand-black/5 bg-brand-light/40 rounded-xl lg:p-6 p-3 flex flex-col lg:flex-row justify-between mb-4 lg:space-x-32"
        @click="$router.push(`${path}/${detail.id}/${detail.role}`)"
      >
        <div class="flex items-center">
          <img :src="detail.image" alt="logo" class="lg:w-12 lg:h-12 h-7 w-7 rounded-full object-cover mr-2" />
          <div class="flex flex-col">
            <p class="font-extrabold lg:text-2xl text-base text-brand-black text-justify">
              {{ detail.role }}
            </p>
            <p class="text-sm font-normal text-[#12080F] text-opacity-70 uppercase order-first lg:order-last">{{ detail.companyName }}</p>
          </div>
        </div>
        <div class="lg:flex justify-between grid items-center" :class="[viewType == 'application' ? 'grow grid-rows-3 grid-flow-col gap-y-4' : '']">
          <div
            class="lg:text-center lg:shrink-0 col-span-2 flex lg:block gap-4 items-center"
            :class="[viewType == 'application' ? 'border-b-2 lg:border-0' : '']"
          >
            <p class="font-normal lg:text-lg text-sm text-[#12080F] text-opacity-70">{{ detail.type }}</p>
            <p class="text-2xl text-[#12080F]/50 lg:hidden mb-2.5">.</p>
            <p class="lg:text-lg text-sm font-medium text-brand-black/90">{{ detail.amount }}</p>
          </div>

          <div class="col-span-2" v-if="viewType == 'application'">
            <p class="font-normal text-sm text-[#12080F]/50 uppercase">Recruiting Contact</p>
            <div class="flex items-center">
              <img :src="detail.image" alt="logo" class="h-6 w-6 rounded-full object-cover mr-2" />
              <p class="text-base font-bold text-black">{{ detail.contact }}</p>
            </div>
          </div>
          <div class="" v-if="viewType == 'application'">
            <p class="ont-normal text-sm text-[#12080F]/50 uppercase">Status</p>
            <p class="text-lg font-medium rounded-xl text-center capitalize lg:px-3 py-1" :class="[badgeColor(detail.status)]">{{ detail.status }}</p>
          </div>
          <p v-if="viewType == 'application'" class="lg:text-lg text-sm font-normal text-brand-black text-opacity-40">{{ detail.time }} ago</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { defineProps } from 'vue';
import { badgeColor } from '@/utils/helper';
defineProps({
  details: { type: Array },
  viewType: { type: String },
  path: String,
});
</script>
