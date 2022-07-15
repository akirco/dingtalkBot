<script setup lang="ts">
import DialogPanel from './DialogPanel.vue';
import { useModalStore } from '@/stores/modal';
import { ref, type Ref } from 'vue';
import service from '@/api/http';

const modal = useModalStore();
const openModal = modal.openModal;

const imgsrc1 = ref();
const imgsrc2 = ref();
const msg = ref();
const createImgPreview = (file: Blob) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (e) => {
    imgsrc1.value = e.target?.result;
    imgsrc2.value = e.target?.result;
  };
};
//preview image with imgsrc and upload to server

const uploadImage = (e: Event) => {
  const currentTarget = e.target as HTMLInputElement;
  if (currentTarget.files) {
    const files = currentTarget.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      console.log(file);

      createImgPreview(file);
    }
  }
};

const data = { img1: imgsrc1, img2: imgsrc2, msg: msg };
console.log(data);

const onSubmit = (e: Event) => {
  e.preventDefault();
  service.post('/api/v1/insert', data).then((res) => {
    // openModal();
    console.log(res);
  });
};
</script>

<template>
  <DialogPanel />
  <div>
    <div class="mt-5 md:mt-0 md:col-span-2">
      <form action="#" method="POST" enctype="multipart/form-data">
        <div class="shadow sm:rounded-md sm:overflow-hidden">
          <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
            <div>
              <label class="block text-sm font-medium text-gray-700">
                Picture
              </label>
              <div
                class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
              >
                <div class="space-y-1 text-center">
                  <svg
                    class="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                    v-if="!imgsrc1"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <div class="flex">
                    <img
                      v-if="imgsrc1"
                      :src="imgsrc1"
                      alt="preview"
                      style="width: 200px; height: 200px; display: block"
                    />
                    <img
                      v-if="imgsrc2"
                      :src="imgsrc2"
                      alt="preview"
                      style="width: 200px; height: 200px; display: block"
                    />
                  </div>
                  <div class="text-sm text-gray-600">
                    <label
                      for="file-upload"
                      class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        class="sr-only"
                        accept="image/*"
                        multiple
                        @change="uploadImage($event)"
                      />
                    </label>
                  </div>
                  <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
            <div>
              <label for="msg" class="block text-sm font-medium text-gray-700">
                Message
              </label>
              <div class="mt-1">
                <textarea
                  id="msg"
                  name="msg"
                  rows="3"
                  :value="msg"
                  class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                />
              </div>
              <p class="mt-2 text-sm text-gray-500">
                Please input a few lines you want to send.
              </p>
            </div>
          </div>
          <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="submit"
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              @click="onSubmit"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
