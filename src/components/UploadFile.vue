<script setup lang="ts">
import { ref } from "vue";
import type { UploadFile, UploadUserFile,UploadInstance } from "element-plus";
import Request from "@/api/request";
const request = new Request();
let imageList: UploadUserFile[] = [];

const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const uploadRef = ref<UploadInstance>()


function handlePictureCardPreview(file: UploadFile) {
  dialogImageUrl.value = file.url!;
  dialogVisible.value = true;
}
function handleSelect(_list: UploadUserFile) {
  imageList.push(_list);
}

async function handleUpload() {
  uploadRef.value!.submit()
  // if (imageList.length === 0) {
  //   ElMessage.warning("请选择文件！");
  //   return;
  // }
  // for (const img of imageList) {
  //   let pattern = /image\/.*/g;
  //   if (pattern.test(img.raw?.type as string)) {
  //     const result = await request.get("/file/upload", {}, img.raw);
  //     console.log(result);
  //   }
  // }
  // console.log(imageList);
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
    <form action="#" method="POST">
      <div class="shadow rounded-md sm:overflow-hidden dark:bg-slate-800">
        <div class="px-4 py-5 bg-white space-y-6 sm:p-6 dark:bg-slate-800">
          <div>
            <label class="block text-sm font-medium text-gray-700">
              Picture
            </label>
            <div
              class="border-2 border-gray-300 border-dashed rounded-md px-3 py-3"
            >
              <el-form>
                <el-form-item>
                  <el-upload
                    action="http://localhost:4000/api/file/upload"
                    name="file"
                    method="get"
                    multiple
                    ref="uploadRef"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-success="HandleSuccess"
                    :on-change="handleSelect"
                    :file-list="imageList"
                    :auto-upload="false"
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
                      <p class="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </el-upload>
                </el-form-item>
                <el-form-item
                  class="px-4 py-3 bg-gray-50 text-right sm:px-6 dark:bg-slate-800"
                >
                  <el-button type="primary" @click="handleUpload"
                    >上传</el-button
                  >
                </el-form-item>
              </el-form>
              <el-dialog v-model="dialogVisible">
                <img w-full :src="dialogImageUrl" alt="Preview Image" />
              </el-dialog>
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
