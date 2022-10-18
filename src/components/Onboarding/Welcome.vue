<template>
  <main>
    <div class="mb-8">
      <p class="font-cooper text-brand-black font-normal lg:text-4xl text-2xl">Welcome onboard, Alison.</p>
      <p class="text-brand-black/40 text-base font-normal">Let’s get you set up.</p>
    </div>
    <form>
      <div class="mb-6">
        <label for="role" class="block mb-3 text-base font-medium text-brand-black/70">Which role best describes you?</label>
        <select
          v-model="details.role"
          id="role"
          class="bg-brand-light border-0 text-brand-black text-sm rounded-md focus:border-0 focus:ring-0 block w-full p-3"
        >
          <option disabled value="">Select one option</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>
      </div>
      <div class="mb-6">
        <label for="qualification" class="block mb-3 text-base font-medium text-brand-black/70">Highest Academic Qualification</label>
        <select
          v-model="details.qualification"
          id="qualification"
          class="bg-brand-light border-0 text-brand-black text-sm rounded-md focus:border-0 focus:ring-0 block w-full p-3"
        >
          <option disabled value="">Select one option</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>
      </div>
      <div class="mb-5">
        <div class="mb-3">
          <label for="job" class="block text-base font-medium text-brand-black/70">Current Job</label>
          <p class="text-xs font-noraml text-brand-black/40">Your company will never see you’re looking for a job</p>
        </div>
        <input
          v-model="details.job"
          id="job"
          type="text"
          class="bg-brand-light border-0 placeholder:text-brand-black/20 text-sm rounded-md focus:border-0 focus:ring-0 block w-full p-3 mb-2"
          placeholder="Job Title"
          required=""
        />
        <input
          v-model="details.company"
          id="company"
          type="text"
          class="bg-brand-light border-0 placeholder:text-brand-black/20 text-sm rounded-md focus:border-0 focus:ring-0 block w-full p-3"
          placeholder="Company"
          required=""
        />
      </div>
      <div class="flex items-center mb-6">
        <input
          v-model="details.unemployed"
          id="unemployed"
          type="checkbox"
          class="w-6 h-6 text-[#00CC53] bg-brand-light rounded focus:ring-[#00CC53] focus:ring-1"
        />
        <label for="unemployed" class="ml-2 text-base font-normal text-brand-black/80">I am currently unemployed</label>
      </div>
      <div class="mb-10">
        <label for="job" class="mb-3 block text-base font-medium text-brand-black/70">LinkedIn Profile</label>
        <input
          v-model="details.linkedin"
          id="linkedin"
          type="url"
          class="bg-brand-light border-0 placeholder:text-brand-black/20 text-sm rounded-md focus:border-0 focus:ring-0 block w-full p-3 mb-2"
          placeholder="linkedin/a/................."
          required=""
        />
      </div>
    </form>
  </main>
</template>

<script setup>
import { ref } from 'vue';

const details = ref({
  role: '',
  qualification: '',
  job: null,
  company: null,
  unemployed: false,
  linkedin: '',
});
</script>
