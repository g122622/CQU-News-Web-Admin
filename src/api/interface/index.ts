// 请求响应参数（不包含data）
export interface Result {
    code: string;
    msg: string;
}

// 请求响应参数（包含data）
export interface ResultData<T = any> extends Result {
    data: T;
}

// 分页响应参数
export interface ResPage<T> {
    records: T[];
    current: number;
    size: number;
    total: number;
}

// 分页请求参数
export interface ReqPage {
    pageNum: number;
    pageSize: number;
}

// 文件上传模块
export namespace Upload {
    export interface ResFileUrl {
        fileUrl: string;
    }
}

// 登录模块
export namespace Login {
    export interface ReqLoginForm {
        sid: string;
        password: string;
    }
    export interface ResLogin {
        sid: string;
    }
    export interface ResAuthButtons {
        [key: string]: string[];
    }
}

// 密码模块
export namespace Password {
    export interface ReqPassForm {
        id: number;
        password: string;
        newPassword: string;
        checkPassword: string;
    }
}

// 用户管理模块
export namespace User {
    export interface ReqUserParams extends ReqPage {
        id: number;
        sid: string;
        username: string;
        avatar: string;
        phone: string;
        email: string;
        qq: string;
        role: number;
        status: number;
    }
    export interface ResUserList {
        id: number;
        sid: string;
        username: string;
        avatar: string;
        qq: string;
        email: string;
        phone: string;
        role: number;
        status: number;
        createTime: string;
    }
    export interface ResStatus {
        state: number;
    }
    export interface ResGender {
        genderLabel: string;
        genderValue: number;
    }
    export interface ResDepartment {
        id: string;
        name: string;
        children?: ResDepartment[];
    }
    export interface ResRole {
        id: string;
        name: string;
        children?: ResDepartment[];
    }
}
