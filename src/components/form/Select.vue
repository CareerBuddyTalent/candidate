<template>
  <main>
    <div>
      <label :for="labelFor" class="block mb-3 text-lg font-albert text-brand-black/70">{{ label }}</label>
      <select
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :id="id"
        class="bg-brand-light/10 text-base rounded-[10px] text-brand-black block p-3 w-full appearance-none focus:outline-none border border-brand-light focus:border-brand-light focus:border focus:ring-0"
      >
        <option disabled value="" selected>Please Select One</option>
        <option v-for="item in options" :key="item.key" :value="item.key">{{ item.value }}</option>
      </select>
    </div>
  </main>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  label: String,
  id: String,
  selectedValue: String,
  options: Array,
  labelFor: String,
  modelValue: String,
});
</script>
