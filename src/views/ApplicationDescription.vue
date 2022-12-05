<template>
  <main v-if="pageLoaded">
    <NavBody>
      <template #body>
        <div class="flex items-center justify-between relative">
          <div class="w-full">
            <div class="flex items-center mb-4 cursor-pointer" @click.stop="$router.go(-1)">
              <Back />
              <p class="text-white ml-2">Back</p>
            </div>
            <p class="font-normal lg:text-4xl text-2xl text-white font-albertSemiBold lg:mb-3 capitalize">
              {{ applicationDescription.job.title_name }}
            </p>
            <div class="flex items-center mb-2 overflow-scroll scrollbar-hide snap-x scroll-pl-10 whitespace-nowrap">
              <div class="flex items-center snap-start">
                <Calendar />
                <p class="ml-1 font-normal text-sm lg:text-base text-white capitalize">{{ applicationDescription.job.type.split('_').join(' ') }}</p>
              </div>
              <div class="flex items-center snap-start ml-2 mr-2">
                <Pin />
                <p class="ml-1 font-normal text-sm lg:text-base text-white capitalize">
                  {{ applicationDescription.job.work_type.split('_').join(' ') }}
                </p>
              </div>
              <div class="flex items-center snap-start">
                <Tag />
                <p class="ml-1 font-normal text-sm lg:text-base text-white">
                  {{ applicationDescription.job.salary_min.formatted }} - {{ applicationDescription.job.salary_max.formatted }} /
                  {{ applicationDescription.job.pay_period.split('_').join(' ') }}
                </p>
              </div>
            </div>
            <p class="text-white/60 ext-base font-normal">Posted {{ moment(applicationDescription.job.created_at).fromNow() }}</p>
          </div>
          <div class="bg-white p-3 inset-x-0 w-full max-h-[96px] -bottom-7 md:relative fixed md:hidden h-screen">
            <Button :label="'You applied ' + moment(applicationDescription.created_at).fromNow()" color="primary" outline full class="" />
          </div>
          <Button :label="'You applied ' + moment(applicationDescription.created_at).fromNow()" color="white" class="hidden md:block" pointer />
        </div>
      </template>
    </NavBody>
    <Tab
      @changeTab="changeTab"
      :numberOfTabs="tabs"
      :currentTab="tabNumber"
      borderColor="border-brand-primary"
      class="lg:px-20 px-5 py-8 mb-12 md:mb-0 z-30"
    >
      <div v-if="tabNumber == 1" id="general" role="tabpanel" aria-labelledby="general-tab">
        <div class="flex items-center mb-5">
          <img src="../assets/icons/resume.svg" alt="resume" class="mr-3" />
          <a :href="applicationDescription.resume_url" target="_blank" class="text-brand-black font-bold text-sm"
            >Resume - {{ userDetails.name.split(' ').join('_') }}.pdf</a
          >
        </div>
        <div class="flex items-start">
          <img src="../assets/icons/cover-letter.svg " alt="cover" class="mr-3" />
          <p class="text-brand-black font-normal text-sm">{{ applicationDescription.note }}</p>
        </div>
      </div>
      <div v-if="tabNumber == 2" id="general" role="tabpanel" aria-labelledby="general-tab">
        <div class="mb-4">
          <p class="font-medium text-xl text-brand-black mb-2">About this Job</p>
          <p class="text-brand-black/70 font-light">
            {{ applicationDescription.job.description }}
          </p>
        </div>
        <!-- <div class="mb-4">
          <p class="font-medium text-xl text-brand-black mb-2">Zapier offers:</p>
          <ul class="text-brand-black/70 font-light list-inside list-disc whitespace-pre-wrap">
            <li>Competitive salary</li>
            <li>Healthcare + dental + vision coverage*</li>
            <li>Retirement plan with 4% company match*</li>
            <li>Profit-sharing program for 100% of Zapiens</li>
            <li>$2,000 annual learning stipend for use on courses, conferences, and more—your choice</li>
            <li>Two annual all-company retreats</li>
            <li>14 weeks paid leave for new parents of biological or adopted children</li>
            <li>Customized Zapiversary rewards on your 1, 3, 5, 7 and 10 year work anniversaries</li>
            <li>
              Leading-edge equipment. We set you up with an Apple laptop and provide an additional budget for you to choose other home office
              accessories and software you may need.
            </li>
            <li>
              Time to renew. We encourage Zapiens to take at least 2 weeks off each year. Most of us take 4-5 weeks, in addition to locally recognized
              holidays.
            </li>
          </ul>
        </div> -->
        <div>
          <p class="font-medium text-xl text-brand-black mb-2">Job Specifications</p>
          <ul class="text-brand-black/70 font-light list-inside list-disc">
            <li v-for="item in applicationDescription.job.skills" :key="item" class="capitalize">{{ item }}</li>
          </ul>
        </div>
      </div>
    </Tab>
  </main>
</template>

<script setup>
import NavBody from '@/components/NavBody.vue';
import Button from '@/components/Button.vue';
import Calendar from '@/assets/icons/calendar.svg?inline';
import Tag from '@/assets/icons/tag.svg?inline';
import Pin from '@/assets/icons/pin.svg?inline';
import Tab from '@/components/Tab.vue';
import Back from '@/assets/icons/back.svg?inline';
import moment from 'moment';
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

const tabNumber = ref(1);
const applicationDescription = ref(null);
const pageLoaded = ref(false);
const route = useRoute();
const store = useStore();
const tabs = ref([
  {
    name: 'Your Application',
  },
  {
    name: 'Job Description',
  },
]);
const changeTab = (value) => {
  tabNumber.value = value;
};
const userDetails = computed(() => {
  return store.state.auth.userDetails;
});

onMounted(async () => {
  applicationDescription.value = await store.dispatch('global/getSingleApplication', route.params.id);
  pageLoaded.value = true;
});
</script>
