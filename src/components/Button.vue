<template>
  <component :is="is" :class="[componentClass, btnSize]" :href="href" :type="computedType" :to="to" :target="target" :disabled="disabled">
    <component v-if="icon" :class="[size]" class="fill-current flex-none" :is="icon" />
    <span v-if="!loading" :class="labelClass">{{ label }}</span>
    <div role="status" v-if="loading">
      <svg
        class="inline mr-2 w-8 h-8 text-brand-primary animate-spin fill-white"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span class="sr-only">Loading...</span>
    </div>
  </component>
</template>

<script>
import { getButtonColor } from '@/utils/colors.js';

export default {
  props: {
    size: [String],
    label: {
      type: [String, Number],
      default: null,
    },
    icon: {
      type: Object,
      default: null,
    },
    href: {
      type: String,
      default: null,
    },
    target: {
      type: String,
      default: null,
    },
    to: {
      type: [String, Object],
      default: null,
    },
    type: {
      type: String,
      default: null,
    },
    color: {
      type: [String],
      default: 'white',
    },
    as: {
      type: String,
      default: null,
    },
    small: Boolean,
    outline: Boolean,
    full: Boolean,
    medium: Boolean,
    active: Boolean,
    disabled: Boolean,
    loading: Boolean,
    btnSize: String,
    pointer: Boolean,
  },

  computed: {
    is() {
      if (this.as) {
        return this.as;
      }

      if (this.to) {
        return 'router-link';
      }

      if (this.href) {
        return 'a';
      }

      return 'button';
    },
    computedType() {
      if (this.is === 'button') {
        return this.type ?? 'button';
      }

      return null;
    },
    labelClass() {
      return this.small && this.icon ? 'px-1' : 'px-2';
    },
    componentClass() {
      const base = [
        'flex',
        this.pointer ? 'cursor-none' : 'cursor-pointer',
        'justify-center',
        'items-center',
        'whitespace-nowrap',
        'focus:outline-none',
        'transition-colors',
        'focus:ring-0',
        'duration-150',
        this.active ? 'ring ring-black' : 'focus:ring-0',
        this.small ? 'p-2 rounded-full' : 'p-3 rounded-xl',
        this.outline ? 'border' : 'border-0',
        this.full ? 'w-full' : '',
        this.medium ? 'w-40' : '',
        // this.loading ? this.disabled : '',
        getButtonColor(this.color, this.outline, !this.disabled),
      ];

      if (this.disabled) {
        base.push('cursor-not-allowed', this.outline ? 'opacity-50' : 'opacity-70');
      }

      return base;
    },
  },
};
</script>
