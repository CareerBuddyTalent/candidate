<template>
  <div>
    <NavBody />

    <div class="lg:px-20 px-5 py-8 mt-10">
      <Tab @changeTab="changeTab" :numberOfTabs="tabs" :currentTab="tabNumber" borderColor="border-brand-button">
        <div class="rounded-lg">
          <div v-if="tabNumber == 1" id="general" role="tabpanel" aria-labelledby="general-tab" class="border rounded p-8">
            <div class="border-b border-brand-black/10"></div>
            <div class="flex items-center justify-between gap-44">
              <div>
                <p class="text-brand-black font-bold">Social Profile</p>
                <p class="font-normal text-brand-black/70">Where can people find you</p>
              </div>
              <div class="grow">
                <p>LinkedIn</p>
                <Input id="LinkedIn" type="url" placeholder="https://www.linkedin.com/alison-eyo/in/a" v-model="details.social_links.linkedin" />
              </div>
            </div>
            <div></div>
          </div>
          <div v-if="tabNumber == 2" id="dashboard" role="tabpanel" aria-labelledby="dashboard-tab">
            <div class="flex justify-center mb-10">
              <div class="md:hidden mt-8">
                <label for="tabs" class="sr-only">Select your country</label>
                <select
                  id="tabs"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option v-for="item in plans" :key="item">{{ item.name }}</option>
                </select>
              </div>
              <ul
                class="hidden font-medium text-center px-1 bg-[#F6EAF3] rounded-lg md:flex mt-8 items-center"
                id="myTab"
                data-tabs-toggle="#myTabContent"
                role="tablist"
              >
                <li class="w-full flex" v-for="(tab, i) in plans" :key="i">
                  <button
                    class="inline-block rounded-lg px-28 py-4"
                    aria-current="page"
                    @click="toggleTabs(i + 1)"
                    :class="[planNumber !== i + 1 ? 'text-brand-black text-opacity-60' : 'bg-brand-button text-white']"
                  >
                    {{ tab.name }}
                  </button>
                </li>
              </ul>
            </div>
            <div id="myTabContent" class="grow overflow-y-auto">
              <div v-if="planNumber == 1" id="general" role="tabpanel" aria-labelledby="general-tab" class="grid gap-10 md:flex">
                <SettingsCard class="grow" :list="free" type="Free" price="$0" buttonLabel="Current Plan" buttonColor="success" />
                <SettingsCard class="grow" :list="free" type="Professional" price="$10" buttonLabel="Upgrade" buttonColor="secondary" outline />
                <SettingsCard class="grow" :list="free" type="Enterprise" price="$50" buttonLabel="Upgrade" buttonColor="secondary" outline />
              </div>
              <div v-if="planNumber == 2" id="general" role="tabpanel" aria-labelledby="general-tab">
                <p class="text-brand-black mt-8 font-bold">COMPANY LOGO</p>
                <div class="">
                  <p class="text-brand-primary cursor-pointer underline">Change Image</p>
                </div>
              </div>
            </div>
          </div>
          <div v-if="tabNumber == 3" class="p-4 bg-gray-50 rounded-lg" id="dashboard" role="tabpanel" aria-labelledby="dashboard-tab">
            <p class="text-sm text-gray-500 dark:text-gray-400">
              This is some placeholder content the
              <strong class="font-medium text-sky-700 dark:text-white">Archive tab's associated content</strong>. Clicking another tab will toggle the
              visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.
            </p>
          </div>
        </div>
      </Tab>
    </div>
    <!-- <Card :details="card" viewType="application" class="cursor-pointer mt-24" :path="route.path" /> -->
  </div>
</template>

<script setup>
import Tab from '@/components/Tab.vue';
import Input from '@/components/form/Input.vue';
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

const tabNumber = ref(1);

const changeTab = (value) => {
  tabNumber.value = value;
};

const tabs = ref([
  {
    name: 'Profile',
  },
  {
    name: 'Subscription',
  },
  {
    name: 'Security',
  },
]);

const details = ref({
  country: 'US',
  state: 'Lagos',
  phone_number: '08029649888',
  phone_number_country: 'NG',
  years_of_experience: 7,
  professional_title: 'Developer',
  academic_qualification: 'Bachelor',
  bio: '{{$randomLoremSentences}}',
  social_links: {
    linkedin: 'https://linkedin.com/{{$randomLoremSlug}}',
  },
});
</script>
