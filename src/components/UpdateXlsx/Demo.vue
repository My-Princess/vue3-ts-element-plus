<template>
 <Files :before-upload="beforeUpload" :handle-success="handleSuccess" />
</template>

<script lang='ts' setup>
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import * as dayjs from 'dayjs'
import Files from "./index.vue";
let fileData = ref(null);
const exportBtnFag = ref(true);

let importTableData = reactive({
  value:[]
})
let tableData = reactive({
  data: [],
  loading: false,
});

const beforeUpload = (file: any) => {
  const isLt1M = file.size / 1024 / 1024 < 100;
  if (isLt1M) {
    fileData.value = file;
    return true;
  } else {
    ElMessage({
      message: "上传文件太大,不能超过100M",
      type: "warning",
    });
    return false;
  }
};

const handleSuccess = (data) => {
  console.log("成功数据", data);
  importTableData.value = [];
  exportBtnFag.value = true;
  tableData.loading = true;
  const filterVal = [
    "clientMarkName",
    "contactor",
    "contactphone",
    "contactphone2",
    "contactphone3",
    "hdStDate",
    "hdEdDate",
    "substName",
    "branchName",
    "areaName",
    "gridName",
    "connectno",
    "mainCommendName",
    "mainCommendIntro",
    "mainCommendType",
    "scCommendName",
    "scCommendIntro",
    "scCommendType",
    "dsCommendName",
    "dsCommendIntro",
    "dsCommendType",
    "orderHandlerName",
    "isCheckConnectno",
    "remarks",
  ];

  const filterKey = [
    "客户名称",
    "联系人",
    "联系电话",
    "联系电话2",
    "联系电话3",
    "开始时间",
    "结束时间",
    "区县",
    "营服中心",
    "片区",
    "网格单元",
    "接入号(政企、拆机和异网号码非必填)",
    "主推名称",
    "主推推荐简介",
    "主推类型",
    "次推名称",
    "次推推荐简介",
    "次推类型",
    "顺销名称",
    "顺销推荐简介",
    "顺销类型",
    "工单处理人账号",
    "是否校验接入号（必填）",
    "备注",
  ];
  let list = [];
  let dataSlice = [];
    console.log("字段名称",data.header[0])
  if (data.header[0] !== "字段名称") {
    list = formatExcel(filterVal, filterKey, data.results);
    console.log("!字段名称", list);
  } else {
    dataSlice = data.results.slice(1);
    let fag = false;
    let count = 0;
    if (dataSlice.length >= 2) {
      for (let i = 0; i < 2; i++) {
        for (let k = 0; k < filterKey.length; k++) {
          if (
            dataSlice[i][filterKey[k]] !== undefined &&
            dataSlice[i][filterKey[k]] != null
          ) {
            fag = true;
          }
        }
        if (!fag) {
          count++;
        }
      }
      if (count > 0) {
        for (let i = 0; i < count; i++) {
          dataSlice.shift();
        }
      }
    }
    list = formatExcel(filterVal, filterKey, dataSlice);
    console.log("list", list);
  }
  if (list.length < 1) {
    tableData.loading = false;
    importTableData.value = [];
    exportBtnFag.value = true;
    // ElMessage.warning("导入的文件没有数据！");
    ElMessage({
      message: "导入的文件没有数据！",
      type: "warning",
    });
    return;
  } else {
    exportBtnFag.value = false;
  }
  importTableData.value = list;
  for (const index in importTableData.value) {
     importTableData.value[index].hdEdDate = dayjs(
     importTableData.value[index].hdEdDate
    ).format("YYYY-MM-DD");
    importTableData.value[index].hdStDate = dayjs(
    importTableData.value[index].hdStDate
    ).format("YYYY-MM-DD");
  }
  console.log('list1',list);
  // 校验导入数据
  // this.checkImprotInfo(list)
};

const formatExcel = (filterVal, filterKey, jsonData) => {
  let array = [];
  for (const index in jsonData) {
    let i = 0;
    var object = {};
    for (const key in filterKey) {
      object[filterVal[i]] =
        jsonData[index][filterKey[key]] === undefined
          ? ""
          : jsonData[index][filterKey[key]];
      i++;
    }
    array.push(object);
  }
  // console.log(array)
  return array;
};
</script>
<style scoped>
</style>