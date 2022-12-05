<template>
  <main class="flex flex-col h-full">
    <div class="mb-4 border-b border-gray-200" :class="[hidden ? 'hidden md:block' : 'md:block']">
      <ul
        class="flex items-center -mb-px text-sm font-medium text-center overflow-x-scroll whitespace-nowrap scrollbar-hide snap-proximity snap-center"
        id="myTab"
        data-tabs-toggle="#myTabContent"
        role="tablist"
      >
        <li v-for="(tab, i) in numberOfTabs" :key="i" class="">
          <button
            class="inline-block text-base p-4 rounded-t-lg"
            type="button"
            @click="toggleTabs(i + 1)"
            :class="[currentTab !== i + 1 ? 'text-brand-black/40' : 'text-brand-color border-brand-color border-b-2 font-bold', borderColor]"
          >
            {{ tab.name }}
          </button>
        </li>
      </ul>
    </div>
    <div id="myTabContent" :class="className" class="grow overflow-y-auto">
      <slot></slot>
    </div>
  </main>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  aria: { type: String },
  id: { type: String },
  className: { type: String },
  numberOfTabs: { type: Array },
  currentTab: Number,
  borderColor: String,
  hidden: Boolean,
});
const emit = defineEmits(['changeTab']);
const toggleTabs = (tabNumber) => {
  emit('changeTab', tabNumber);
};
</script>
