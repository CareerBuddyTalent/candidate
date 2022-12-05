<template>
  <div>
    <NavBody />
    <div class="lg:px-20 px-5 py-8 mt-10">
      <Tab @changeTab="changeTab" :numberOfTabs="tabs" :currentTab="tabNumber" borderColor="border-brand-primary">
        <div class="rounded-lg">
          <div v-if="tabNumber == 1" id="general" role="tabpanel" aria-labelledby="general-tab">
            <Profile />
          </div>
          <div v-if="tabNumber == 2" id="dashboard" role="tabpanel" aria-labelledby="dashboard-tab">
            <Resume />
          </div>
          <div v-if="tabNumber == 3" id="dashboard" role="tabpanel" aria-labelledby="dashboard-tab">
            <Preference />
          </div>
        </div>
      </Tab>
    </div>
  </div>
</template>

<script setup>
import Tab from '@/components/Tab.vue';
import NavBody from '@/components/NavBody.vue';
import Profile from '@/components/profileUpdate/updateProfile.vue';
import Preference from '@/components/profileUpdate/updatePreference.vue';
import Resume from '@/components/profileUpdate/updateCv.vue';
import { ref } from 'vue';

const tabNumber = ref(1);

const changeTab = (value) => {
  tabNumber.value = value;
};

const tabs = ref([
  {
    name: 'Profile',
  },
  {
    name: 'Resume/CV',
  },
  {
    name: 'Preferences',
  },
]);
</script>
