<script setup lang="ts">
import { ref } from "vue";
import type {
  UploadFile,
  UploadUserFile,
  UploadInstance,
  UploadFiles,
  UploadRequestOptions,
} from "element-plus";
import Request from "@/api/request";
import { useJobsStore } from "@/stores/jobsInfo";
const jobStore = useJobsStore();
const { jobsInfo } = storeToRefs(jobStore);
const request = new Request();
let fd: FormData = new FormData();

const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const uploadRef = ref<UploadInstance>();

function handlePreview(file: UploadFile) {
  dialogImageUrl.value = file.url!;
  dialogVisible.value = true;
}

async function handleUpload(params: UploadRequestOptions) {
  const { file } = params;
  if (file) {
    await fd.append("image", file);
  }
}
function HandleSuccess(file: UploadFile) {
  fd.delete("image");
}
function handleRemove(file: UploadFile, files: UploadFiles) {
  fd.delete("image");
}
function handleExceed(files: File[], fileList: UploadUserFile[]) {
  ElMessage.warning(
    `当前限制选择 10 个文件，本次选择了 ${files.length} 个文件`
  );
}

function saveSubmit(e: Event) {
  e.preventDefault();
  const token = localStorage.getItem("token");
  const uid = localStorage.getItem("uid");
  jobsInfo.value.uid = uid;
  if (token) {
    jobStore.insertJobs(jobsInfo.value);
  } else {
    ElMessage.warning("请登陆后在进行操作！");
  }
}

function submitUpload() {
  const token = localStorage.getItem("token");
  if (!token) {
    ElMessage.warning("请登陆后在进行操作！");
  }
  uploadRef.value!.submit();
  request.post("/file/upload", fd).then((res) => {
    if (res.data.length !== 0) {
      ElMessage.success("上传成功！");
    }
    if (res.data[0]) {
      jobsInfo.value.img1 = res.data[0].filename;
    }
    if (res.data[1]) {
      jobsInfo.value.img2 = res.data[1].filename;
    }
    if (res.data[2]) {
      jobsInfo.value.img3 = res.data[2].filename;
    }
  });
}

function clearFiles() {
  uploadRef.value?.clearFiles();
}
</script>

<template>
  <div class="mt-5 md:mt-0 md:col-span-2">
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
              multiple
              name="image"
              method="post"
              ref="uploadRef"
              :limit="10"
              :http-request="handleUpload"
              list-type="picture-card"
              :on-preview="handlePreview"
              :on-success="HandleSuccess"
              :on-remove="handleRemove"
              :on-exceed="handleExceed"
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
                <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </el-upload>
            <div
              class="px-4 py-3 bg-gray-50 text-right mt-2 sm:px-6 dark:bg-slate-800 space-x-3"
            >
              <button
                type="submit"
                class="btn btn-sm btn-outline btn-info"
                @click="submitUpload"
              >
                上传
              </button>
              <button
                class="btn btn-sm btn-outline btn-info"
                type="submit"
                @click="clearFiles"
              >
                清空
              </button>
            </div>
          </div>
        </div>
        <div>
          <div class="mt-1">
            <label class="block text-sm font-medium text-gray-700">
              Message1
            </label>
            <textarea
              v-model="jobsInfo.txt1"
              rows="3"
              class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md dark:bg-slate-700 dark:border-gray-800"
            />
            <label class="block text-sm font-medium text-gray-700">
              Message2
            </label>
            <textarea
              v-model="jobsInfo.txt2"
              rows="3"
              class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md dark:bg-slate-700 dark:border-gray-800"
            />
            <label class="block text-sm font-medium text-gray-700">
              Remark
            </label>
            <input
              v-model="jobsInfo.remark"
              type="text"
              class="border-gray-200 border-2 rounded-lg py-2 px-8 dark:bg-slate-600"
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
          @click="saveSubmit"
        >
          Save
        </button>
      </div>
    </div>
    <el-dialog v-model="dialogVisible">
      <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </div>
</template>
