<template>
  <main class="lg:px-10 lg:py-6 p-4 bg-white rounded-xl h-full lg:w-[40%]">
    <div class="lg:block flex justify-end lg:mb-14 mb-10 mt5">
      <p class="text-brand-black/70 font-normal text-sm text-right lg:hidden">
        Remember password? <router-link to="/login" class="text-brand-primary">Sign In</router-link>
      </p>
    </div>
    <div class="mb-10 lg:text-center">
      <p class="text-brand-black font-normal text-3xl font-cooper">Recover Password</p>
      <p class="text-brand-black/40 text-base font-normal">Enter your email address to continue</p>
    </div>
    <form class="">
      <Input v-model="email" placeholder="Enter email" type="email" id="email" required />
      <Button label="Next" color="primary" full @click="submit" class="mt-4" />
      <div class="lg:flex items-center justify-center mb-10 mt-10 hidden">
        <label for="remember" class="ml-4 text-sm font-medium text-brand-black/70 mr-1">Remember password?</label>
        <router-link class="text-brand-primary cursor-pointer" to="/login">Log In</router-link>
      </div>
    </form>
  </main>
</template>

<script setup>
import Email from '@/assets/icons/email.svg?inline';
import Button from '@/components/Button.vue';
import Input from '@/components/form/Input.vue';
import { errorMessage } from '@/utils/helper';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useStore } from 'vuex';

const email = ref('');
const store = useStore();
const router = useRouter();
const toast = useToast();

const submit = async () => {
  try {
    const data = {
      email: email.value,
    };
    await store.dispatch('auth/forgetPasswordRequestOtp', data);
    localStorage.setItem('email', data.email);
    router.push('/verify-password');
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
</script>
