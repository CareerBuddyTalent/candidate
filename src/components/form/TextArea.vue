<template>
  <main>
    <div>
      <label :for="labelFor" class="block mb-3 text-lg font-albert text-brand-black/70">{{ label }}</label>
      <textarea
        :id="id"
        :rows="rows"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="bg-brand-light/10 text-base rounded-[10px] w-full p-4 appearance-none focus:outline-none border border-brand-light focus:border-brand-light focus:border focus:ring-0 peer"
        :placeholder="placeholder"
      ></textarea>
    </div>
  </main>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  label: String,
  id: String,
  rows: Number,
  placeholder: String,
  labelFor: String,
  modelValue: String,
});
</script>
