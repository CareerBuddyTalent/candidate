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
            <p class="font-normal lg:text-4xl text-2xl text-white font-albert lg:mb-3 capitalize">{{ jobDescription.title_name }}</p>
            <div class="flex items-center mb-2 overflow-scroll scrollbar-hide snap-x scroll-pl-10 whitespace-nowrap">
              <div class="flex items-center snap-start">
                <Calendar />
                <p class="ml-1 font-normal text-sm lg:text-base text-white capitalize">{{ jobDescription.type.split('_').join('-') }}</p>
              </div>
              <div class="flex items-center snap-start ml-2 mr-2">
                <Pin />
                <p class="ml-1 font-normal text-sm lg:text-base text-white capitalize">{{ jobDescription.work_type.split('_').join('-') }}</p>
              </div>
              <div class="flex items-center snap-start">
                <Tag />
                <p class="ml-1 font-normal text-sm lg:text-base text-white">
                  {{ jobDescription.salary_min.formatted }} - {{ jobDescription.salary_max.formatted }} /
                  {{ jobDescription.pay_period.split('_').join(' ') }}
                </p>
              </div>
            </div>
            <p class="text-white/60 ext-base font-normal">Posted {{ moment(jobDescription.created_at).fromNow() }}</p>
          </div>
          <div class="bg-white p-3 inset-x-0 w-full max-h-[96px] -bottom-7 md:relative fixed md:hidden h-screen">
            <Button label="Apply for this Role" color="primary" @click.stop="showModal = !showModal" full class="" />
          </div>
          <Button label="Apply for this Role" color="white" outline @click.stop="showModal = !showModal" class="hidden md:block" />
        </div>
      </template>
    </NavBody>
    <div class="lg:px-20 px-5 py-8 mb-12 md:mb-0">
      <div class="mb-4">
        <p class="font-medium text-xl text-brand-black mb-2">About this Job</p>
        <p class="text-brand-black/70 font-light">{{ jobDescription.description }}</p>
      </div>
      <div>
        <p class="font-medium text-xl text-brand-black mb-2">Job Specifications</p>
        <ul class="text-brand-black/70 font-light list-inside list-disc capitalize">
          <li v-for="item in jobDescription.skills" :key="item" class="capitalize">{{ item }}</li>
        </ul>
      </div>
    </div>
    <!-- Apply Modal -->
    <Modal v-if="showModal" size="3xl">
      <template #header>
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center w-4/6">
            <img :src="jobDescription.employer.logo_url" class="h-8 w-8 rounded-full object-cover mr-2" alt="companyLogo" />
            <p class="font-cooper font-normal lg:text-lg text-base text-brand-black/70 capitalize">
              Apply as a {{ jobDescription.title_name }} at Okra
            </p>
          </div>
          <Close @click.stop="showModal = false" class="cursor-pointer" />
        </div>
      </template>
      <template #body>
        <p class="text-brand-black text-opacity-90 text-base font-bold mb-2.5">Why should we hire you?</p>
        <textarea
          name="coverLetter"
          v-model="note"
          cols="30"
          rows="6"
          placeholder="Tell us why you’re a good fit"
          class="border border-[#240F1F1A]/10 bg-[#240F1F1A] rounded-xl focus:outline-none w-full focus:border-[#240F1F1A]/10 focus:ring-0"
        ></textarea>
      </template>
      <template #footer>
        <p class="text-brand-black text-base font-bold mb-2">Hiring Contact</p>
        <div class="sm:grid md:flex justify-between">
          <div class="flex items-center justify-between md:space-x-32 mb-3">
            <div class="flex items-center">
              <img :src="jobDescription.employer.logo_url" alt="profile" class="h-7 w-7 rounded-full object-cover mr-2" />
              <div>
                <p class="text-brand-black font-bold text-sm m-0 capitalize">{{ jobDescription.employer.name }}</p>
                <p class="text-brand-black text-opacity-60 font-light text-xs order-last">Head, People Operations</p>
              </div>
            </div>
            <div class="flex items-center">
              <Chat fill="#6D2E5D" />
              <p class="text-brand-color font-bold text-base hidden md:block ml-2">Send Message</p>
            </div>
          </div>
          <Button label="Apply" :color="disable ? 'blackOpacity' : 'primary'" btnSize="w-full md:w-28" :disabled="disable" @click="apply" />
        </div>
      </template>
    </Modal>

    <!-- Success Modal -->
    <Modal v-if="successModal" size="sm">
      <template #body>
        <div class="flex flex-col items-center justify-center">
          <div class="flex mb-5 -space-x-4">
            <img class="w-11 h-11 rounded-full border-2 border-white" :src="jobDescription.employer.logo_url" alt="image" />
            <img class="w-10 h-10 rounded-full border-2 border-white" :src="userDetails.candidate.avatar" alt="image" />
          </div>
          <p class="text-brand-black text-opacity-70 text-2xl font-normal mb-2 font-cooper">Application Successful!</p>
          <p class="text-brand-black text-opacity-60 font-normal text-base text-center mb-4">
            We’ve sent your application to Okra. Monitor the application process in your
            <span class="text-brand-black"><router-link to="/applied">Applied</router-link></span> tab.
          </p>

          <Button label="Go back" color="primary" @click.stop="successModal = false" to="/jobs" medium />
        </div>
      </template>
    </Modal>
  </main>
</template>

<script setup>
import NavBody from '@/components/NavBody.vue';
import Back from '@/assets/icons/back.svg?inline';
import Calendar from '@/assets/icons/calendar.svg?inline';
import Tag from '@/assets/icons/tag.svg?inline';
import Pin from '@/assets/icons/pin.svg?inline';
import Chat from '@/assets/icons/chat.svg?inline';
import Close from '@/assets/icons/close.svg?inline';
import Button from '@/components/Button.vue';
import Modal from '@/components/Modal.vue';
import moment from 'moment';
import { errorMessage } from '@/utils/helper';
import { ref, watch, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { useToast } from 'vue-toastification';

const showModal = ref(false);
const successModal = ref(false);
const disable = ref(true);
const note = ref('');
const store = useStore();
const route = useRoute();
const toast = useToast();
const jobDescription = ref(null);
const pageLoaded = ref(false);

watch(note, (newQuestion, oldQuestion) => {
  if (newQuestion) {
    disable.value = false;
  } else disable.value = true;
});

const userDetails = computed(() => {
  return store.state.auth.userDetails;
});

async function apply() {
  try {
    await store.dispatch('global/applyToJob', { id: route.params.id, note: note.value });
    showModal.value = false;
    successModal.value = true;
  } catch (error) {
    if (error.response && error.response.status === 422) {
      console.log(error.response.data.errors);
      // return error.response.data.message;
    }
    toast.error(errorMessage(error), {
      timeout: 3000,
      hideProgressBar: true,
    });
    showModal.value = false;
  }
}

onMounted(async () => {
  jobDescription.value = await store.dispatch('global/getSingleJob', route.params.id);
  pageLoaded.value = true;
});
</script>
