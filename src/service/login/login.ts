import sclRequest from '../index'
import { IAccount, IDataType, IUserInfo } from '../type'
export function accountLoginRequest(account: IAccount) {
  return sclRequest.post<IDataType<IUserInfo>>({
    url: '/login',
    data: account
  })
}
export function requestUserInfoById(id: number) {
  return sclRequest.get<IDataType>({
    url: `/users/${id}`
  })
}

export function requestUserMenuById(id: number) {
  return sclRequest.get<IDataType>({
    url: `/role/${id}/menu/`
  })
}
