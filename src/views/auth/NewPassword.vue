<template>
  <main class="lg:px-28 lg:py-11 p-4">
    <div class="lg:block flex justify-between items-center lg:mb-14 mb-10 mt5">
      <img src="@/assets/images/tamborinSmall.png" alt="logo" class="object-cover lg:hidden" />
      <p class="text-brand-black/70 font-normal text-sm text-right lg:hidden">
        Remember? <router-link to="/login" class="text-brand-primary">Sign In</router-link>
      </p>
    </div>
    <div class="mb-10">
      <p class="text-brand-black font-normal text-3xl font-cooper">Reset Password</p>
      <p class="text-brand-black/40 text-base font-normal">Create a new password</p>
    </div>
    <form class="">
      <div class="relative mb-4">
        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <Lock />
        </div>
        <input
          :type="newPassword ? 'text' : 'password'"
          id="email"
          class="bg-brand-light text-sm rounded-md w-full pl-10 p-3 appearance-none focus:outline-none border-transparent focus:ring-0 focus:border-brand-primary peer"
          placeholder=" "
          required=""
        />
        <label
          for="floating_outlined"
          class="absolute text-sm text-brand-black/20 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 ml-6 bg-brand-light peer-focus:px-2 peer-focus:text-brand-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
          >Enter new password</label
        >
        <div class="flex absolute inset-y-0 right-0 items-center pr-3 cursor-pointer">
          <EyeClose v-if="!newPassword" @click="newPassword = true" fill="black" />
          <Email v-else @click="newPassword = false" />
        </div>
      </div>
      <div class="relative mb-4">
        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <Lock />
        </div>
        <input
          :type="showPassword ? 'text' : 'password'"
          id="email"
          class="bg-brand-light text-sm rounded-md w-full pl-10 p-3 appearance-none focus:outline-none border-transparent focus:ring-0 focus:border-brand-primary peer"
          placeholder=" "
          required=""
        />
        <label
          for="floating_outlined"
          class="absolute text-sm text-brand-black/20 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 ml-6 bg-brand-light peer-focus:px-2 peer-focus:text-brand-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
          >Confirm Password</label
        >
        <div class="flex absolute inset-y-0 right-0 items-center pr-3 cursor-pointer">
          <EyeClose v-if="!showPassword" @click="showPassword = true" fill="black" />
          <Email v-else @click="showPassword = false" />
        </div>
      </div>
      <Button label="Next" color="primary" full @click.stop="resetPasswordAction" />
      <div class="lg:flex items-center justify-center mb-10 mt-10 hidden">
        <label for="remember" class="ml-4 text-sm font-medium text-brand-black/70 mr-1">Remember password?</label>
        <router-link class="text-brand-primary cursor-pointer" to="/login">Log In</router-link>
      </div>
    </form>
    <Modal v-if="showPasswordSuccessModal" size="sm">
      <template #body>
        <div class="flex flex-col space-y-4 items-center">
          <Success class="w-16 h-16 text-[#25D06A]" />

          <div class="flex flex-col mt-8 text-center">
            <h1 class="text-2xl font-normal font-cooper text-brand-black">
              Password reset <br />
              successful!
            </h1>
          </div>

          <Button label="Back to Login" @click="$router.push('/login')" color="primary" />
        </div>
      </template>
    </Modal>
  </main>
</template>

<script setup>
import Email from '@/assets/icons/email.svg?inline';
import Button from '@/components/Button.vue';
import Lock from '@/assets/icons/lock.svg?inline';
import Success from '@/assets/icons/success.svg?inline';
import EyeClose from '@/assets/icons/eye-slash.svg?inline';
import Modal from '@/components/Modal.vue';
import { ref } from 'vue';

const showPassword = ref(false);
const newPassword = ref(false);
const showPasswordSuccessModal = ref(false);
function resetPasswordAction() {
  showPasswordSuccessModal.value = true;
}
</script>
