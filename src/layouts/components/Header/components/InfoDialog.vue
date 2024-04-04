<template>
    <el-dialog v-model="dialogVisible" title="个人信息" width="500px" draggable>
        <template #footer>
            <div style="text-align: center">
                <el-image :src="userInfo.avatar" style="width: 150px; height: 150px; border-radius: 75px"></el-image>
            </div>
            <div style="text-align: left">
                <div>学号</div>
                <el-input v-model="userInfo.sid" disabled />
                <div>姓名</div>
                <el-input v-model="userInfo.username" disabled />
                <el-divider>联系方式</el-divider>
                <div>电话</div>
                <el-input v-model="userInfo.phone" disabled />
                <div>邮件</div>
                <el-input v-model="userInfo.email" disabled />
                <div>QQ</div>
                <el-input v-model="userInfo.qq" disabled />
                <div>职位</div>
                <el-input v-if="userInfo.role === 0" v-model="role_teacher" disabled />
                <el-input v-else-if="userInfo.role === 1" v-model="role_leader" disabled />
                <el-input v-else v-model="role_member" disabled />
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/stores/modules/user";

const role_teacher = `老师`;
const role_leader = `部长`;
const role_member = `部员`;

const userStore = useUserStore();

let userInfo = userStore.getUserInfo;

const dialogVisible = ref(false);
const openDialog = () => {
    dialogVisible.value = true;
};

defineExpose({ openDialog });
</script>
