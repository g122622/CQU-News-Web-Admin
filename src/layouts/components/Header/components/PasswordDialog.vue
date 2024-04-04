<template>
    <el-dialog v-model="dialogVisible" title="修改密码" width="500px" draggable>
        <span class="dialog-footer">
            <el-form ref="passFormRef" :model="passForm" :rules="passRules" size="large">
                <el-form-item prop="id"> </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="passForm.password" type="password" placeholder="旧密码" show-password>
                        <template #prefix>
                            <el-icon class="el-input__icon">
                                <lock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="newPassword">
                    <el-input v-model="passForm.newPassword" type="password" placeholder="新密码" show-password>
                        <template #prefix>
                            <el-icon class="el-input__icon">
                                <lock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="checkPassword">
                    <el-input v-model="passForm.checkPassword" type="password" placeholder="确认新密码" show-password>
                        <template #prefix>
                            <el-icon class="el-input__icon">
                                <lock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
            </el-form>
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" :loading="loading" @click="updatePassword(passFormRef)">确认</el-button>
        </span>
    </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { ElForm, ElNotification } from "element-plus";
import { Password } from "@/api/interface";
import { noneUserInfo, useUserStore } from "@/stores/modules/user";
import md5 from "md5";
import { logoutApi, updatePasswordApi } from "@/api/modules/login";
import { LOGIN_URL } from "@/config";
import router from "@/routers";

const userStore = useUserStore();

type FormInstance = InstanceType<typeof ElForm>;
const passFormRef = ref<FormInstance>();

const passRules = reactive({
    password: [{ required: true, message: "请输入密码", trigger: "blur" }],
    newPassword: [{ required: true, message: "请输入新密码", trigger: "blur" }],
    checkPassword: [{ required: true, message: "请输入确认新密码", trigger: "blur" }]
});

const loading = ref(false);

const passForm = reactive<Password.ReqPassForm>({
    id: userStore.getUserInfo.id,
    password: "",
    newPassword: "",
    checkPassword: ""
});

const updatePassword = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate(async valid => {
        if (!valid) return;
        loading.value = true;
        try {
            const result = await updatePasswordApi({
                id: passForm.id,
                password: md5(passForm.password),
                newPassword: md5(passForm.newPassword),
                checkPassword: md5(passForm.checkPassword)
            });
            if (result.data) {
                ElNotification({
                    title: "密码",
                    message: "修改成功",
                    type: "success",
                    duration: 3000
                });
                // 1.执行退出登录接口
                await logoutApi();
                // 2.清除 Token
                userStore.setToken("");
                userStore.setUserInfo(noneUserInfo);
                // 3.重定向到登陆页
                router.replace(LOGIN_URL);
            } else {
                ElNotification({
                    title: "密码",
                    message: "修改失败",
                    type: "error",
                    duration: 3000
                });
            }
        } finally {
            loading.value = false;
        }
    });
};

const dialogVisible = ref(false);

const openDialog = () => {
    dialogVisible.value = true;
};

defineExpose({ openDialog });
</script>
