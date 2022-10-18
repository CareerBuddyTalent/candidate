<template>
  <main>
    <NavBody>
      <template #body>
        <div class="flex items-center justify-between relative">
          <div class="w-full">
            <div class="xl:flex items-center mb-4 cursor-pointer hidden" @click.stop="$router.go(-1)">
              <Back />
              <p class="text-brand-primary ml-2">Back</p>
            </div>
            <p class="font-normal lg:text-4xl text-2xl text-white font-cooper lg:mb-3">Product Design Lead</p>
            <div class="flex items-center mb-2 overflow-scroll scrollbar-hide snap-x scroll-pl-10 whitespace-nowrap">
              <div class="flex items-center snap-start">
                <Calendar />
                <p class="ml-1 font-normal text-sm lg:text-base text-white">Full-time</p>
              </div>
              <div class="flex items-center snap-start ml-2 mr-2">
                <Pin />
                <p class="ml-1 font-normal text-sm lg:text-base text-white">Remote</p>
              </div>
              <div class="flex items-center snap-start">
                <Tag />
                <p class="ml-1 font-normal text-sm lg:text-base text-white wh">$10,000 - $12,000 / year</p>
              </div>
            </div>
            <p class="text-white/60 ext-base font-normal">Posted 4 days ago</p>
          </div>
          <div class="bg-white p-3 inset-x-0 w-full max-h-[96px] -bottom-7 md:relative fixed md:hidden h-screen">
            <Button label="Apply for this Role" color="primary" @click.stop="showModal = !showModal" full class="" />
          </div>
          <Button label="Apply for this Role" color="primary" @click.stop="showModal = !showModal" class="hidden md:block" />
        </div>
      </template>
    </NavBody>
    <div class="lg:mt-40 mt-20 lg:px-20 px-5 py-8 mb-12 md:mb-0">
      <div class="mb-4">
        <p class="font-medium text-xl text-brand-black mb-2">About this Job</p>
        <p class="text-brand-black/70 font-light">
          Our flexible, distributed environment lets us work with the best people from around the world. Zapiens live in 40+ countries, including the
          United Kingdom, Thailand, India, Nigeria, Taiwan, Guatemala, New Zealand, Australia, and more!
        </p>
      </div>
      <div class="mb-4">
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
      </div>
      <div>
        <p class="font-medium text-xl text-brand-black mb-2">Job Specifications</p>
        <ul class="text-brand-black/70 font-light list-inside list-disc">
          <li>Bachelor’s Degree in a relevant course</li>
          <li>Must have completed NYSC</li>
          <li>5+ years of experience working in Customer Support, Service Delivery, Quality, or a related role</li>
          <li>3+ years of experience in management and supervision</li>
          <li>Experience with support specific to retail, e-commerce and/or telecoms</li>
          <li>Experience designing training materials and facilitating trainings</li>
          <li>Familiarity with Zendesk or similar CRM tool is a key requirement</li>
          <li>Advanced writing and editing skills, especially regarding documentation and training content</li>
          <li>Ability to interface with and train all levels of employees</li>
          <li>Leadership by influence</li>
          <li>Communication skills</li>
          <li>Independent work skills</li>
          <li>Focus on results</li>
          <li>MS Office proficiency</li>
        </ul>
      </div>
    </div>
    <!-- Apply Modal -->
    <Modal v-if="showModal" size="3xl">
      <template #header>
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center w-4/6">
            <img src="../assets/images/Okra.png" class="w-8 h-8" alt="companyLogo" />
            <p class="font-cooper italic font-normal lg:text-lg text-base text-brand-black/70">Apply as a frontend engineer Lead at Okra</p>
          </div>
          <Close @click.stop="showModal = false" class="cursor-pointer" />
        </div>
      </template>
      <template #body>
        <p class="text-brand-black text-opacity-90 text-base font-bold mb-2.5">Why should we hire you?</p>
        <textarea
          name="coverLetter"
          v-model="cover"
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
              <img src="../assets/images/Okra.png" alt="profile" />
              <div>
                <p class="text-brand-black text-opacity- font-bold text-base m-0">Gbajabiamila Fifefoluwa</p>
                <p class="text-brand-black text-opacity-60 font-light text-xs order-last">Head, People Operations</p>
              </div>
            </div>
            <div class="flex items-center">
              <Chat fill="#6D2E5D" />
              <p class="text-brand-color font-bold text-base hidden md:block ml-2">Send Message</p>
            </div>
          </div>
          <Button label="Apply" :color="disable ? 'blackOpacity' : 'primary'" btnSize="w-full lg:w-28" :disabled="disable" @click="success" />
        </div>
      </template>
    </Modal>

    <!-- Success Modal -->
    <Modal v-if="successModal" size="sm">
      <template #body>
        <div class="flex flex-col items-center justify-center">
          <div class="flex mb-5 -space-x-4">
            <img class="w-11 h-11 rounded-full border-2 border-white" src="../assets/images/Okra.png" alt="" />
            <img class="w-10 h-10 rounded-full border-2 border-white" src="../assets/images/girl.png" alt="" />
          </div>
          <p class="text-brand-black text-opacity-70 text-2xl italic font-normal mb-2 font-cooper">Application Successful!</p>
          <p class="text-brand-black text-opacity-60 font-normal text-base text-center mb-4">
            We’ve sent your application to Okra. Monitor the application process in your Applied tab.
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
import { ref, watch } from 'vue';

const showModal = ref(false);
const successModal = ref(false);
const disable = ref(true);
const cover = ref('');

watch(cover, (newQuestion, oldQuestion) => {
  if (newQuestion) {
    disable.value = false;
  } else disable.value = true;
});

function success() {
  showModal.value = false;
  successModal.value = true;
}
</script>
