<template>
  <main v-if="pageLoaded" class="border rounded p-8">
    <div class="border-b border-brand-black/10">
      <div class="flex items-center justify-between lg:gap-44 mb-8">
        <div class="self-start whitespace-nowra w-56">
          <p class="text-brand-black font-albertSemiBold">About</p>
          <p class="font-albert text-sm text-brand-black/70">Tell us about yourself so startups know who you are.</p>
        </div>
        <div class="grow">
          <div class="mb-2 py-8">
            <p class="font-albertSemiBold text-2xl text-brand-black">Alison Eyo</p>
            <div>
              <img :src="ffgrgr" alt="profile_picture" />
            </div>
          </div>
          <div class="grid gap-6 mb-6 md:grid-cols-2">
            <Select label="Country" labelFor="Country" id="Country" :options="country" v-model="details.country" />
            <Select label="State" labelFor="State" id="State" :options="state" v-model="details.state" />
            <Input label="Which role best describes you?" labelFor="role" id="role" v-model="details.professional_title" />
            <Input
              label="Years of Experience"
              labelFor="Experience"
              id="Experience"
              placeholder="Experience"
              type="text"
              v-model="details.years_of_experience"
            />
          </div>
          <TextArea label="Bio" labelFor="Bio" id="Bio" :row="6" placeholder="https://www.linkedin.com/alison-eyo/in/a" v-model="details.bio" />
        </div>
      </div>
    </div>
    <div class="">
      <div class="flex items-center justify-between lg:gap-x-60 mb-8 mt-6">
        <div class="self-start whitespace-nowrap">
          <p class="text-brand-black font-albertSemiBold">Social Profile</p>
          <p class="font-albert text-sm text-brand-black/70">Where can people find you</p>
        </div>
        <div class="grow">
          <Input
            label="LinkedIn"
            labelFor="LinkedIn"
            id="LinkedIn"
            type="url"
            placeholder="https://www.linkedin.com/alison-eyo/in/a"
            v-model="details.social_links.linkedin"
          />
        </div>
      </div>
    </div>
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

const store = useStore();
const route = useRoute();

const enums = ref(null);
const country = ref(null);
const state = ref(null);
const pageLoaded = ref(false);
const details = ref(null);


const userDetails = computed(() => {
  return store.state.auth.userDetails;
});

onMounted(async () => {
  enums.value = await store.dispatch('global/getEnums');
  country.value = await store.dispatch('global/getCountries');

  const user = await store.dispatch('auth/getUser', { forceReload: false });
  details.value = {
    country: user.candidate?.address?.country,
    state: user.candidate?.address?.state,
    years_of_experience: user.candidate?.years_of_experience,
    professional_title: user.candidate?.professional_title,
    academic_qualification: user.candidate?.academic_qualification,
    bio: user.candidate?.bio,
    social_links: {
      linkedin: user.candidate?.social_links?.find((item) => item.platform === 'linkedin')?.url,
    },
  };
  if (details.value.country) {
    state.value = await store.dispatch('global/getStates', details.value.country);
  }
  pageLoaded.value = true;
});

watch(
  () => details.country,
  async (country) => {
    state.value = await store.dispatch('global/getStates', country);
  },
);
</script>
