<template>
  <main>
    <div class="min-h-full">
      <Disclosure as="nav" class="bg-brand-primary top-0 left-0 right-0 sticky z-30 w-screen transition-position" v-slot="{ open }">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="flex h-16 items-center justify-between">
            <div class="flex-shrink-0">
              <img class="object-cover" src="@/assets/images/careerlogo.svg" />
            </div>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <NavItem />
              </div>
            </div>
            <div class="hidden md:block">
              <div class="ml-4 flex items-center md:ml-6">
                <!-- <div class="flex items-center">
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
                </div> -->

                <!-- Profile dropdown -->
                <Menu as="div" class="relative ml-3">
                  <div>
                    <MenuButton class="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-0">
                      <span class="sr-only">Open user menu</span>
                      <img class="h-10 w-10 rounded-full object-cover" :src="userDetails.candidate.avatar" alt="" />
                    </MenuButton>
                  </div>
                  <transition
                    enter-active-class="transition ease-out duration-100"
                    enter-from-class="transform opacity-0 scale-95"
                    enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75"
                    leave-from-class="transform opacity-100 scale-100"
                    leave-to-class="transform opacity-0 scale-95"
                  >
                    <MenuItems
                      class="absolute right-0 z-10 mt-2 w-60 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      <MenuItem>
                        <div class="py-3 px-4 text-sm text-gray-900 dark:text-white border-b flex items-center">
                          <img class="h-10 w-10 rounded-full object-cover mr-2" :src="userDetails.candidate.avatar" alt="" />
                          <div class="grow">
                            <div class="text-brand-black font-albert text-base capitalize">{{ userDetails.name }}</div>
                            <div class="font-medium text-brand-black/70">{{ userDetails.email }}</div>
                          </div>
                        </div>
                      </MenuItem>
                      <MenuItem v-for="item in userNavigation" :key="item.name">
                        <a
                          :href="item.href"
                          @click="item.logout()"
                          :class="[item.name == 'Logout' ? 'text-brand-primary' : 'text-black', 'block px-4 py-2 text-sm ']"
                          >{{ item.name }}</a
                        >
                      </MenuItem>
                    </MenuItems>
                  </transition>
                </Menu>
              </div>
            </div>
            <div class="-mr-2 flex md:hidden">
              <!-- Mobile menu button -->
              <DisclosureButton
                class="inline-flex items-center justify-center rounded-md p-2 text-white hover:text-white focus:outline-none focus:ring-0"
              >
                <span class="sr-only">Open main menu</span>
                <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
                <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
              </DisclosureButton>
            </div>
          </div>
        </div>

        <DisclosurePanel class="md:hidden">
          <div class="space-y-1 px-2 pt-2 pb-3 sm:px-3 flex items-center justify-between">
            <NavItem />
            <!-- <div class="flex items-center">
              <div class="relative">
                <SuitCase class="mr-3.5" />
                <div
                  class="inline-flex absolute -top-2 right-2 justify-center items-center p- w-6 h-6 bg-[#EA4C89] rounded-full border-2 border-[#6D2E5D]"
                >
                  <Check />
                </div>
              </div>
              <div class="relative">
                <Chat class="mr-3.5" fill="white" />
                <div
                  class="inline-flex absolute -top-4 right-2 justify-center items-center p-1 w-6 h-6 lg:p-3 lg:w-4 lg:h-4 text-xs font-bold text-white bg-[#EA4C89] rounded-full border-2 border-[#6D2E5D]"
                >
                  20
                </div>
              </div>
              <Bell class="mr-3.5" />
            </div> -->
          </div>
          <div class="pt-4 pb-3 border-t border-slate-200 mt-1">
            <div class="flex items-center px-5">
              <div class="flex-shrink-0">
                <img class="h-10 w-10 rounded-full object-cover" :src="userDetails.candidate.avatar" alt="" />
              </div>
              <div class="ml-3">
                <div class="text-base font-albertSemiBold leading-none text-white">{{ userDetails.name }}</div>
                <div class="text-sm font-albertSmall leading-none text-white">{{ userDetails.email }}</div>
              </div>
            </div>
            <div class="mt-3 space-y-1 px-2">
              <a
                v-for="item in userNavigation"
                :key="item.name"
                :href="item.href"
                @click="item.logout()"
                :class="[item.name == 'Logout' ? 'text-BLACK' : 'text-white', 'block px-4 py-2 text-sm ']"
                >{{ item.name }}</a
              >
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>

      <main>
        <!-- Replace with your content -->
        <router-view />
        <!-- /End replace -->
      </main>
    </div>
  </main>
</template>

<script setup>
import Bell from '@/assets/icons/bell.svg?inline';
import Chat from '@/assets/icons/chat.svg?inline';
import SuitCase from '@/assets/icons/suitcase.svg?inline';
import Check from '@/assets/icons/check.svg?inline';
import NavItem from '@/components/NavItem.vue';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline';

import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();
const userDetails = computed(() => {
  return store.state.auth.userDetails;
});

const user = {
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

const userNavigation = [
  { name: 'Edit Profile', href: '/profile' },
  { name: 'Password & Security', href: '/password' },
  // { name: 'Help and Support', href: '#' },
  {
    name: 'Logout',
    href: '#',
    async logout() {
      await store.dispatch('logout');
      return router.push('/login');
    },
  },
];
</script>
