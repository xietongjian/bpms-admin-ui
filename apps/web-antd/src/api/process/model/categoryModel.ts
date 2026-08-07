export interface LoginParams {
  username: string;
  password: string;
}

export interface GetUserInfoByUserIdParams {
  userId: string | number;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

export interface LoginResultModel {
  userId: string | number;
  token: string;
  role: RoleInfo;
}

export interface GetUserInfoByUserIdModel {
  roles: RoleInfo[];
  userId: string | number;
  username: string;
  realName: string;
  desc?: string;
}
