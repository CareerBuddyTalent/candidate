<template>
  <main class="lg:flex lg:h-screen">
    <div class="basis-8/12 lg:px-20 lg:py-14 p-4 overflow-auto scrollbar-hide">
      <img src="@/assets/images/tamborin.png" alt="logo" class="object-cover h-6 lg:hidden mb-10" />
      <div class="rounded-xl h-auto inset-0 right-auto top-[3.8125rem] flex justify-between lg:mb-14 mb-10">
        <div :class="[current == Welcome ? 'active' : current !== Welcome ? 'completed' : '']" class="relative step grow">
          <div class="v-stepper">
            <div class="circle"></div>
            <div class="line"></div>
          </div>
          <!-- <div :class="[current == Welcome ? 'text-blue-600' : 'text-label']" class="content mb-10">Amount & source</div> -->
        </div>
        <div :class="[current == Job ? 'active' : current == Resume ? 'completed' : current !== Job ? '' : 'completed']" class="relative step grow">
          <div class="v-stepper">
            <div class="circle"></div>
            <div class="line"></div>
          </div>
          <!-- <div :class="[current == 2 ? 'text-blue-600' : 'text-label']" class="content mb-10">Receipient details</div> -->
        </div>
        <div :class="[current == Resume ? 'completed' : current !== Resume ? '' : 'completed']" class="relative step">
          <div class="v-stepper">
            <div class="circle"></div>
            <div class="line"></div>
          </div>
          <!-- <div class="content" :class="[current == 3 ? 'text-blue-600' : 'text-label']">Overview</div> -->
        </div>
      </div>

      <keep-alive>
        <component :is="current"></component>
      </keep-alive>
      <Button :label="current == Welcome ? 'Skip' : 'Previous'" color="primaryOpacity" full @click="prevComp" class="mb-4" />
      <Button label="Proceed" color="primary" full @click="nextComp" />
    </div>

    <div class="basis-2/6 bg-[#53B1FB]/10 px-20 hidden lg:block pt-11">
      <img src="@/assets/images/tamborin.png" alt="logo" class="object-cover h-6 float-right mb-28" />
      <img src="@/assets/images/onboard.png" alt="logo" class="object-cover mb-9" />
      <div>
        <p class="font-cooper text-4xl font-normal text-brand-black mb-4">Taking the complexity out of job hunting.</p>
        <p class="text-base text-brand-black/60 font-normal">
          We believe job hunting should be as easy as shopping online. Get connected to successful teams today!
        </p>
      </div>
    </div>
  </main>
</template>

<script setup>
import Welcome from '@/components/Onboarding/Welcome.vue';
import Job from '@/components/Onboarding/Job.vue';
import Resume from '@/components/Onboarding/Resume.vue';
import Button from '@/components/Button.vue';
import { shallowRef } from 'vue';
import { useRouter } from 'vue-router';

const current = shallowRef(Welcome);
const router = useRouter();

function nextComp() {
  if (current.value != Job && current.value != Resume) {
    current.value = Job;
  } else if (current.value == Job) {
    current.value = Resume;
  } else if (current.value == Resume) {
    alert('Weldone');
  }
}
function prevComp() {
  if (current.value == Welcome) {
    router.push('/jobs');
  } else if (current.value == Job) {
    current.value = Welcome;
  } else {
    current.value = Job;
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
