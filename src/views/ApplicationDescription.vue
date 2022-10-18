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
            <p class="font-normal lg:text-4xl text-2xl text-white font-cooper lg:mb-3 italic">Product Design Lead</p>
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
            <Button label="You applied 2 days ago" color="primary" outline full class="" />
          </div>
          <Button label="You applied 2 days ago" color="primary" outline class="hidden md:block" :pointer="false" />
        </div>
      </template>
    </NavBody>
    <Tab
      @changeTab="changeTab"
      :numberOfTabs="tabs"
      :currentTab="tabNumber"
      borderColor="border-brand-color"
      class="lg:mt-32 mt-20 lg:px-20 px-5 py-8 mb-12 md:mb-0 stickytop-10 z-30"
    >
      <div v-if="tabNumber == 1" id="general" role="tabpanel" aria-labelledby="general-tab">
        <div class="flex items-center mb-5">
          <img src="../assets/icons/resume.svg" alt="resume" class="mr-3" />
          <p class="text-brand-black font-bold text-sm">Resume - Alison_Eyo_Resume.pdf</p>
        </div>
        <div class="flex items-start">
          <img src="../assets/icons/cover-letter.svg " alt="cover" class="mr-3" />
          <p class="text-brand-black font-normal text-sm">
            I'm Alison Eyo, a user advocate focused on delivering strategic and meaningful user experiences. I like to make & ship stuff that solves
            problems and impacts billions of lives. While I am fascinated by all aspects of User Experience design, I specialize in ideation,
            storytelling, and visual design. I love diving into why and how people use things and furthering those experiences to make them memorable.
            I'm also obsessed with the delightful possibilities of software & I see Ul design as an artistic medium, not just a method of
            problem-solving. For 3+ years, I've had the pleasure of designing digital interfaces and experiences for diverse products across finance,
            education, e-commerce, cryptocurrency, health, and other industries for individuals & organizations while having fun in the process. I'm
            Alison Eyo, a user advocate focused on delivering strategic and meaningful user experiences. I like to make & ship stuff that solves
            problems and impacts billions of lives.
          </p>
        </div>
      </div>
      <div v-if="tabNumber == 2" id="general" role="tabpanel" aria-labelledby="general-tab">
        <div class="mb-4">
          <p class="font-medium text-xl text-brand-black mb-2">About this Job</p>
          <p class="text-brand-black/70 font-light">
            Our flexible, distributed environment lets us work with the best people from around the world. Zapiens live in 40+ countries, including
            the United Kingdom, Thailand, India, Nigeria, Taiwan, Guatemala, New Zealand, Australia, and more!
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
import { ref } from 'vue';

const tabNumber = ref(1);
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
</script>
