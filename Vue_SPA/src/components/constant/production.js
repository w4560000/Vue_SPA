import baseConstant from './development'
let constant = baseConstant

// 僅調整與 dev 有差別的部分就好
constant = { ...constant, apiUrl: 'https://bxwebside.azurewebsites.net' }
export default constant
