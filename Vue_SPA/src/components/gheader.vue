<template>
  <head  class="g-header">
    <div class="g-wrap-expand">
        <div class="g-header-top">
            <a class="logo" href="https://google.com" title="Pinkoi - 設計商品購物網站/設計師網路社群"></a>
            <div class="header-search">
               <form id="header-search-form" @submit="checkForm" action="/something" method="post">
                 <input type="search" class="search" name="search" placeholder="免運背包">
                 <input type="submit" class="submit" name="submit" value="搜尋">
                 <div class="trend">
                   <a href="https://google.com">飲料提袋</a>
                   <a href="https://google.com">秋冬裝</a>
                   <a href="https://google.com">500元禮物</a>
                   <a href="https://google.com">Pinkoi市集</a>
                   <a href="https://google.com">免運手機殼</a>
                   <a href="https://google.com">年曆</a>
                 </div>
                 <span class="g-voiceinput"></span>
               </form>
            </div>
            <div class="header-right">
              <div class="relative">
              <a href="https://google.com" class="design">我要開設計館</a>
              <a href="https://google.com" class="login">
                <span class="login-border">登入/註冊</span>
              </a>
              <a href="https://google.com" class="cart">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path class="color" fill="#29242D" d="M20.9929,5.462 C21.1349,5.649 21.1819,5.891 21.1189,6.117 L19.3379,12.554 C19.2479,12.879 18.9519,13.104 18.6149,13.104 L9.3799,13.104 L9.4169,13.21 C9.4659,13.352 9.4729,13.504 9.4349,13.648 L8.9729,15.416 L19.2089,15.416 L19.2089,16.916 L8.0009,16.916 C7.7689,16.916 7.5499,16.809 7.4069,16.625 C7.2659,16.441 7.2169,16.201 7.2749,15.977 L7.9259,13.49 L4.8029,4.604 L2.5839,4.604 L2.5839,3.104 L5.3339,3.104 C5.6519,3.104 5.9359,3.305 6.0419,3.605 L6.5909,5.167 L20.3969,5.167 C20.6309,5.167 20.8519,5.276 20.9929,5.462 Z M18.0449,11.604 L19.4109,6.667 L7.1169,6.667 L8.8529,11.604 L18.0449,11.604 Z M10.375,19.666 C10.375,20.494 9.703,21.166 8.875,21.166 C8.047,21.166 7.375,20.494 7.375,19.666 C7.375,18.838 8.047,18.166 8.875,18.166 C9.703,18.166 10.375,18.838 10.375,19.666 Z M19.209,19.666 C19.209,20.494 18.537,21.166 17.709,21.166 C16.881,21.166 16.209,20.494 16.209,19.666 C16.209,18.838 16.881,18.166 17.709,18.166 C18.537,18.166 19.209,18.838 19.209,19.666 Z">
                </path>
              </svg>
              </a>
              </div>
            </div>
        </div>
    </div>
    <nav class="g-nav">
      <div class="g-wrap-expand">
        <ul class="nav-first">
          <li class="nav-first-li">
            <div class="title-bold-pink">主打活動</div>
            <div class="nav-second-campaign">
              <ul>
                <li>
                  <a href="https://google.com">
                    <span>會員日 | 滿額最高折10%</span>
                    <b class="new-badge">Hot</b>
                  </a>
                </li>
                <li>
                  <a href="https://google.com">
                    <span>即將結束 | 線上免運市集</span>
                    <b class="new-badge">New</b>
                  </a>
                </li>
                <li>
                  <a href="https://google.com">
                  <span>天天抽優惠 | 最大獎滿額折 NT$ 299</span>
                  </a>
                </li>
                <li>
                  <a href="https://google.com">
                  <span>第二種聖誕節 | 免運專區</span>
                  </a>
                </li>
                <li>
                  <a href="https://google.com">
                  <span>第二種聖誕節 | 預算挑禮</span>
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li class="nav-first-li">
            <div class="nav-title2-7">配件飾品</div>
            <div class="nav-second"></div>
          </li>
          <li class="nav-first-li">
            <div class="nav-title2-7">居家生活</div>
            <div class="nav-second"></div>
          </li>
          <li class="nav-first-li">
            <div class="nav-title2-7">包包提袋</div>
            <div class="nav-second"></div>
          </li>
          <li class="nav-first-li">
            <div class="nav-title2-7">衣著良品</div>
            <div class="nav-second"></div>
          </li>
          <li class="nav-first-li">
            <div class="nav-title2-7">文具卡片</div>
            <div class="nav-second"></div>
          </li>
          <li class="nav-first-li">
            <div class="nav-title2-7">所有分類</div>
            <div class="nav-second"></div>
          </li>
          <li class="nav-first-li">
            <div class="nav-title2-7">探索更多</div>
            <div class="nav-second"></div>
          </li>
        </ul>
      </div>
    </nav>
  </head>
</template>

<script>
export default {
  name: 'gheader',
  data () {
    return {}
  }
}
</script>

<style>
@import "../../css/test.css";
</style>
