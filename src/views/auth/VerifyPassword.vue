<template>
  <main class="lg:px-28 lg:py-11 p-4 bg-white rounded-xl">
    <div class="mb-10">
      <p class="text-brand-black font-normal text-3xl font-cooper">Verify email address</p>
      <p class="text-brand-black/40 text-base font-normal grid">
        <span class="">We’ve just sent a 6 digit code to {{ email }}</span>
        <span>Check your email. Enter your email address to continue</span>
      </p>
    </div>
    <form class="">
      <div style="display: flex; flex-direction: row; justify-content: center">
        <v-otp-input
          ref="otpInput"
          input-classes="otp-input"
          separator="-"
          :num-inputs="6"
          :should-auto-focus="true"
          :is-input-num="true"
          :conditionalClass="['one', 'two', 'three', 'four']"
          :placeholder="['*', '*', '*', '*', '*', '*']"
          @on-change="handleOnChange"
          @on-complete="handleOnComplete"
        />
      </div>
    </form>
  </main>
</template>

<script setup>
import Email from '@/assets/icons/email.svg?inline';
import Button from '@/components/Button.vue';
import { errorMessage } from '@/utils/helper';
// import { email } from '@vuelidate/validators';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useStore } from 'vuex';

const otpInput = ref('');
const store = useStore();
const router = useRouter();
const toast = useToast();
const email = localStorage.getItem('email');

const handleOnChange = (value) => {
  submit(value);
};

const submit = async (value) => {
  try {
    if (value.length >= 6) {
      const data = {
        email: localStorage.getItem('email'),
        otp: value,
      };
      const res = await store.dispatch('auth/forgetPasswordVerifyOtp', data);
      console.log(res);
      localStorage.setItem('token', res.data.data.token);
      router.push('/new-password');
    }
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

<style>
.otp-input {
  width: 56px !important;
  height: 56px !important;
  padding: 5px !important;
  margin: 30px 10px 30px 10px !important;
  font-size: 20px !important;
  border-radius: 10px !important;
  border: 1px solid rgba(0, 0, 0, 0.3) !important;
  text-align: center !important;
}
@media screen and (max-width: 413px) {
  .otp-input {
    width: 33px !important;
    height: 33px !important;
  }
}
@media screen and (max-width: 900px) {
  .otp-input {
    width: 33px !important;
    height: 33px !important;
  }
}
</style>
