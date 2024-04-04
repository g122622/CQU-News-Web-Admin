<template>
    <div class="card content-box">
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>个人信息</span>
                    <el-button class="button" @click="updateUserInfo(userInfo)" text>更新</el-button>
                </div>
            </template>
            <div>
                <UploadImg v-model:image-url="userInfo.avatar" width="135px" height="135px" border-radius="70px" :file-size="3">
                    <template #empty>
                        <el-icon><Avatar /></el-icon>
                        <span>请上传头像</span>
                    </template>
                </UploadImg>
                <div>学号</div>
                <el-input v-model="userInfo.sid" disabled />
                <div>姓名</div>
                <el-input v-model="userInfo.username" disabled />
            </div>
            <div style="text-align: left">
                <el-divider>联系方式</el-divider>
                <div>电话</div>
                <el-input v-model="userInfo.phone" />
                <div>邮件</div>
                <el-input v-model="userInfo.email" />
                <div>QQ</div>
                <el-input v-model="userInfo.qq" />
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts" name="accountManage">
import { useUserStore } from "@/stores/modules/user";
import { editUser } from "@/api/modules/user";
import { ElNotification } from "element-plus";
import UploadImg from "@/components/Upload/Img.vue";

const userStore = useUserStore();

let userInfo = userStore.getUserInfo;

const updateUserInfo = async userInfo => {
    if (!userInfo) return;
    try {
        const { data } = await editUser(userInfo);
        userStore.setUserInfo(data);
        userStore.setToken(data.sid);
        ElNotification({
            title: "OK",
            message: data.username + "更新成功",
            type: "success",
            duration: 3000
        });
    } finally {
        console.log(userInfo);
    }
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
