<template>
  <main v-if="pageLoaded">
    <div class="border rounded p-8">
      <div class="flex items-center justify-between md:flex-row flex-col lg:gap-44 gap-10 mb-8">
        <div class="self-start">
          <p class="text-brand-black font-albertSemiBold">Preferences</p>
          <p class="font-albert text-sm text-brand-black/70">We will show results based on your preferences</p>
        </div>
        <div class="grow lg:w-1/2">
          <div class="grid mb-6">
            <form>
              <div class="mb-6">
                <Select
                  id="role"
                  label="What point are you in your job search?"
                  :options="enums.candidate_availability_statuses"
                  v-model="details.availability_status"
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
                      v-model="details.job_types"
                      class="w-6 h-6 text-brand-primary mb-2 bg-brand-light/10 rounded-[10px] p-3 appearance-none focus:outline-none border border-brand-light focus:border-brand-primary focus:border focus:ring-brand-primary"
                    />
                    <label :for="item.value" class="ml-2 text-brand-black/70 text-lg whitespace-nowrap">{{ item.value }}</label>
                  </div>
                </div>
              </div>
              <div class="mb-6">
                <Select
                  id="type"
                  label="What type of company are you looking to work for?"
                  :options="companyCategory"
                  v-model="details.company_category"
                />
              </div>
              <div class="mb-6">
                <Input
                  label="What are you looking for in your next role"
                  labelFor="perks"
                  id="perks"
                  v-model="details.next_role_perks"
                  placeholder="List is seperated with a comma"
                />
              </div>
              <div class="mb-10 flex">
                <Input side id="salary" v-model="details.desired_salary" placeholder="Enter amount" class="flex-1" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <Button label="Save Changes" color="primary" @click="updateProfile" class="mt-8 float-right" />
  </main>
</template>
<script setup>
import Input from '@/components/form/Input.vue';
import Select from '@/components/form/Select.vue';
import TextArea from '@/components/form/TextArea.vue';
import Button from '@/components/Button.vue';
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { useToast } from 'vue-toastification';
import { errorMessage } from '@/utils/helper';

const store = useStore();
const route = useRoute();
const toast = useToast();

const enums = ref(null);
const companyCategory = ref(null);
const pageLoaded = ref(false);
const details = ref(null);

const updateProfile = async () => {
  try {
    const data = {
      ...details.value,
      next_role_perks: details.value.next_role_perks?.split(','),
    };
    const res = await store.dispatch('auth/updateUserPreference', data);
    toast.success(res.message, {
      timeout: 3000,
      hideProgressBar: true,
    });
    const user = await store.dispatch('auth/getUser', { forceReload: true });
    details.value = {
      availability_status: user.candidate?.job_preference?.availability_status,
      job_types: user.candidate?.job_preference?.job_types,
      company_category: user.candidate?.job_preference?.company_category,
      next_role_perks: user.candidate?.job_preference?.next_role_perks,
      desired_salary: user.candidate?.job_preference?.desired_salary,
    };
  } catch (error) {
    if (error.response && error.response.status === 422) {
      console.log(error.response.data.errors);
    }
    toast.error(errorMessage(error), {
      timeout: 3000,
      hideProgressBar: true,
    });
  }
};

onMounted(async () => {
  enums.value = await store.dispatch('global/getEnums');
  companyCategory.value = await store.dispatch('global/getCompanyCategory');
  const user = await store.dispatch('auth/getUser', { forceReload: false });
  details.value = {
    availability_status: user.candidate?.job_preference?.availability_status,
    job_types: user.candidate?.job_preference?.job_types,
    company_category: user.candidate?.job_preference?.company_category,
    next_role_perks: user.candidate?.job_preference?.next_role_perks,
    desired_salary: user.candidate?.job_preference?.desired_salary,
  };
  pageLoaded.value = true;
});
</script>
