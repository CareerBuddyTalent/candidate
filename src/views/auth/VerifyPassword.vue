<template>
  <main class="lg:px-28 lg:py-11 p-4">
    <div class="lg:block flex justify-between items-center lg:mb-14 mb-10 mt5">
      <img src="@/assets/images/tamborinSmall.png" alt="logo" class="object-cover lg:hidden" />
      <p class="text-brand-black/70 font-normal text-sm text-right lg:hidden">
        Remember? <router-link to="/login" class="text-brand-primary">Sign In</router-link>
      </p>
    </div>
    <div class="mb-10">
      <p class="text-brand-black font-normal text-3xl font-cooper">Verify email address</p>
      <p class="text-brand-black/40 text-base font-normal grid">
        <span class="">We’ve just sent a 6 digit code to adf**********.com</span>
        <span>Check your email. Enter your email address to continue</span>
      </p>
    </div>
    <form class="">
      <div class="relative mb-7">
        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <Email />
        </div>
        <input
          type="email"
          id="email"
          class="bg-brand-light text-sm rounded-md w-full pl-10 p-3 appearance-none focus:outline-none border-transparent focus:ring-0 focus:border-brand-primary peer"
          placeholder=" "
          required=""
        />
        <label
          for="floating_outlined"
          class="absolute text-sm text-brand-black/20 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 ml-6 bg-brand-light peer-focus:px-2 peer-focus:text-brand-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
          >Email Address</label
        >
      </div>
      <Button label="Next" color="primary" full @click="$router.push('/new-password')" />
      <div class="lg:flex items-center justify-center mb-10 mt-10 text-center hidden">
        <label for="remember" class="ml-4 text-sm font-medium text-brand-black/70 mr-1">Remember password?</label>
        <router-link class="text-brand-primary cursor-pointer" to="/login">Log In</router-link>
      </div>
    </form>
  </main>
</template>

<script setup>
import Email from '@/assets/icons/email.svg?inline';
import Button from '@/components/Button.vue';
</script>
