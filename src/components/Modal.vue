<template>
  <main class="antialiased z-50 fixed inset-0 font-GTWalsheimPro overflow-x-hidden">
    <div class="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
      <div class="w-full h-full fixed inset-0 bg-brand-black bg-opacity-60"></div>
      <div class="inset-x-0 -bottom-7 z-50 md:relative fixed w-full max-h-[520px] h-screen overflow-y-scroll" :class="[appliedSize]">
        <div class="lg:px-5 px-3 py-10 w-full bg-white md:rounded rounded-b-none rounded-xl relative">
          <div class="top-0 sticky z-50 bg-white mb-8"><slot name="header" /></div>
          <div class="mb-6"><slot name="body" /></div>
          <div><slot name="footer" /></div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
const props = defineProps({
  size: { type: String },
});
const sizes = {
  xs: 'md:max-w-xs',
  sm: 'md:max-w-sm',
  md: 'md:max-w-md',
  lg: 'md:max-w-lg',
  xl: 'md:max-w-xl',
  '3xl': 'md:max-w-3xl',
};
let appliedSize = sizes[props.size] || sizes.md;
</script>
