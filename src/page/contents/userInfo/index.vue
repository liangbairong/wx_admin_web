<template>
  <div>
    <el-row>
      <el-col :span="4">
        <el-upload
          class="avatar-uploader"
          :action="updateurl"
          :headers="header"
          :show-file-list="false"
          :on-success="handleSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-col>
      <el-col :span="6">
        <el-form ref="form" :model="form" label-width="80px" label-position="right">
          <el-form-item label="名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">修改</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import server from "./server";
export default {
  name: "userInfo",
  data() {
    return {
      updateurl: process.env.VUE_APP_ROOT + "/common/upload/head",
      header: {
        authorization: this.$myLocalStorage.get("token")
      },
      form: {
        name: "",
        imageUrl: ""
      },
      ws: null
    };
  },
  components: {},
  computed: {
    ...mapState("common", {
      userInfo: state => state.userInfo
    })
  },
  watch: {
    userInfo: {
      handler(newVal) {
        this.init();
      },
      deep: true,
      immediate: false
    }
  },
  created() {
    this.init();
    this.ws = new WebSocket("ws://127.0.0.1:3002");
    // 接收
    this.ws.onmessage = function(mes) {
      console.log(mes.data);
    };
  },
  beforeDestroy() {
    this.ws.close();
  },
  methods: {
    ...mapActions("common", {
      getUserInfo: "getUserInfo"
    }),
    init() {
      this.form.name = this.userInfo.name;
      this.form.imageUrl = this.userInfo.headImg;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleSuccess(res, file) {
      this.form.imageUrl = URL.createObjectURL(file.raw);
      this.getUserInfo();
    },
    onSubmit() {
      this.$api.user.updateUserInfo({
        name:this.form.name
      }).then(res => {
        if(res.code===200){
          this.$message.success("修改成功");
          this.getUserInfo();
        }
      });
      // 发送
      console.log("Sd");
      this.ws.send(this.form.name);
    }
  }
};
</script>
<style lang="scss" >
.avatar-uploader {
  width: 178px;
  .el-upload--text {
    width: 100% !important;
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>