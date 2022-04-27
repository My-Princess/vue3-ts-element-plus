<template>
    <div class="vtvp-login relative w-full h-full px-4">
        <div class="container relative h-full py-2 mx-auto sm:px-10">
            <div class="flex h-full">
                <!-- 左 -->
                <div class="min-h-full pl-4 mr-4 xl:flex xl:flex-col xl:w-6/12">
                    <AppLogo />
                    <div class="my-auto">
                        <img :alt="title" src="@/assets/svg/login-box-bg.svg" class="w-1/2 -mt-16 -enter-x" />
                        <div class="mt-10 font-medium text-white -enter-x">
                            <span class="inline-block mt-4 text-3xl">后台管理系统</span>
                        </div>
                        <div class="mt-5 font-normal text-white text-md dark:text-gray-500 -enter-x">
                            输入您的个人详细信息开始使用！
                        </div>
                    </div>
                </div>
                <!-- 右 -->
                <div class="flex w-full h-full py-5 xl:h-auto xl:py-0 xl:w-6/12">
                    <LoginForm />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import AppLogo from "@/components/AppLogo/AppLogo.vue";
import LoginForm from "./components/LoginForm.vue";
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
</style>
