<template>
  <main v-if="pageLoaded">
    <div class="border rounded p-8">
      <div class="border-b border-brand-black/10">
        <div class="flex items-center justify-between md:flex-row flex-col lg:gap-44 gap-10 mb-8">
          <div class="self-start whitespace-nowra w-56">
            <p class="text-brand-black font-albertSemiBold">About</p>
            <p class="font-albert text-sm text-brand-black/70">Tell us about yourself so startups know who you are.</p>
          </div>
          <div class="grow">
            <div class="mb-2 md:py-8">
              <p class="font-albertSemiBold text-2xl text-brand-black">{{ userDetails.name }}</p>
              <div class="mt-4">
                <label for="dropzone-file" class="">
                  <img :src="fileUrl || details?.avatar" class="rounded-full cursor-pointer h-14 w-14 object-cover" alt="profile_picture" />
                  <input ref="selectedFile" id="dropzone-file" type="file" class="hidden" accept=".jpg,.jpeg,.png,.svg" @change="previewImage" />
                </label>
              </div>
            </div>
            <div class="grid gap-6 mb-6 md:grid-cols-2">
              <Select label="Country" labelFor="Country" id="Country" :options="country" v-model="details.country" />
              <Select label="State" labelFor="State" id="State" :options="state" v-model="details.state" />
              <Select label="Which role best describes you?" labelFor="role" id="role" :options="jobTitle" v-model="details.professional_title" />
              <Input
                label="Years of Experience"
                labelFor="Experience"
                id="Experience"
                placeholder="Experience"
                type="text"
                v-model="details.years_of_experience"
              />
            </div>
            <TextArea label="Bio" labelFor="Bio" id="Bio" :row="8" placeholder="https://www.linkedin.com/alison-eyo/in/a" v-model="details.bio" />
          </div>
        </div>
      </div>
      <div class="">
        <div class="flex items-center justify-between md:flex-row flex-col lg:gap-x-60 gap-8 mb-8 mt-6">
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
const country = ref(null);
const state = ref(null);
const jobTitle = ref(null);
const pageLoaded = ref(false);
const details = ref(null);
const file = ref(null);
const fileUrl = ref(null);

const userDetails = computed(() => {
  return store.state.auth.userDetails;
});

const previewImage = (e) => {
  if (e.target.files) {
    let reader = new FileReader();
    reader.onload = (e) => {
      fileUrl.value = e.target.result;
    };
    if (e.target.files[0].size > 5000000) {
      toast.error('file too big', {
        timeout: 3000,
        hideProgressBar: true,
      });
      return;
    }
    reader.readAsDataURL(e.target.files[0]);
    file.value = e.target.files[0];
  }
};

onMounted(async () => {
  enums.value = await store.dispatch('global/getEnums');
  country.value = await store.dispatch('global/getCountries');
  jobTitle.value = await store.dispatch('global/getJobTitles');
  const user = await store.dispatch('auth/getUser', { forceReload: false });
  console.log(user);
  details.value = {
    country: user.candidate?.address?.country,
    state: user.candidate?.address?.state,
    years_of_experience: user.candidate?.years_of_experience,
    professional_title: user.candidate?.professional_title_uuid,
    academic_qualification: user.candidate?.academic_qualification,
    bio: user.candidate?.bio,
    social_links: {
      linkedin: user.candidate?.social_links?.find((item) => item.platform === 'linkedin')?.url,
    },
    avatar: user.candidate?.avatar,
  };
  if (details.value.country) {
    state.value = await store.dispatch('global/getStates', details.value.country);
  }
  pageLoaded.value = true;
});

const updateProfile = async () => {
  try {
    const data = new FormData();
    if (file.value) {
      data.append('profile_picture', file.value);
    }
    data.append('country', details.value.country);
    data.append('state', details.value.state);
    data.append('professional_title', details.value.professional_title);
    data.append('academic_qualification', details.value.academic_qualification);
    data.append('years_of_experience', details.value.years_of_experience);
    data.append('bio', details.value.bio);
    data.append('social_links[linkedin]', details.value.social_links.linkedin);
    const res = await store.dispatch('auth/updateUserProfile', data);
    toast.success(res.message, {
      timeout: 3000,
      hideProgressBar: true,
    });
    const user = await store.dispatch('auth/getUser', { forceReload: true });
    details.value = {
      country: user.candidate?.address?.country,
      state: user.candidate?.address?.state,
      years_of_experience: user.candidate?.years_of_experience,
      professional_title: user.candidate?.professional_title_uuid,
      academic_qualification: user.candidate?.academic_qualification,
      bio: user.candidate?.bio,
      social_links: {
        linkedin: user.candidate?.social_links?.find((item) => item.platform === 'linkedin')?.url,
      },
      avatar: user.candidate?.avatar,
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

watch(
  () => details.value?.country,
  async (country) => {
    state.value = await store.dispatch('global/getStates', country);
  },
);
</script>
