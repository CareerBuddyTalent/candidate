<template>
  <main>
    <div class="mb-8">
      <p class="font-cooper text-brand-black font-normal lg:text-4xl text-2xl">Job Preferences</p>
      <p class="text-brand-black/40 text-base font-normal">We can help you find what you’re looking for.</p>
    </div>
    <form>
      <div class="mb-6">
        <Select
          id="role"
          label="What point are you in your job search?"
          :options="enums.candidate_availability_statuses"
          v-model="preferenceDetails.availability_status"
        />
      </div>
      <div class="mb-6">
        <label for="role" class="block text-lg font-albert text-brand-black/70 mb-3">What type of role are you looking for?</label>
        <div class="grid gap-4 md:grid-cols-4 sm:grid-cols-2">
          <div class="inline-flex gro mr-2" v-for="item in enums.job_types" :key="item.value">
            <input
              :id="item.value"
              type="checkbox"
              :value="item.key"
              v-model="preferenceDetails.job_types"
              class="w-6 h-6 text-brand-primary mb-2 bg-brand-light/10 rounded-[10px] p-3 appearance-none focus:outline-none border border-brand-light focus:border-brand-primary focus:border focus:ring-brand-primary"
            />
            <label :for="item.value" class="ml-2 text-brand-black/70 text-lg whitespace-nowrap">{{ item.value }}</label>
          </div>
        </div>
      </div>
      <div class="mb-6">
        <Input
          label="How many years of experience do you have?"
          labelFor="experience"
          type="text"
          id="experience"
          placeholder="10"
          v-model="preferenceDetails.years_of_experience"
        />
      </div>
      <div class="mb-6">
        <Select
          id="type"
          label="What type of company are you looking to work for?"
          :options="companyCategory"
          v-model="preferenceDetails.company_category"
        />
      </div>
      <div class="mb-6">
        <label for="qualification" class="block text-lg font-medium text-brand-black/70">Where would you like to work in?</label>
        <div class="grid gap-4 md:grid-cols-2">
          <Select id="Country" :options="country" v-model="preferenceDetails.location.country" />
          <Select id="State" :options="state" v-model="preferenceDetails.location.state" />
        </div>
      </div>
      <div class="mb-6">
        <Input
          label="What are you looking for in your next role"
          labelFor="perks"
          id="perks"
          v-model="preferenceDetails.next_role_perks"
          placeholder="List is seperated with a comma"
        />
      </div>
      <div class="mb-10 flex">
        <Input side id="salary" v-model="preferenceDetails.desired_salary" placeholder="Enter amount" class="flex-1" />
      </div>
    </form>
  </main>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import Select from '@/components/form/Select.vue';
import Input from '@/components/form/Input.vue';
import TextArea from '@/components/form/TextArea.vue';
import { useStore } from 'vuex';

const store = useStore();
const state = ref(null);
const companyCategory = ref(null);
const pageLoaded = ref(false);

const preferenceDetails = ref({
  availability_status: '',
  job_types: [],
  years_of_experience: '',
  company_category: '',
  location: {
    country: '',
    state: '',
  },
  next_role_perks: '',
  desired_salary: '',
});
const enums = computed(() => {
  return store.state.global.EnumDetails;
});
const country = computed(() => {
  return store.state.global.Countries;
});
watch(
  () => preferenceDetails.value.location.country,
  async (country) => {
    state.value = await store.dispatch('global/getStates', country);
  },
);

onMounted(async () => {
  companyCategory.value = await store.dispatch('global/getCompanyCategory');
  pageLoaded.value = true;
});

defineExpose({
  preferenceDetails,
});
</script>
