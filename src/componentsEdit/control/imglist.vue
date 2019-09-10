<template>
  <div class="imgslist" v-if="dataInfo !== null">
    <span style="width:100%;text-align:center;display:block">{{imgs.label}}</span>
    <div class="item">
      <el-upload
        class="upload-demo"
        action="/api/globalmedia/upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
      >
        <img
          v-if="fileList2"
          :src="'http://'+$store.getters.ImgServer+'/'+fileList2"
          class="avatar"
        />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
  </div>
</template>
<script>
export default {
  name: "imglist",
  props: {
    dataInfo: {
      type: Object,
      default: null
    }
  },
  props: ["dataInfo", "data", "settings", "id"],
  mounted() {
    this.setData();
  },
  data() {
    return {
      imgs: this.dataInfo,
      fileList2: ""
    };
  },
  methods: {
    setData() {
      let settings = this.$store.getters.pagesettings;
      if (this.data == "") {
      } else {
        if (this.settings == "settings") {
          this.fileList2 =
            settings.sections[this.data.id][this.settings][this.value.id];
          debugger;
        } else if (this.settings == "blocks") {
          let arr =
            settings.sections[this.id.id][this.settings][this.data.id].settings[
              this.imgs.id
            ];
          this.fileList2 = arr;
        }
      }
    },
    handleAvatarSuccess(response) {
      this.fileList2 = response.data.media_url;
      let settings = this.$store.getters.pagesettings;
      let arr = this.$store.getters.startedit;
      let obj = this.deepClone(settings);
      arr.push({ data: obj, name: this.data.id });
      this.$store.dispatch("savestartdata", arr);
      let num = this.$store.getters.Num;
      this.$store.dispatch("Num", ++num);

      settings.sections[this.id.id][this.settings][this.data.id].settings[
        this.imgs.id
      ] = this.fileList2;
      this.$store.dispatch("savepagesettings", settings);
      this.$emit("openajsx", this.id.id);
    }
  }
};
</script>
<style lang="less" scoped>
.imgslist {
  width: 100%;
  margin-top: 5px;
  .item {
    background-color: #f4f6f8;
    border: 1px solid rgba(195, 207, 216, 0.3);
    margin-top: 5px;
    margin-bottom: 5px;
  }
  /deep/ .el-upload {
    width: 100%;
    height: 100%;
    overflow: hidden;
    height: 200px;
  }
  /deep/ .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  /deep/.avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  /deep/ .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100%;
    height: 100%;
    line-height: 178px;
    text-align: center;
  }
  /deep/.avatar {
    width: 100%;
    display: block;
  }
}
</style>


