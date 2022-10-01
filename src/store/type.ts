// 根类型
export interface IRootState {
  name: string
  age: number
}

// system模块类型
export interface ISystemState {
  userList: any[]
  userCount: number
}
// login模块类型
export interface ILoginState {
  token: string
  userInfo: any
  userMenus: any[]
}

// 模块类型
export interface IRootAndModule {
  login: ILoginState
  system: ISystemState
}
// 外部获取store时，将模块类型和根state类型进行合并
export type IStoreType = IRootState & IRootAndModule
