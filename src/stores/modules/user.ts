import { defineStore } from "pinia";
import { UserState } from "@/stores/interface";
import piniaPersistConfig from "@/config/piniaPersist";
import { isNullOrUnDef } from "@/utils/is";

export const noneUserInfo = {
    id: -1,
    sid: "",
    username: "",
    avatar: "",
    phone: "",
    email: "",
    qq: "",
    role: -1,
    state: -1
};

export const useUserStore = defineStore({
    id: "cqunews-user",
    state: (): UserState => ({
        token: "",
        userInfo: noneUserInfo
    }),
    getters: {
        getUserInfo() {
            return this.userInfo;
        }
    },
    actions: {
        // Set Token
        setToken(token: string) {
            this.token = token;
        },
        // Set setUserInfo
        setUserInfo(userInfo: UserState["userInfo"]) {
            if (isNullOrUnDef(userInfo)) this.userInfo = noneUserInfo;
            this.userInfo = userInfo;
        }
    },
    persist: piniaPersistConfig("cqunews-user")
});
