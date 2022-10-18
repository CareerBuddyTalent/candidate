<template>
  <main>
    <div class="mb-8">
      <p class="font-cooper text-brand-black font-normal lg:text-4xl text-2xl">Job Preferences</p>
      <p class="text-brand-black/40 text-base font-normal">We can help you find what you’re looking for.</p>
    </div>
    <form>
      <div class="mb-6">
        <label for="role" class="block mb-3 text-base font-medium text-brand-black/70">What point are you in your job search</label>
        <select id="role" class="bg-brand-light border-0 text-brand-black/20 text-sm rounded-md focus:border-0 focus:ring-0 block w-full p-3">
          <option selected="" disabled>Select one option</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>
      </div>
      <div class="mb-6">
        <label for="qualification" class="block mb-3 text-base font-medium text-brand-black/70">What type of role are you looking for?</label>
        <select
          id="qualification"
          class="bg-brand-light border-0 text-brand-black/20 text-sm rounded-md focus:border-0 focus:ring-0 block w-full p-3"
        >
          <option selected="" disabled>Select one option</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>
      </div>
      <div class="mb-6">
        <label for="role" class="block mb-3 text-base font-medium text-brand-black/70">How many years of experience do you have?</label>
        <select id="role" class="bg-brand-light border-0 text-brand-black/20 text-sm rounded-md focus:border-0 focus:ring-0 block w-full p-3">
          <option selected="" disabled>Select one option</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>
      </div>
      <div class="mb-6">
        <label for="qualification" class="block mb-3 text-base font-medium text-brand-black/70"
          >What type of company are you looking to work for?</label
        >
        <select
          id="qualification"
          class="bg-brand-light border-0 text-brand-black/20 text-sm rounded-md focus:border-0 focus:ring-0 block w-full p-3"
        >
          <option selected="" disabled>Select one option</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>
      </div>
      <div class="mb-6">
        <label for="qualification" class="block mb-3 text-base font-medium text-brand-black/70">Where would you like to work in?</label>
        <div class="grid gap-4 md:grid-cols-2">
          <select
            id="qualification"
            class="bg-brand-light border-0 text-brand-black/20 text-sm rounded-md focus:border-0 focus:ring-0 block w-full p-3"
          >
            <option selected="" disabled>Country</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
          </select>
          <select
            id="qualification"
            class="bg-brand-light border-0 text-brand-black/20 text-sm rounded-md focus:border-0 focus:ring-0 block w-full p-3"
          >
            <option selected="" disabled>State</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
          </select>
        </div>
      </div>
      <div class="mb-6">
        <label for="qualification" class="block mb-3 text-base font-medium text-brand-black/70">What are you looking for in your next role</label>
        <textarea
          id="message"
          rows="3"
          class="block p-2.5 w-full text-base text-brand-black bg-brand-light rounded-md border border-brand-light placeholder:text-brand-black/20 focus:ring-0 focus:border-0"
          placeholder="e.g hands-on, specialization...."
        ></textarea>
      </div>
      <div class="mb-10 flex">
        <span class="inline-flex items-center px-5 py-3 text-base text-white bg-[#172A49] rounded-l-md border rounded border-r-0 border-gray-300">
          $
        </span>
        <input
          type="text"
          id="amount"
          class="rounded-none rounded-r-md border-0 bg-brand-light text-brand-black focus:ring-0 focus:border-0 block flex-1 min-w-0 w-full text-base p-3"
        />
      </div>
    </form>
  </main>
</template>

<script setup>
import { ref } from 'vue';
</script>
