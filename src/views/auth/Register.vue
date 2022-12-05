<template>
  <main class="lg:px-20 lg:py-11 p-4 bg-white rounded-xl">
    <div class="lg:mb-0 mb-10">
      <img src="@/assets/images/tamborinSmall.png" alt="logo" class="object-cover lg:hidden" />
    </div>

    <div class="mb-10">
      <p class="text-brand-black text-[40px] font-albertExtraBold">Sign Up</p>
      <p class="text-brand-black/70 text-lg font-normal">
        Have an account? <router-link to="/login" class="text-brand-primary font-albertBold text-lg">Log In</router-link>
      </p>
    </div>
    <div class="lg:flex grid gap-3 mb-8">
      <Button label="Log in with LinkedIn" :icon="Linkedin" color="info" full />
      <Button label="Log in with Google" :icon="Google" outline color="black" full />
    </div>
    <div class="flex items-center mb-8">
      <div class="flex w-full bg-brand-black/10 h-0.5"></div>
      <p class="text-brand-black/40 px-3">OR</p>
      <div class="flex w-full bg-brand-black/10 h-0.5"></div>
    </div>

    <form>
      <div class="grid gap-4 mb-6 md:grid-cols-2">
        <div>
          <Input label="First Name" id="first_name" type="text" labelFor="first_name" placeholder="John" v-model="v$.data.first_name.$model" />
          <div class="text-sm whitespace-nowrap text-red-500" v-for="(error, index) in v$.data.first_name.$errors" :key="index">
            {{ error.$message }}
          </div>
        </div>

        <div class="relative">
          <Input label="Last Name" id="last_name" type="text" labelFor="last_name" placeholder="Doe" v-model="v$.data.last_name.$model" />
          <div class="text-sm whitespace-nowrap text-red-500" v-for="(error, index) in v$.data.last_name.$errors" :key="index">
            {{ error.$message }}
          </div>
        </div>
      </div>
      <div class="relative mb-6">
        <Input label="Email Address" id="email" type="email" labelFor="email" placeholder="e.g alisoneyo@email.com" v-model="v$.data.email.$model" />
        <div class="text-sm whitespace-nowrap text-red-500" v-for="(error, index) in v$.data.email.$errors" :key="index">
          {{ error.$message }}
        </div>
      </div>

      <div class="relative mb-6">
        <Input
          label="Create Password"
          id="password"
          :type="showPassword ? 'text' : 'password'"
          labelFor="password"
          placeholder="********"
          v-model="v$.data.password.$model"
        />
        <div class="flex absolute inset-y-0 right-0 items-center pr-3 cursor-pointer mt-10">
          <EyeClose v-if="!showPassword" @click="showPassword = true" />
          <Email v-else @click="showPassword = false" />
        </div>
        <ul class="list-disc text-sm whitespace-nowrap text-red-500">
          <li v-for="error in v$.data.password.$errors" :key="error.$message">{{ error.$message }}</li>
        </ul>
      </div>

      <div class="relative mb-6">
        <Input
          label="Confirm Password"
          id="password"
          :type="showConfirmPassword ? 'text' : 'password'"
          labelFor="password"
          placeholder="********"
          v-model="v$.data.password_confirmation.$model"
        />
        <div class="flex absolute inset-y-0 right-0 items-center pr-3 cursor-pointer mt-10">
          <EyeClose v-if="!showConfirmPassword" @click="showConfirmPassword = true" />
          <Email v-else @click="showConfirmPassword = false" />
        </div>
        <ul class="list-disc text-sm whitespace-nowrap text-red-500 mb-4">
          <li v-for="error in v$.data.password_confirmation.$errors" :key="error.$message">{{ error.$message }}</li>
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
import Input from '@/components/form/Input.vue';
import { Google, Linkedin, Github } from '@/utils/icons';
import User from '@/assets/icons/user.svg?inline';
import Email from '@/assets/icons/email.svg?inline';
import Lock from '@/assets/icons/lock.svg?inline';
import EyeClose from '@/assets/icons/eye-slash.svg?inline';
import useVuelidate from '@vuelidate/core';
import { ref, reactive, computed } from 'vue';
import { useStore } from 'vuex';
import { required, email, minLength, helpers, sameAs, alphaNum } from '@vuelidate/validators';
import { errorMessage, sleep } from '@/utils/helper';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';

const router = useRouter();
const display = ref([]);
const disabled = ref(false);
const loading = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const store = useStore();
const state = reactive({
  data: { first_name: '', last_name: '', email: '', password: '', password_confirmation: '', registration_type: 'candidate' },
});
const toast = useToast();
const passwordIsSame = (password) => {
  return password === state.data.password;
};
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
      minLength: minLength(8),
    },
    password_confirmation: { required, sameAsPassword: helpers.withMessage('Password does not match', passwordIsSame) },
  },
};
// const checkDisability = computed(() => {
//   return !state.data ? (disabled.value = false) : (disabled.value = true);
// });

async function handleRegistration() {
  if (!v$.value.$anyDirty) return;
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
