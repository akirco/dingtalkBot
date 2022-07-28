<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { imgToBase64 } from "@/utils/imgtobase64";
import type { UploadFile, UploadRawFile } from "element-plus";
import Request from "@/api/request";
const request = new Request();

const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const headers = { "Content-Type": "multipart/form-data" };

const images: any = reactive([]);

//选择并预览照片
async function uploadImage(e: Event) {
  const currentTarget = e.target as HTMLInputElement;
  if (currentTarget.files) {
    const files = currentTarget.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      (file as any).index = i;
      await imgToBase64(file).then((res: any) => {
        (file as any).src = res.result;
        images.push(file);
      });
    }
  }
}

function handlePictureCardPreview(file: UploadFile) {
  dialogImageUrl.value = file.url!;
  dialogVisible.value = true;
}

function handleUpload(file: UploadRawFile) {
  request
    .get("/file/upload", file, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => {
      console.log(res);
    });
}
function HandleSuccess(file: UploadFile) {
  console.log("成功了");
}

const onSubmit = (e: Event) => {
  e.preventDefault();
};
</script>

<template>
  <div class="mt-5 md:mt-0 md:col-span-2">
    <form action="#" method="POST" enctype="multipart/form-data">
      <div class="shadow rounded-md sm:overflow-hidden dark:bg-slate-800">
        <div class="px-4 py-5 bg-white space-y-6 sm:p-6 dark:bg-slate-800">
          <div>
            <label class="block text-sm font-medium text-gray-700">
              Picture
            </label>
            <div
              class="border-2 border-gray-300 border-dashed rounded-md px-3 py-3"
            >
              <el-upload
                action="#"
                method="get"
                name="image"
                :headers="headers"
                multiple
                list-type="picture-card"
                :auto-upload="true"
                :on-preview="handlePictureCardPreview"
                :before-upload="handleUpload"
                :on-success="HandleSuccess"
              >
                <div class="space-y-1 text-center">
                  <svg
                    class="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </el-upload>
            </div>
            <el-dialog v-model="dialogVisible">
              <img w-full :src="dialogImageUrl" alt="Preview Image" />
            </el-dialog>
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
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md dark:bg-slate-700 dark:border-gray-800"
              />
            </div>
            <p class="mt-2 text-sm text-gray-500">
              Please input a few lines you want to send.
            </p>
          </div>
        </div>
        <div class="px-4 py-3 bg-gray-50 text-right sm:px-6 dark:bg-slate-800">
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
</template>
