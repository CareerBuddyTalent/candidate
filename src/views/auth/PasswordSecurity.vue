<template>
  <main>
    <NavBody />
    <div class="lg:px-20 px-5 py-8 mt-10">
      <div class="border rounded p-8">
        <div class="lg:flex items-center justify-between md:flex-row flex-col lg:gap-x-60 gap-8">
          <div class="self-start">
            <p class="text-brand-black font-albertSemiBold">Password</p>
            <p class="font-albert text-sm text-brand-black/70">Tell us about yourself so startups know who you are.</p>
          </div>
          <div class="grow space-y-5 my-5 lg:my-0">
            <Input
              label="Current Password"
              labelFor="current_password"
              id="current_password"
              type="text"
              placeholder="********"
              v-model="details.current_password"
            />
            <Input label="New Password" labelFor="new_password" id="new_password" type="text" placeholder="********" v-model="details.new_password" />
            <Input
              label="Confirm Password"
              labelFor="confirm_password"
              id="confirm_password"
              type="text"
              placeholder="********"
              v-model="details.new_password_confirmation"
            />
            <Button label="Save Changes" color="primary" :disabled="checkDisability" :loading="loading" @click="reset" full />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import NavBody from '@/components/NavBody.vue';
import Input from '@/components/form/Input.vue';
import Button from '@/components/Button.vue';
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useToast } from 'vue-toastification';
import { errorMessage } from '@/utils/helper';

const store = useStore();
const toast = useToast();
const loading = ref(false);
const disabled = ref(true);
const details = ref({
  current_password: '',
  new_password: '',
  new_password_confirmation: '',
});

const checkDisability = computed(() => {
  return details.value.current_password && details.value.new_password && details.value.new_password_confirmation !== ''
    ? (disabled.value = false)
    : (disabled.value = true);
});

const reset = async () => {
  try {
    loading.value = true;
    const res = await store.dispatch('auth/resetPassword', details.value);
    toast.success(res.data.message, {
      timeout: 3000,
      hideProgressBar: true,
    });
    loading.value = false;
  } catch (error) {
    loading.value = true;
    if (error.response && error.response.status === 422) {
      console.log(error.response.data.errors);
    }
    toast.error(errorMessage(error), {
      timeout: 3000,
      hideProgressBar: true,
    });
    loading.value = false;
  }
};
</script>
