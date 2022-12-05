<template>
  <main class="lg:px-10 lg:py-6 p-4 bg-white rounded-xl h-full lg:w-[40%]">
    <div class="mb-10">
      <p class="text-brand-black font-normal text-3xl font-cooper">Reset Password</p>
      <p class="text-brand-black/40 text-base font-normal">Create a new password</p>
    </div>
    <form class="">
      <div class="relative mb-4">
        <Input
          v-model="password"
          label="Enter new password"
          id="password"
          :type="newPassword ? 'text' : 'password'"
          labelFor="password"
          placeholder="********"
        />

        <div class="flex absolute inset-y-0 right-0 items-center pr-3 cursor-pointer mt-12">
          <EyeClose v-if="!newPassword" @click="newPassword = true" fill="black" />
          <Email v-else @click="newPassword = false" />
        </div>
        <span class="text-[#D80027] uppercase">{{ passwordErrorMessage }}</span>
      </div>
      <div class="relative mb-4">
        <Input
          v-model="confirm_password"
          label="Confirm password"
          id="password"
          :type="showPassword ? 'text' : 'password'"
          labelFor="password"
          placeholder="********"
        />

        <div class="flex absolute inset-y-0 right-0 items-center pr-3 cursor-pointer mt-12">
          <EyeClose v-if="!showPassword" @click="showPassword = true" fill="black" />
          <Email v-else @click="showPassword = false" />
        </div>
        <span class="text-[#D80027] uppercase">{{ passwordErrorMessage }}</span>
      </div>

      <Button label="Next" color="primary" full @click.stop="resetPasswordAction" />
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
import Input from '@/components/form/Input.vue';
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { errorMessage } from '@/utils/helper';

const showPassword = ref(false);
const newPassword = ref(false);
const showPasswordSuccessModal = ref(false);
const password = ref('');
const confirm_password = ref('');
const store = useStore();
const router = useRouter();
const error = ref(null);
const toast = useToast();

const resetPasswordAction = async (value) => {
  try {
    const data = {
      email: localStorage.getItem('email'),
      token: localStorage.getItem('token'),
      password: password.value,
      password_confirmation: confirm_password.value,
    };
    await store.dispatch('auth/forgetPasswordReset', data);
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    showPasswordSuccessModal.value = true;
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
