const responseStatusCodeEnum = {
  // 帳號驗證碼驗證成功
  validateSuccess: {
    statusCode: '001',
    message: '驗證成功！'},

  // 帳號註冊成功
  signupSuccess: {
    statusCode: '002',
    message: '註冊成功！'},
  // 帳號登入成功
  signinSuccess: {
    statusCode: '003',
    message: '登入成功！'},
  // 帳號登出成功
  signOutSucces: {
    statusCode: '004',
    message: '登出成功！'},

  // 帳號重設密碼成功
  reSetPassWordSuccess: {
    statusCode: '005',
    message: '重設密碼成功！'},

  // 帳號驗證信重寄成功
  reSetPassWordVerificationCode: {
    statusCode: '006',
    message: '請輸入驗證碼後重設密碼。'},

  // 帳號登入失敗
  signinFail: {
    statusCode: '011',
    message: '登入失敗！請確認帳號密碼是否正確！'},

  // 帳號登入失敗 信箱未認證
  emailUnAuthentication: {
    statusCode: '012',
    message: '登入失敗！信箱未認證！'},

  // 帳號註冊失敗 該帳號名稱已被使用！
  accountNameUsed: {
    statusCode: '021',
    message: '該帳號名稱已被使用！'},

  // 帳號註冊失敗 帳號名稱不能為空
  accountNameIsNull: {
    statusCode: '022',
    message: '帳號名稱不能為空！'},

  // 帳號註冊失敗 該信箱已被使用
  emailUsed: {
    statusCode: '023',
    message: '"該信箱已被使用！'},

  // 重寄驗證信失敗 帳號信箱錯誤
  accountNameEmailNotExist: {
    statusCode: '031',
    message: '帳號或信箱輸入錯誤！'},

  // 重寄驗證信失敗 帳號驗證碼驗證失敗
  validateFail: {
    statusCode: '032',
    message: '驗證失敗！請確認驗證碼是否輸入正確！'},

  // 資料庫新增失敗
  InsertError: {
    statusCode: '100',
    message: '新增失敗！'},

  // 資料庫更新失敗
  updateError: {
    statusCode: '100',
    message: '更新失敗！'}
};

export default responseStatusCodeEnum;
