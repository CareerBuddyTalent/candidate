<template>
  <main class="lg:pt-10 lg:px-20 p-4">
    <div class="lg:block flex justify-between items-center lg:mb-14 mb-10 mt-5">
      <img src="@/assets/images/tamborinSmall.png" alt="logo" class="object-cover lg:hidden" />
      <p class="text-brand-black/70 font-normal text-sm text-right">
        Exising user? <router-link to="/login" class="text-brand-primary">Sign In</router-link>
      </p>
    </div>
    <!-- <p class="text-brand-black/70 font-normal text-sm text-right mb-10 hidden lg:block">Exising user? <router-link to="/candidate/login" class="text-brand-primary">Sign In</router-link></p> -->
    <div class="mb-10">
      <p class="text-brand-black font-normal text-3xl font-cooper">Sign up to Tamborin</p>
      <p class="text-brand-black/40 text-base font-normal">The first step to a world of possibilities.</p>
    </div>
    <div class="lg:flex grid gap-3 mb-8">
      <Button label="with Google" :icon="Google" outline color="white" />
      <Button label="with LinkedIn" :icon="Linkedin" color="info" />
      <Button label=" with Github" :icon="Github" color="black" />
    </div>
    <div class="flex items-center mb-8">
      <div class="flex w-full bg-brand-black/10 h-0.5"></div>
      <p class="text-brand-black/40 px-3">OR</p>
      <div class="flex w-full bg-brand-black/10 h-0.5"></div>
    </div>

    <form>
      <div class="grid gap-4 mb-6 md:grid-cols-2">
        <div class="relative">
          <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <User />
          </div>
          <input
            v-model="v$.data.first_name.$model"
            type="text"
            id="first_name"
            class="bg-brand-light border-0 text-gray-900 text-sm rounded-md focus:ring-0 focus:border-0 block w-full pl-10 p-4 placeholder:text-[#13060F]/30"
            placeholder="First name"
          />
          <div class="absolute text-sm top-14 whitespace-nowrap text-red-500" v-for="(error, index) in v$.data.first_name.$errors" :key="index">
            {{ error.$message }}
          </div>
        </div>

        <div class="relative">
          <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <User />
          </div>
          <input
            v-model="v$.data.last_name.$model"
            type="text"
            id="lastName"
            class="bg-brand-light border-0 text-gray-900 text-sm rounded-md focus:ring-0 focus:border-0 block w-full pl-10 p-4 placeholder:text-[#13060F]/30"
            placeholder="Last name"
          />
          <div class="absolute text-sm top-14 whitespace-nowrap text-red-500" v-for="(error, index) in v$.data.last_name.$errors" :key="index">
            {{ error.$message }}
          </div>
        </div>
      </div>
      <div class="relative mb-6">
        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <Email />
        </div>
        <input
          v-model="v$.data.email.$model"
          type="email"
          id="email"
          class="bg-brand-light border-0 text-gray-900 text-sm rounded-md focus:ring-0 focus:border-0 block w-full pl-10 p-4 placeholder:text-[#13060F]/30"
          placeholder="Email Address"
          required=""
        />
        <div class="absolute text-sm top-14 whitespace-nowrap text-red-500" v-for="(error, index) in v$.data.email.$errors" :key="index">
          {{ error.$message }}
        </div>
      </div>
      <div class="relative" :class="[!v$.data.password.$anyDirty._value ? 'mb-20' : 'mb-10']">
        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <Lock />
        </div>
        <input
          v-model="v$.data.password.$model"
          :type="showPassword ? 'text' : 'password'"
          id="password"
          class="bg-brand-light border-0 text-gray-900 text-sm rounded-md focus:ring-0 focus:border-0 block w-full pl-10 p-4 placeholder:text-[#13060F]/30"
          placeholder="Password"
          required=""
        />
        <div class="flex absolute inset-y-0 right-0 items-center pr-3 cursor-pointer">
          <EyeClose v-if="!showPassword" @click="showPassword = true" />
          <Email v-else @click="showPassword = false" />
        </div>
        <ul class="list-disc absolute text-sm top-14 whitespace-nowrap text-red-500 mb-4">
          <li v-for="error in v$.data.password.$errors" :key="error.$message">{{ error.$message }}</li>
        </ul>
      </div>
      <Button label="Sign Up" color="primary" full @click="handleRegistration" :loading="loading" :disabled="disabled" />

      <div class="lg:flex justify-center mt-10 text-center">
        <label for="remember" class="text-base font-medium text-brand-black"
          >By signing up, you agree to our <a href="#" class="text-brand-sky cursor-pointer hover:underline">Terms & Conditions</a></label
        >
      </div>
    </form>
  </main>
</template>

<script setup>
import Button from '@/components/Button.vue';
import { Google, Linkedin, Github } from '@/utils/icons';
import User from '@/assets/icons/user.svg?inline';
import Email from '@/assets/icons/email.svg?inline';
import Lock from '@/assets/icons/lock.svg?inline';
import EyeClose from '@/assets/icons/eye-slash.svg?inline';
import useVuelidate from '@vuelidate/core';
import { ref, reactive, computed } from 'vue';
import { useStore } from 'vuex';
import { required, email, minLength, helpers } from '@vuelidate/validators';
import { sleep } from '@/utils/helper';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';

const router = useRouter();
const display = ref([]);
const disabled = ref(false);
const loading = ref(false);
const showPassword = ref(false);
const store = useStore();
const state = reactive({ data: { first_name: '', last_name: '', email: '', password: '' } });
const toast = useToast();
const rules = {
  data: {
    first_name: {
      required,
      minLength: minLength(2),
    },
    last_name: {
      required,
      minLength: minLength(2),
    },
    email: {
      email,
      required,
    },
    password: {
      required,
      upperCase: helpers.withMessage(
        () => `Include an UPPERCASE`,
        (value) => /[A-Z]/.test(value),
      ),
      specialCharacter: helpers.withMessage(
        () => `Include an special character`,
        (value) => /\W|_/.test(value),
      ),
      minLength: minLength(8),
      numeric: helpers.withMessage(
        () => `Include a number`,
        (value) => /[0-9]/.test(value),
      ),
    },
  },
};

async function handleRegistration() {
  // if (v$.data.$anyError) return;
  try {
    loading.value = true;
    disabled.value = true;
    const res = await store.dispatch('auth/register', state.data);
    toast.success(res.data.message, {
      timeout: 3000,
      hideProgressBar: true,
    });
    loading.value = false;
    return router.push('/onboard');
  } catch (error) {
    toast.error(errorMessage(error), {
      timeout: 3000,
      hideProgressBar: true,
    });
  }
}

const v$ = useVuelidate(rules, state);
</script>
