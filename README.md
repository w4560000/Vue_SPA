# vue_spa

> BX's Vue.js 練習專案

[![Build Status](https://dev.azure.com/a0916364056/BX_Vue/_apis/build/status/w4560000.Vue_SPA?branchName=master)](https://dev.azure.com/a0916364056/BX_Vue/_build/latest?definitionId=11&branchName=master)


## 功能

1. 會員註冊
   * 填寫帳號、密碼、信箱
   * 領取驗證信，輸入驗證碼完成註冊
2. 忘記密碼
   * 填寫註冊時的信箱
   * 領取驗證信，輸入驗證碼完成驗證即可更換新密碼
3. 重寄驗證信
   * 若註冊玩未收到驗證信，可重寄驗證信
4. 會員登入 & FB登入
5. 更換帳號大頭貼存至Azure storage(FB登入者不能更換大頭貼)
6. 會員登入後若未操作系統30分鐘則自動登出(每操作一次系統更新後端Redis的登入時間)