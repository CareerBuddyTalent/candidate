<template>
  <main>
    <div>
      <label :for="labelFor" class="block text-lg font-albert text-brand-black/70" :class="[msg ? 'mb-0' : 'mb-3']">{{ label }}</label>
      <p class="text-xs font-noraml text-brand-black/40">{{ msg }}</p>
      <div class="flex">
        <span
          v-if="side"
          class="inline-flex items-center px-5 py-2 text-base text-white bg-[#172A49] rounded-l-md border rounded border-r-0 border-gray-300"
        >
          $
        </span>
        <input
          :type="type"
          :id="id"
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          class="bg-brand-light/10 text-base rounded-[10px] w-full p-4 appearance-none focus:outline-none border border-brand-light focus:border-brand-light focus:border focus:ring-0"
          :placeholder="placeholder"
        />
      </div>
    </div>
  </main>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  label: String,
  id: String,
  type: String,
  placeholder: String,
  labelFor: String,
  modelValue: String,
  msg: String,
  side: Boolean,
});
</script>
