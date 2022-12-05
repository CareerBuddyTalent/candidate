<template>
  <main>
    <div class="border rounded p-8">
      <div class="flex items-center justify-between md:flex-row flex-col lg:gap-44 gap-10 mb-8">
        <div class="self-start">
          <p class="text-brand-black font-albertSemiBold">Resume/CV</p>
          <p class="font-albert text-sm text-brand-black/70">
            Upload your most up-to-date resume <br />
            File types: PDF, DOCX, PPTX
          </p>
        </div>
        <div class="grow lg:w-1/2" v-if="pageLoaded">
          <div class="mb-4" v-if="details.resume">
            <p class="text-brand-black/70">
              <a :href="details.resume" target="_blank" class="text-brand-primary underline font-albertSemiBold">Preview your resume</a>
              or upload a new one below
            </p>
          </div>
          <div class="w-full mb-8" @dragover.prevent @drop.prevent>
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
                @change="previewResume"
              />
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
                  Upload your documents here to <br />
                  start uploading
                </p>
                <p class="text-base text-brand-black/40">PDF, DOC, DOCX <span class="ml-2">Max File Size: 10MB</span></p>
              </div>
            </label>
          </div>
          <div class="flex justify-center items-center mb-10 cursor-pointer" v-if="files.length" @click="clearFile">
            <Trash />
            <p class="font-semibold text-base text-brand-black/40 ml-2">Clear Upload</p>
          </div>
          <div v-else>
            <Button label="Browse Files" :icon="Cloud" color="primary" outline class="mb-10 grow m-auto" @click="uploadFile()" />
            <input ref="selectedFile" type="file" accept=".doc,.docx,.pdf" class="hidden" @change="previewResume" />
          </div>
        </div>
      </div>
    </div>
    <Button label="Save Changes" color="primary" :loading="loading" :disabled="disabled" @click="updateProfile" class="mt-8 float-right" />
  </main>
</template>

<script setup>
import Upload from '@/assets/icons/upload.svg?inline';
import UploadSuccess from '@/assets/icons/uploadSuccess.svg?inline';
import UploadFailed from '@/assets/icons/uploadFailed.svg?inline';
import Trash from '@/assets/icons/trash.svg?inline';
import Button from '@/components/Button.vue';
import { Cloud } from '@/utils/icons';
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useToast } from 'vue-toastification';

const resumeDetails = ref(null);
const store = useStore();
const toast = useToast();
const files = ref([]);
const selectedFile = ref(null);
const pageLoaded = ref(false);
const emit = defineEmits(['input']);
const error = ref(false);
const details = ref(null);
const file = ref(null);
const loading = ref(false);
const disabled = ref(true);

const uploadInfo = computed(() => {
  return files.value.length === 1 ? files.value[0].name : `${files.value.length} files selected`;
});

const previewResume = (e) => {
  files.value = Array.from(e.target.files) || [];
  if (files.value[0].size > 10000000) {
    error.value = true;
  }
  file.value = e.target.files[0];
  disabled.value = false;
};

function uploadFile() {
  selectedFile.value.click();
  previewResume();
}

function clearFile() {
  files.value = [];
  error.value = false;
  disabled.value = true;
}

onMounted(async () => {
  const user = await store.dispatch('auth/getUser', { forceReload: false });
  details.value = {
    resume: user.candidate?.resume,
  };
  pageLoaded.value = true;
});

const updateProfile = async () => {
  try {
    loading.value = true;
    const data = new FormData();
    if (file.value) {
      data.append('resume', file.value);
    }

    const res = await store.dispatch('auth/updateUserResume', data);
    toast.success(res.message, {
      timeout: 3000,
      hideProgressBar: true,
    });
    const user = await store.dispatch('auth/getUser', { forceReload: true });
    details.value = {
      resume: user.candidate?.resume,
    };
    loading.value = false;
    clearFile();
  } catch (error) {
    if (error.response && error.response.status === 422) {
      console.log(error.response.data.errors);
    }
    toast.error(errorMessage(error), {
      timeout: 3000,
      hideProgressBar: true,
    });
  }
};
</script>

<style scoped>
/* Finally we use Tailwind CSS to create our overlayed class */
.overlayed {
  @apply absolute top-0 left-0 right-0 bottom-0 w-full block;
}
</style>
