<template>
  <main>
    <div class="mb-14">
      <p class="font-cooper text-brand-black font-normal lg:text-4xl text-2xl">Resume</p>
      <p class="text-brand-black/40 text-base font-normal">Make your resume available to recruiters</p>
    </div>

    <div class="flex justify-center items-center w-full lg:px-32 mb-8" @dragover.prevent @drop.prevent>
      <label
        @drop="uploadFile()"
        for="SelectedFile"
        class="flex flex-col justify-center items-center w-full h-72 rounded-md rounded-tr-[40px] border-4 border-brand-black/10 border-dashed relative"
        :class="[error ? 'bg-[#FEF6F6]' : files.length ? 'bg-[#1EB12D08]' : 'bg-white']"
      >
        <input
          ref="selectedFile"
          type="file"
          accept=".doc,.docx,.pdf"
          class="hidden focus:ring-0 focus:outline-none focus:border-0"
          @change="handleUpload"
        />
        <!-- <div class="w-full absolute h-full rounded rounded-tr-[40px] py-5 bg-brand-light"> -->
        <div v-if="files.length && error" class="flex flex-col justify-center items-center">
          <UploadFailed />
          <div :files="files" :uploadInfo="uploadInfo" class="flex flex-col justify-center items-center">
            <p class="font-medium text-[#E94444] text-xl">Failed to Upload</p>
            <p class="font-normal text-base text-brand-black/70">File too big</p>
          </div>
        </div>
        <div v-else-if="files.length && !error" class="flex flex-col justify-center items-center">
          <UploadSuccess />
          <div :files="files" :uploadInfo="uploadInfo" class="flex flex-col justify-center items-center">
            <p class="font-medium text-brand-black text-xl">Uploading Document</p>
            <p class="font-normal text-base text-brand-black/70">{{ uploadInfo }}</p>
          </div>
        </div>
        <div class="flex flex-col justify-center items-center" v-else>
          <Upload />
          <p class="mb-2 text-xl font-semibold text-brand-black text-center hidden lg:block">
            Drag your documents or photos here to <br />
            start uploading
          </p>
          <p class="text-base text-brand-black/40">PDF, DOC <span class="ml-2">Max File Size: 10MB</span></p>
        </div>
        <!-- </div> -->
      </label>
    </div>
    <div class="flex justify-center items-center mb-10 cursor-pointer" v-if="files.length" @click="clearFile">
      <Trash />
      <p class="font-semibold text-base text-brand-black/40 ml-2">Clear Upload</p>
    </div>
    <div v-else>
      <Button label="Browse Files" :icon="Cloud" color="primary" outline class="mb-10 grow m-auto" @click="uploadFile()" />
      <input ref="selectedFile" type="file" accept=".doc,.docx,.pdf" class="hidden" @change="handleUpload" />
    </div>
  </main>
</template>

<script setup>
import Upload from '@/assets/icons/upload.svg?inline';
import UploadSuccess from '@/assets/icons/uploadSuccess.svg?inline';
import UploadFailed from '@/assets/icons/uploadFailed.svg?inline';
import Trash from '@/assets/icons/trash.svg?inline';
import Button from '@/components/Button.vue';
import { Cloud } from '@/utils/icons';
import { ref, computed } from 'vue';

const files = ref([]);
const selectedFile = ref(null);
const emit = defineEmits(['input']);
const error = ref(false);

const uploadInfo = computed(() => {
  return files.value.length === 1 ? files.value[0].name : `${files.value.length} files selected`;
});

const handleUpload = (e) => {
  files.value = Array.from(e.target.files) || [];
  if (files.value[0].size > 99288) {
    error.value = true;
  }
  console.log(files.value[0]);
  emit('input', files);
};

function uploadFile() {
  selectedFile.value.click();
  handleUpload();
}

function clearFile() {
  files.value = [];
  error.value = false;
}
</script>

<style scoped>
/* Finally we use Tailwind CSS to create our overlayed class */
.overlayed {
  @apply absolute top-0 left-0 right-0 bottom-0 w-full block;
}
</style>
