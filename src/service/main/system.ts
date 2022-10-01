import sclRequest from '../index'
import { IDataType } from '../type'
export function getPageListData(url: string, queryInfo: any) {
  return sclRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}
