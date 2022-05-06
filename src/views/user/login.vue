<template>
  <div class="vtvp-login relative w-full h-full px-4">
    <div class="container relative h-full py-2 mx-auto sm:px-10">
      <div class="flex h-full">
        <!-- 左 -->
        <div class="hidden min-h-full pl-4 mr-4 xl:flex xl:flex-col xl:w-6/12">
          <AppLogo />
          <div class="my-auto">
            <img
              alt=""
              src="@/assets/svg/login-box-bg.svg"
              class="w-1/2 -mt-16 -enter-x"
            />
            <div class="mt-10 font-medium text-white -enter-x">
              <span class="inline-block mt-4 text-3xl">后台管理系统</span>
            </div>
            <div
              class="mt-5 font-normal text-white text-md dark:text-gray-500 -enter-x"
            >
              输入您的个人详细信息开始使用！
            </div>
          </div>
        </div>
        <!-- 右 -->
        <div class="flex w-full h-full py-5 xl:h-auto xl:py-0 xl:w-6/12">
          <div class="vtvp-login-form relative w-full px-5 py-8 mx-auto my-auto my-auto rounded-md shadow-md xl:ml-16 xl:bg-transparent sm:px-8 xl:p-4 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-auto enter-x">
            <LoginForm />
          </div>
          <Files :before-upload="beforeUpload" :on-success="handleSuccess"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import AppLogo from "@/components/AppLogo/AppLogo.vue";
import LoginForm from "./components/LoginForm.vue";
import Files from "./components/file.vue";
let fileData = ref(null);

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
}

const handleSuccess = (data)=> {
      this.importTableData = []
      this.exportBtnFag = true
      this.tableData.loading = true
      const filterVal = [
        'clientMarkName',
        'contactor',
        'contactphone',
        'contactphone2',
        'contactphone3',
        'hdStDate',
        'hdEdDate',
        'substName',
        'branchName',
        'areaName',
        'gridName',
        'connectno',
        'mainCommendName',
        'mainCommendIntro',
        'mainCommendType',
        'scCommendName',
        'scCommendIntro',
        'scCommendType',
        'dsCommendName',
        'dsCommendIntro',
        'dsCommendType',
        'orderHandlerName',
        'isCheckConnectno',
        'remarks'
      ]

      const filterKey = [
        '客户名称',
        '联系人',
        '联系电话',
        '联系电话2',
        '联系电话3',
        '开始时间',
        '结束时间',
        '区县',
        '营服中心',
        '片区',
        '网格单元',
        '接入号(政企、拆机和异网号码非必填)',
        '主推名称',
        '主推推荐简介',
        '主推类型',
        '次推名称',
        '次推推荐简介',
        '次推类型',
        '顺销名称',
        '顺销推荐简介',
        '顺销类型',
        '工单处理人账号',
        '是否校验接入号（必填）',
        '备注'
      ]
      var list = []
      var dataSlice = []
      if (data.header[0] !== '字段名称') {
        list = this.formatExcel(filterVal, filterKey, data.results)
      } else {
        dataSlice = data.results.slice(1)
        let fag = false
        let count = 0
        if (dataSlice.length >= 2) {
          for (let i = 0; i < 2; i++) {
            for (let k = 0; k < filterKey.length; k++) {
              if (
                dataSlice[i][filterKey[k]] !== undefined &&
                dataSlice[i][filterKey[k]] != null
              ) {
                fag = true
              }
            }
            if (!fag) {
              count++
            }
          }
          if (count > 0) {
            for (let i = 0; i < count; i++) {
              dataSlice.shift()
            }
          }
        }
        debugger
        list = this.formatExcel(filterVal, filterKey, dataSlice)

        console.log(list)
      }
      if (list.length < 1) {
        this.tableData.loading = false
        this.exportBtnFag = true
        this.importTableData = []
        this.$message.warning('导入的文件没有数据！')
        return
      } else {
        this.exportBtnFag = false
      }
      this.importTableData = list
      for (const index in this.importTableData) {
        this.importTableData[index].hdEdDate = moment(this.importTableData[index].hdEdDate).format('YYYY-MM-DD')
        this.importTableData[index].hdStDate = moment(this.importTableData[index].hdStDate).format('YYYY-MM-DD')
      }
      console.log(list)
      // 校验导入数据
      this.checkImprotInfo(list)
}
</script>
<style lang="less">
@prefix-cls: ~"@{namespace}-login";
@logo-prefix-cls: ~"@{namespace}-app-logo";

.@{prefix-cls} {
  min-height: 100%;
  overflow: hidden;

  @media (max-width: @screen-xl) {
    background-color: #293146;

    .@{prefix-cls}-form {
      background-color: #fff;
    }
  }

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin-left: -48%;
    background-image: url("@/assets/svg/login-bg.svg");
    background-position: 100%;
    background-repeat: no-repeat;
    background-size: auto 100%;
    content: "";

    @media (max-width: @screen-xl) {
      display: none;
    }
  }
  .container {
    .@{logo-prefix-cls} {
      position: absolute;
      top: 12px;
      height: 30px;

      &_title {
        font-size: 16px;
        color: #fff;
      }

      img {
        width: 32px;
      }
    }
  }
}
</style>
