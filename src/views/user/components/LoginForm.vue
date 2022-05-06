<template>
  <!-- <div class="">登录</div> -->
  <LoginFormTitle />
  <el-form
    class="p-4 enter-x"
    ref="ruleFormRef"
    :model="ruleForm"
    status-icon
    :rules="rules"
  >
    <el-form-item prop="username">
      <el-input
        v-model="ruleForm.username"
        placeholder="账号"
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="ruleForm.password"
        placeholder="密码"
        type="password"
        autocomplete="off"
      />
    </el-form-item>

    <el-row class="mb-4.5">
      <el-col :span="12">
        <el-checkbox v-model="rememberMe" label="记住我" />
      </el-col>
      <el-col :span="12" class="text-right">
        <el-button type="text">忘记密码</el-button>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button
        type="primary"
        class="w-full"
        @click="submitForm(ruleFormRef)"
        :loading="loading"
        >登录</el-button
      >
    </el-form-item>

    <div class="grid lg:grid-cols-3 gap-4 md:grid-cols-1">
      <div>
        <el-button class="w-full">手机登录</el-button>
      </div>
      <div>
        <el-button class="w-full">二维码登录</el-button>
      </div>
      <div>
        <el-button class="w-full">注册</el-button>
      </div>
    </div>

    <el-divider class="enter-x">其他登录方式</el-divider>

    
    <div class="flex justify-evenly enter-x">
      <GithubFilled />
      <WechatFilled />
      <AlipayCircleFilled />
      <GoogleCircleFilled />
      <TwitterCircleFilled />
    </div>
  </el-form>
</template>

<script lang="ts" setup>
import LoginFormTitle from "./LoginFormTitle.vue";
import { reactive, ref } from "vue";
import type { FormInstance } from "element-plus";
  import {
    GithubFilled,
    WechatFilled,
    AlipayCircleFilled,
    GoogleCircleFilled,
    TwitterCircleFilled,
  } from '@ant-design/icons-vue';

const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  username: "",
  password: "",
});
const rememberMe = ref(false);
const loading = ref(false);

const validateUsername = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入账号"));
  } else {
    const regH = "^[0-9a-zA-Z][0-9a-zA-Z_]+[0-9a-zA-Z]$";
    // const regH = "/^[5A-Za-z0-9-\_]+$/"
    let regHg = new RegExp(regH);
    if (!regHg.test(value)) {
      callback(new Error("请输入英文、数字、或者横线"));
    }
    callback();
  }
};
const validatePassWord = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    callback();
  }
};

const rules = reactive({
  username: [{ validator: validateUsername, trigger: "blur" }],
  password: [{ validator: validatePassWord, trigger: "blur" }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log("submit!", ruleForm);
    } else {
      console.log("error submit!");
      return false;
    }
  });
};
</script>
