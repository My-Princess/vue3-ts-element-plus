<template>
<!-- 自定义xlsx上传校验 -->
  <el-dialog
    title="上传文件"
    v-model="isShow"
    width="1000px"
    custom-class="importDialog"
  >
    <input
      ref="currentInstance"
      class="excel-upload-input"
      type="file"
      accept=".xlsx, .xls"
      @change="handleClick"
    />
    <div
      class="drop"
      @drop="handleDrop"
      @dragover="handleDragover"
      @dragenter="handleDragover"
    >
      拖拽文件到此
      <el-button
        :loading="loading"
        style="margin-left: 16px"
        size="mini"
        type="primary"
        @click="handleUpload"
      >
        文件选择
      </el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
// import XLSX from "xlsx";
import * as XLSX from "xlsx"; // vue3可用此引入
import { ElMessage } from "element-plus";
import { ref, reactive, getCurrentInstance, defineProps } from "vue";
interface types {
  loading: Boolean;
}

const isShow = ref(true);
const loading = ref(false);

let excelData = reactive({
  header: null,
  results: null,
});

// 父传子
const props = defineProps(["beforeUpload", "handleSuccess"]);

// 使用refs
let currentInstance = ref();

// 文件选择
const handleClick = (e: any) => {
  const files = e.target.files;
  const rawFile = files[0];
  console.log("选择files", rawFile);
  if (!rawFile) return;
  upload(rawFile);
};
// 拖拽
const handleDrop = (e: any) => {
  e.stopPropagation();
  e.preventDefault();
  if (loading.value) return;
  // 拖拽内含一系列文件信息
  const files = e.dataTransfer.files;
  console.log("files", files);
  if (files.length !== 1) {
    ElMessage({
      message: "Only support uploading one file!",
      type: "error",
    });
    return;
  }
  const rawFile = files[0];
  if (!isExcel(rawFile)) {
    ElMessage({
      message: "Only supports upload .xlsx, .xls, .csv suffix files",
      type: "error",
    });
    return false;
  }
  upload(rawFile);
  //   e.stopPropagation();
  //   e.preventDefault();
};
// 拖拽中\拖拽到区域
const handleDragover = (e: any) => {
  console.log("拖拽中\拖拽到区域");
  e.stopPropagation();
  e.preventDefault();
  e.dataTransfer.dropEffect = "copy";
};
// 上传
const handleUpload = () => {
  console.log("上传", currentInstance.value);
  currentInstance.value.click();
};
const upload = (rawFile: Object) => {
  currentInstance.value = null;
  if (!props.beforeUpload) {
    console.log("!beforeUpload");
    readerData(rawFile);
    return;
  }
  const before = props.beforeUpload(rawFile);
  if (before) {
    console.log("--end--");
    readerData(rawFile);
  }
};
const readerData = (rawFile: Object) => {
  loading.value = true;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    // 读取中
    reader.onload = (e) => {
      const data = e.target?.result;
      console.log("data", data);
      // 从电子表格字节中提取数据
      const workbook = XLSX.read(data, { type: "array", cellDates: true });
      console.log("workbook", workbook);
      const sheetList = workbook.SheetNames;

      sheetList.forEach((firstSheetName) => {
        // 生成工作表名称集合
        // let worksheet = workbook.Sheets[name]
        console.log("firstSheetName", firstSheetName);
        if (firstSheetName == "Cognos_Office_Connection_Cache") return false;
        // 只能通过工作表名称来获取指定工作表
        const worksheet = workbook.Sheets[firstSheetName];
        console.log("worksheet", worksheet);

        const header = getHeaderRow(worksheet);
        console.log("header", header);
        const results = XLSX.utils.sheet_to_json(worksheet);
        console.log("results", results);
        generateData({ header, results });
      });

      loading.value = false;

      resolve();
    };
    console.log("------end--------");
    reader.readAsArrayBuffer(rawFile);
  });
};
const getHeaderRow = (sheet) => {
  console.log("开始", sheet);
  const headers = [];
  const range = XLSX.utils.decode_range(sheet["!ref"]);
  console.log("range", range);
  let C;
  const R = range.s.r;
  /* start in the first row */
  for (C = range.s.c; C <= range.e.c; ++C) {
    /* walk every column in the range */
    const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })];
    /* find the cell in the first row */
    let hdr = "UNKNOWN " + C; // <-- replace with your desired default
    if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);
    headers.push(hdr);
  }
  return headers;
};
const generateData = ({ header, results }) => {
  excelData.header = header;
  excelData.results = results;
  //   excelData.loading = loading;
  props.handleSuccess && props.handleSuccess(excelData);
};
const isExcel = (file) => {
  return /\.(xlsx|xls|csv)$/.test(file.name);
};
</script>
<style scoped>
.excel-upload-input {
  display: none;
  z-index: -9999;
}
.drop {
  border: 2px dashed #bbb;
  width: 600px;
  height: 160px;
  line-height: 160px;
  margin: 0 auto;
  font-size: 24px;
  border-radius: 5px;
  text-align: center;
  color: #bbb;
  position: relative;
}
</style>
