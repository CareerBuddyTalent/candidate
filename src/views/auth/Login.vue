<template>
  <main class="lg:px-20 lg:py-11 p-4 bg-white rounded-xl">
    <div class="lg:mb-0 mb-10">
      <img src="@/assets/images/tamborinSmall.png" alt="logo" class="object-cover lg:hidden" />
    </div>

    <div class="mb-10">
      <p class="text-brand-black text-[40px] font-albertExtraBold">Log In</p>
      <p class="text-brand-black/70 text-lg font-normal">
        New user? <router-link to="/register" class="text-brand-primary font-albertBold text-lg">Sign Up</router-link>
      </p>
    </div>
    <div class="lg:flex grid gap-3 mb-8">
      <Button label="Log in with LinkedIn" :icon="Linkedin" color="info" full />
      <Button label="Log in with Google" :icon="Google" outline color="white" full />
    </div>
    <div class="flex items-center mb-8">
      <div class="flex w-full bg-brand-black/10 h-0.5"></div>
      <p class="text-brand-black/40 px-3">OR</p>
      <div class="flex w-full bg-brand-black/10 h-0.5"></div>
    </div>

    <form class="">
      <div class="mb-4">
        <Input label="Email Address" id="email" type="email" labelFor="email" placeholder="e.g alisoneyo@email.com" v-model="user.email" />
        <!-- <input
          type="email"
          v-model="user.email"
          id="email"
          class="bg-brand-light text-sm rounded-md w-full pl-10 p-3 appearance-none focus:outline-none border-transparent focus:ring-0 focus:border-brand-primary peer"
          placeholder=" "
          required=""
        />
        <label
          for="floating_outlined"
          class="absolute text-sm text-brand-black/20 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 ml-6 bg-brand-light peer-focus:px-2 peer-focus:text-brand-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
          >Email Address</label
        > -->
        <span class="text-[#D80027] uppercase">{{ emailErrorMessage }}</span>
      </div>
      <div class="relative mb-4">
        <Input
          label="Password"
          id="password"
          :type="showPassword ? 'text' : 'password'"
          labelFor="password"
          placeholder="********"
          v-model="user.password"
        />
        <!-- <input
          v-model="user.password"
          :type="showPassword ? 'text' : 'password'"
          id="password"
          class="bg-brand-light text-sm rounded-md w-full pl-10 p-3 appearance-none focus:outline-none border-transparent focus:ring-0 focus:border-brand-primary peer"
          placeholder=" "
          required=""
        />
        <label
          for="floating_outlined"
          class="absolute text-sm text-brand-black/20 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 ml-6 bg-brand-light peer-focus:px-2 peer-focus:text-brand-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
          >Password</label
        > -->
        <div class="flex absolute inset-y-0 right-0 items-center pr-3 cursor-pointer mt-12">
          <EyeClose v-if="!showPassword" @click="showPassword = true" fill="black" />
          <Email v-else @click="showPassword = false" />
        </div>
        <span class="text-[#D80027] uppercase">{{ passwordErrorMessage }}</span>
      </div>

      <div class="pt-4 mb-7 block" v-if="error != ''">
        <div class="p-4 items-center flex flex-row border-l-4 border-[#D80027] bg-[#D80027] bg-opacity-10 rounded">
          <span class="grow text-sm font-normal text-brand-black">{{ error }}</span>
          <Times class="flex-grow-0 cursor-pointer w-5" fill="black" @click.stop="error = ''" />
        </div>
      </div>

      <div class="flex items-center justify-between mb-10">
        <div class="flex items-center h-5">
          <input
            id="remember"
            type="checkbox"
            value=""
            class="w-4 h-4 checked:bg-[#28B446] checked:border-[#28B446] text-[#28B446] appearance-none outline-none rounded border border-brand-black focus:ring-0"
            required
          />
          <label for="remember" class="ml-4 text-base font-normal text-brand-black">Remember me</label>
        </div>
        <router-link class="text-brand-primary cursor-pointer" to="/reset-password">Forgot Password?</router-link>
      </div>
      <Button label="Sign In" color="primary" full @click="submit" :disabled="checkDisability" :loading="loading" />
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
import Times from '@/assets/icons/times.svg?inline';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { useToast } from 'vue-toastification';
import { errorMessage } from '@/utils/helper';

const showPassword = ref(false);
const error = ref('');
const router = useRouter();
const disabled = ref(true);
const loading = ref(false);
const store = useStore();
const toast = useToast();

const user = ref({
  email: '',
  password: '',
});

const checkDisability = computed(() => {
  return user.value.email && user.value.password !== '' ? (disabled.value = false) : (disabled.value = true);
});

async function submit() {
  try {
    disabled.value = true;
    error.value = '';
    loading.value = true;
    const res = await store.dispatch('auth/login', user.value);
    toast.success(res.data.message, {
      timeout: 3000,
      hideProgressBar: true,
    });
    return router.push('/jobs');
  } catch (err) {
    error.value = errorMessage(err);
  } finally {
    loading.value = false;
    disabled.value = false;
  }
}
</script>
