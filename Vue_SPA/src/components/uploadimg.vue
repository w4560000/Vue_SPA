<template>
  <div class="outer-box">
    <div class="box">
      <input
        id="upload"
        :type="inputtype"
        @change="handleFileChange"
        @click="changeimage"
        ref="inputer"
      >
      <label id="uploadlabel" for="upload">大頭照上傳</label>
      <label v-if="IsUpload" id="text">預覽</label>
      <img v-if="IsUpload" id="uploadview" :src="dataUrl">
      <label v-if="IsUpload" id="type">{{type}}</label>
      <input v-if="IsUpload" type="submit" id="uploadsubmit" @click="submitimage" value="確定上傳">
    </div>
    <Uploadmodal
      v-if="ShowUploadMessage"
      @close="ShowUploadMessage = false"
      :Response_Message_s="UploadResponse_Message"
      :showvalidation_message="Uploadshowvalidation_message"
      :Button_Message="UploadButton_Message"
      v-on:forget_hiddenMessage="on_hiddenMessage"
    ></Uploadmodal>

    <Uploadalert
      v-if="Is_Upload_success"
      :API_Response_Message="UploadResponse_Message"
    ></Uploadalert>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Upload_Success_Alert from './login_Signin_Signup_Alert';
import Upload_Error_Message from './login_Signup_Message';
import { debug } from 'util';

export default {
  name: 'uploadimg',
  components: {
    Uploadmodal: Upload_Error_Message,
    Uploadalert: Upload_Success_Alert
  },
  data () {
    return {
      // 轉成base64字串的Url
      dataUrl: '',
      // 確認是否點擊大頭照上傳
      IsUpload: false,

      //
      type: '',

      // 大頭照上傳的input，因若一開始為file，則fb使用者點擊時，就算alert出錯誤視窗，還是會叫他選檔案，改為判斷是否為fb使用者後再設定input type
      inputtype: '',
      Is_Upload_success: false,

      ShowUploadMessage: false,
      Uploadshowvalidation_message: false,
      UploadButton_Message: '',
      UploadResponse_Message: ''
    };
  },
  methods: {
    imgPreview (file) {
      let _this = this;
      // 看支持不支持FileReader
      if (!file || !window.FileReader) return;

      if (/^image/.test(file.type)) {
        _this.type = file.type + '檔';
        // 创建一个reader
        let reader = new FileReader();
        // 将图片将转成 base64 格式
        reader.readAsDataURL(file);
        // 读取成功后的回调
        reader.onloadend = function () {
          _this.dataUrl = this.result;
          _this.IsUpload = true;
        };
      }
    },

    changeimage: function () {
      if (this.FBauthorized == true) {
        this.UploadResponse_Message = '使用FB登入無法更改大頭照！';
        this.Is_Upload_success = true;
        this.inputtype = 'text';
        this.$refs.inputer.type = 'text';
      } else {
        this.inputtype = 'file';

        // 控制dom type，防止彈出select file window
        this.$refs.inputer.type = 'file';
        this.$refs.inputer.click();
      }
    },
    handleFileChange (e) {
      if (this.FBauthorized == false) {
        let inputDOM = this.$refs.inputer;

        // 抓取檔案
        this.file =
          inputDOM.files[0] == undefined
            ? e.path[0].files[0]
            : inputDOM.files[0];
        this.errText = '';

        let size = Math.floor(this.file.size / 1024);
        if (size > 1000) {
          // 这里可以加个文件大小控制
          return false;
        }

        // 触发这个组件对象的input事件
        this.$emit('input', this.file);

        // 这里就可以获取到文件的名字了
        this.fileName = this.file.name;

        // 这里加个回调也是可以的
        this.onChange && this.onChange(this.file, inputDOM.value);

        this.imgPreview(this.file);
      }
    },
    on_hiddenMessage: function (bool) {
      this.ShowUploadMessage = bool;
    },
    submitimage: function () {
      var _this = this;
      this.api.UpLoadImage(
        {
          Account: _this.Login_User,
          base64data: _this.dataUrl
        })
        .then(response => {
          _this.UploadResponse_Message = _this.global.GetResponseMessage(response);
          if (response.data.responseStatusCode === _this.responseStatusCode.accountImageTypeError.statusCode ||
          response.data.responseStatusCode === _this.responseStatusCode.upLoadAccountImageFail.statusCode) {
            _this.ShowUploadMessage = true;
            _this.UploadButton_Message = '確認';
          } else {
            _this.Is_Upload_success = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    ...mapGetters(['Login_User']),
    ...mapGetters(['Token']),
    ...mapGetters(['FBauthorized'])
  }
};
</script>

<style scope>
.outer-box {
  position: absolute;
  width: 100%;
  height: 400px;
}
.box {
  position: relative;
  left: 50%;
  transform: translate(-50%, 0%);
  display: block;
  width: 100px;
  height: 50px;
  border: 2px black solid;
}
#upload {
  position: absolute;
  left: -9999px;
}

#uploadlabel {
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  text-align: center;
  line-height: 50px;
  cursor: pointer;
}

#text {
  display: block;
  margin-top: 70px;
}
#type {
  position: relative;
  display: block;
  left: 50%;
  transform: translate(-50%, 0%);
  width: 200px;
  margin-top: 20px;
}
#uploadview {
  display: block;
  margin-top: 10px;
  width: 300px;
  height: 300px;
  border: 1px pink solid;
  transform: translate(-30%);
}
#uploadsubmit {
  margin-top: 50px;
}

</style>
