<template>
  <main class="lg:flex flex-col lg:bg-black h-screen">
    <img src="@/assets/images/careercolor.svg" alt="logo" class="object-cover pt-4 block mx-auto" />
    <div class="lg:px-20 lg:py-11 p-4 mt-10 w-1/2 bg-white rounded-xl overflow-auto scrollbar-hide mx-auto">
      <!-- <img src="@/assets/images/tamborin.png" alt="logo" class="object-cover h-6 lg:hidden mb-10" /> -->
      <div class="rounded-xl h-auto inset-0 right-auto top-[3.8125rem] flex justify-between lg:mb-14 mb-10">
        <div :class="[current == Welcome ? 'active' : current !== Welcome ? 'completed' : '']" class="relative step grow">
          <div class="v-stepper">
            <div class="circle"></div>
            <div class="line"></div>
          </div>
        </div>
        <div :class="[current == Job ? 'active' : current == Resume ? 'completed' : current !== Job ? '' : 'completed']" class="relative step grow">
          <div class="v-stepper">
            <div class="circle"></div>
            <div class="line"></div>
          </div>
        </div>
        <div :class="[current == Resume ? 'completed' : current !== Resume ? '' : 'completed']" class="relative step">
          <div class="v-stepper">
            <div class="circle"></div>
            <div class="line"></div>
          </div>
        </div>
      </div>

      <keep-alive>
        <component :is="current" ref="child"></component>
      </keep-alive>
      <Button :label="current == Welcome ? 'Skip' : 'Previous'" color="primaryOpacity" full @click="prevComp" class="mb-4" />
      <Button label="Proceed" color="primary" full @click="handleEvent" />
    </div>

    <!-- <div class="basis-2/6 bg-[#53B1FB]/10 px-20 hidden lg:block pt-11">
      <img src="@/assets/images/tamborin.png" alt="logo" class="object-cover h-6 float-right mb-28" />
      <img src="@/assets/images/onboard.png" alt="logo" class="object-cover mb-9" />
      <div>
        <p class="font-cooper text-4xl font-normal text-brand-black mb-4">Taking the complexity out of job hunting.</p>
        <p class="text-base text-brand-black/60 font-normal">
          We believe job hunting should be as easy as shopping online. Get connected to successful teams today!
        </p>
      </div>
    </div> -->
  </main>
</template>

<script setup>
import Job from '@/components/Onboarding/Job.vue';
import Resume from '@/components/Onboarding/Resume.vue';
import Welcome from '@/components/Onboarding/Welcome.vue';
import Button from '@/components/Button.vue';
import { errorMessage } from '@/utils/helper';
import { ref, shallowRef } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useStore } from 'vuex';

const current = shallowRef(Welcome);
const router = useRouter();
const store = useStore();
const child = ref(null);
const toast = useToast();

// function nextComp() {
//   if (current.value != Job && current.value != Resume) {
//     current.value = Job;
//   } else if (current.value == Job) {
//     current.value = Resume;
//   } else if (current.value == Resume) {
//     alert('Weldone');
//   }
// }
function prevComp() {
  if (current.value == Welcome) {
    router.push('/jobs');
  } else if (current.value == Job) {
    current.value = Welcome;
  } else {
    current.value = Job;
  }
}

async function handleEvent() {
  try {
    if (current.value == Welcome) {
      await store.dispatch('auth/onboardProfile', child.value.profileDetails);
      await store.dispatch('auth/getUser', { forceReload: true });
      current.value = Job;
    } else if (current.value == Job) {
      const data = {
        ...child.value.preferenceDetails,
        next_role_perks: child.value.preferenceDetails?.next_role_perks?.split(','),
      };
      await store.dispatch('auth/onboardPreference', data);
      await store.dispatch('auth/getUser', { forceReload: true });
      current.value = Resume;
    } else {
      if (!child.value.resumeDetails) {
        toast.error('Please upload file', {
          timeout: 3000,
          hideProgressBar: true,
        });
        return;
      }
      const data = new FormData();
      data.append('resume', child.value.resumeDetails);
      await store.dispatch('auth/onboardResume', data);
      await store.dispatch('auth/getUser', { forceReload: true });
      router.push('/jobs');
      toast.success('Welcome on board', {
        timeout: 3000,
        hideProgressBar: true,
      });
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
}
</script>

<style scoped>
.step {
  padding: 5px;
}
.v-stepper {
  position: relative;
  margin-top: 2px;
}
.step .circle {
  background-color: #e7e7e8;
  border: 1px solid #e7e7e8;
  border-radius: 100%;
  width: 12px;
  height: 12px;
  display: inline-block;
}

.step .line {
  border: 1px solid #e7e7e8;
  bottom: 14px;
  left: 12px;
  height: 100%;
  position: relative;
}

.step.active .circle {
  visibility: visible;
  width: 12px;
  height: 12px;
  border-color: #28b446;
  background: #28b446;
}

.step.active .line {
  border: 1px solid #e7e7e8;
  display: flex;
  height: 100%;
  width: 100%;
}

.step.completed .circle {
  visibility: visible;
  width: 16px;
  height: 16px;
  background-color: #28b446;
  border-color: #28b446;
}

.step.completed .line {
  border: 1px solid #28b446;
  bottom: 16px;
  position: relative;
}

.step.empty .circle {
  visibility: hidden;
}

.step:last-child .line {
  border: 1px solid white;
  z-index: -1; /* behind the circle to completely hide */
}

/* .content {
  margin-left: 14px;
  display: inline-block;
} */
</style>
