<template>
  <main class="">
    <div class="bg-[#6D2E5D] lg:px-20 lg:py-10 px-5 pt-10 pb-10 top-0 left-0 right-0 sticky z-30 w-screen transition-position">
      <div class="flex justify-between items-center mb-6">
        <Header class="lg:hidden" />
        <img src="@/assets/images/tamborin.png" alt="logo" class="object-cover h-6 hidden lg:block" />
        <NavItem />
        <div class="flex items-center relative">
          <div class="relative">
            <SuitCase class="lg:mr-7 mr-3.5" />
            <div
              class="inline-flex absolute -top-2 right-2 justify-center items-center p- w-6 h-6 bg-[#EA4C89] rounded-full border-2 border-[#6D2E5D]"
            >
              <Check />
            </div>
          </div>
          <div class="relative">
            <Chat class="lg:mr-7 mr-3.5" fill="white" />
            <div
              class="inline-flex absolute -top-4 right-2 justify-center items-center p-1 w-6 h-6 lg:p-3 lg:w-4 lg:h-4 text-xs font-bold text-white bg-[#EA4C89] rounded-full border-2 border-[#6D2E5D]"
            >
              20
            </div>
          </div>
          <Bell class="lg:mr-7 mr-3.5" />
          <img
            src="https://via.placeholder.com/320X430"
            alt="profileImage"
            class="rounded-full w-8 h-8 hidden lg:block cursor-pointer"
            @click.stop="toggleDropdown()"
            type="button"
            data-dropdown-toggle="userDropdown"
            data-dropdown-placement="bottom-start"
          />
          <!-- Dropdown menu -->
          <div
            id="userDropdown"
            :class="[dropdownShow ? 'block' : 'hidden']"
            class="z-10 w-56 bg-white rounded divide-y divide-gray-100 shadow fixed top-0"
          >
            <div class="py-3 px- text-sm font-normal text-brand-black flex truncate">
              <img src="https://via.placeholder.com/320X430" alt="profileImg" class="rounded-full h-10 w-10 object-cover" />
              <div class="">
                <p>Bonnie Green</p>
                <p>name@flowbite.com</p>
              </div>
            </div>
            <ul class="py-1 text-sm text-brand-black font-normal" aria-labelledby="avatarButton">
              <li>
                <router-link to="#" class="block py-2 px-4">Edit Profile</router-link>
              </li>
              <li>
                <router-link to="#" class="block py-2 px-4">Password & Security</router-link>
              </li>
              <li>
                <router-link to="#" class="block py-2 px-4">Help and Support</router-link>
              </li>
              <li>
                <p @click="logout" class="block py-2 px-4 text-[#D80027]">Log Out</p>
              </li>
            </ul>
            <div class="py-1"></div>
          </div>
        </div>
      </div>
    </div>
    <router-view />
  </main>
</template>

<script setup>
import NavBody from '@/components/NavBody.vue';
import Header from '@/assets/icons/header.svg?inline';
import Bell from '@/assets/icons/bell.svg?inline';
import Chat from '@/assets/icons/chat.svg?inline';
import SuitCase from '@/assets/icons/suitcase.svg?inline';
import Check from '@/assets/icons/check.svg?inline';
import NavItem from '@/components/NavItem.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const dropdownShow = ref(false);
const store = useStore();
const router = useRouter();

function toggleDropdown() {
  dropdownShow.value = !dropdownShow.value;
}

async function logout() {
  await store.dispatch('auth/logout');
  return router.push('/login');
}
</script>
