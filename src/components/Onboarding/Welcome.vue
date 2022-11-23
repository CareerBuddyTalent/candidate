<template>
  <main>
    <div class="mb-8">
      <p class="font-cooper text-brand-black font-normal lg:text-4xl text-2xl">
        Welcome onboard, {{ userDetails.name.split(' ').slice(0, 1).toString() }}.
      </p>
      <p class="text-brand-black/40 text-base font-normal">Let’s get you set up.</p>
    </div>
    <form v-if="pageLoaded">
      <div class="grid gap-x-5 md:grid-cols-2 mb-6">
        <Select label="Country" labelFor="Country" id="Country" :options="country" v-model="profileDetails.country" />
        <Select label="State" labelFor="State" id="State" :options="state" v-model="profileDetails.state" />
      </div>
      <div class="mb-6">
        <Input
          label="Which role best describes you?"
          type="text"
          labelFor="ProfessionalTitle"
          id="professional_title"
          v-model="profileDetails.professional_title"
        />
      </div>
      <div class="mb-6">
        <Select
          label="Highest Academic Qualification"
          labelFor="Qualification"
          id="Qualification"
          :options="enums.candidate_academic_qualifications"
          v-model="profileDetails.academic_qualification"
        />
      </div>
      <div class="mb-10">
        <Input
          label="LinkedIn Profile"
          labelFor="linkedInProfile"
          type="url"
          id="linkedInProfile"
          placeholder="linkedin/a/................."
          v-model="profileDetails.social_links.linkedin"
        />
      </div>
    </form>
    <!-- <Button label="Proceed" color="primary" full @click="handleEvent" /> -->
  </main>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import Select from '@/components/form/Select.vue';
import Input from '@/components/form/Input.vue';

const store = useStore();
const enums = ref(null);
const country = ref(null);
const state = ref(null);
const pageLoaded = ref(false);
const profileDetails = ref({
  country: '',
  state: '',
  professional_title: '',
  academic_qualification: '',
  social_links: {
    linkedin: '',
  },
});
onMounted(async () => {
  enums.value = await store.dispatch('global/getEnums');
  country.value = await store.dispatch('global/getCountries');
  if (profileDetails.value.country) {
    console.log(profileDetails.value.country);
    state.value = await store.dispatch('global/getStates', profileDetails.value.country);
  }
  pageLoaded.value = true;
});
watch(
  () => profileDetails.value.country,
  async (country) => {
    state.value = await store.dispatch('global/getStates', country);
  },
);
const userDetails = computed(() => {
  return store.state.auth.userDetails;
});

async function handleEvent() {
  console.log(profileDetails.value);
  const res = await store.dispatch('auth/onboardProfile', profileDetails.value);
  console.log(res);
}

defineExpose({
  profileDetails,
});
</script>
