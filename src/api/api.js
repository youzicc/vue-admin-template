import { post, get } from './axios'
export function LoadNavigationBar () {
  return get('')//url
}
export function postLogin (param) {
  return post('', param)
}
//#region  button enum
const buttonEnum = {
  add: 'add',
  edit: 'edit',
  delete: 'delete',
  setbuttonpower: 'setbuttonpower',
  setpower: 'setpower',
  search: 'search',
  import: 'import',
  operationlog: 'operationlog',
  frozen: 'frozen',
  thaw: 'thaw'

}
export default buttonEnum
//#endregion
