<template>
  <div class="CompanyInformation" :class="itemColorFun">
    <div class="edit_product">
      <div class="tit">编辑个人信息</div>
      <div class="input">
        <span>
          <b class="warning"></b> 博客名称
        </span>
        <el-input class="editInput" placeholder="请输入内容" v-model="company_info.blog_name"></el-input>
      </div>
      <div class="input">
        <span>
          <b class="warning"></b>头像
        </span>
        <el-upload
          class="avatar-uploader"
          action="/api/globalmedia/upload"
          :data="{'folder_type':'1'}"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img
            v-if="company_info.blogger_head"
            :src="company_info.blogger_head_info.media_url_http"
            class="avatar"
          />
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>

      <div class="editinputall">
        <div class="rows">
          <div class="rows_three">
            <inputedit ref="tel" tit="昵称" place="请输入你的昵称" :data="company_info.blogger_name"></inputedit>
          </div>
          <div class="rows_three">
            <inputedit ref="emi" tit="E-Mail" place="请输入你的邮箱" :data="company_info.blogger_qq"></inputedit>
          </div>
          <div class="rows_three">
            <inputedit ref="qq" tit="QQ" place="请输入你的邮箱" :data="company_info.blogger_email"></inputedit>
          </div>
        </div>
        <div class="input editinputall" style="width:240px;margin-bottom:12px;">
          <div class="rows">
            <div class="rows_three">
              <span>
                <b class="warning"></b> 性别
              </span>
              <el-select
                style="width:260px"
                v-model="company_info.blogger_sex"
                placeholder="请选择"
                class="editInput"
                :popper-class="`pop${storeItemList.itemColor.id}`"
              >
                <el-option
                  v-for="item in sex_list"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </div>
            <div class="rows_three">
              <span>
                <b class="warning"></b> 星座
              </span>
              <el-select
                style="width:260px"
                v-model="company_info.blogger_constellations"
                placeholder="请选择"
                class="editInput"
                :popper-class="`pop${storeItemList.itemColor.id}`"
              >
                <el-option
                  v-for="item in constellations_list"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="input">
          <span>
            <b class="warning"></b> 个性签名
          </span>
          <el-input class="editInput" placeholder="请输入内容" v-model="company_info.blogger_signature"></el-input>
        </div>
        <div class="input">
          <span>
            <b class="warning"></b> 自我介绍
          </span>
          <el-input
            class="editInput"
            placeholder="请输入内容"
            v-model="company_info.blogger_introductions"
          ></el-input>
        </div>

        <div style="width:804px">
          <addresscity
            style="margin-top:12px;"
            :cityid="company_info.check_blogger_city"
            :provinceid="company_info.check_blogger_province"
            :province="province_list"
            :citylist="city_list"
            :cityaddr="company_info.blogger_addr"
            ref="address"
            addr="true"
          ></addresscity>
        </div>
      </div>
    </div>
    <div style="margin-top:16px;display:flex;">
      <savebtn tit="保存" @Fun="SaveSub"></savebtn>
    </div>
  </div>
</template>
<script>
import { AddBlogInfo, SaveAddBlogInfo } from "../../apis/api";
export default {
  name: "index",
  components: {
    inputedit: resolve => require(["../../components/input/input"], resolve),
    addresscity: resolve =>
      require(["../../components/input/address"], resolve),
    savebtn: resolve => require(["../../components/input/savebtn"], resolve),
    selectEdit: resolve =>
      require(["../../components/input/selectTem.vue"], resolve)
  },
  data() {
    return {
      storeItemList: this.$store.getters,
      company_info: {
        blogger_constellations: "",
        blogger_name: "",
        blogger_email: "",
        blogger_qq: "",
        blogger_head: "",
        blogger_head_info: [],
        blogger_introductions: "",
        blog_name: "",
        blogger_sex: "",
        blogger_signature: "",
        check_blogger_city: "",
        check_blogger_province: "",
        blogger: ""
      },

      sex_list: "",
      constellations_list: "",
      province_list: "",
      city_list: ""
    };
  },
  created() {
    this.Company();
  },
  methods: {
    handleAvatarSuccess(response, file, fileList) {
      this.company_info.blogger_head = response.data.media_url;
      this.company_info.blogger_head_info = response.data;
      debugger;
    },
    beforeAvatarUpload(file) {
      if (file.type !== "image/jpeg" || "image/png") {
        this.$message.error("请上传jpg/png图片");
      }
    },
    Company() {
      AddBlogInfo().then(res => {
        if (res.status === 200) {
          this.company_info = res.data.data.blogger_info;
          this.sex_list = res.data.data.sex_list;
          this.constellations_list = res.data.data.constellations_list;
          this.city_list = res.data.data.city_list;
          this.province_list = res.data.data.province_list;
          this.blogger_name = res.data.data.blogger_info.blog_name;
          this.blogger_email = res.data.data.blogger_info.blogger_email;
          this.blogger_qq = res.data.data.blogger_info.blogger_qq;
        } else {
          alert("系统异常");
        }
      });
    },
    SaveSub() {
      console.log(this.company_info)
      let prams = {
        blog_name: this.company_info.blog_name,
        blogger_head: this.company_info.blogger_head_info.media_url || "",
        blogger_name: this.$refs.tel.D,
        blogger_email: this.$refs.qq.D,
        blogger_qq: this.$refs.emi.D,
        blogger_province: this.$refs.address.cityoneid,
        blogger_city: this.$refs.address.citytwoid,
        blogger_sex: this.company_info.blogger_sex,
        blogger_constellations: this.company_info.blogger_constellations,
        blogger_signature: this.company_info.blogger_signature,
        blogger_introductions: this.company_info.blogger_introductions
      };
      debugger
      SaveAddBlogInfo(prams).then(res => {
        if (res.status === 200) {
          this.$message({
            message: res.data.msg,
            type: res.data.type,
            customClass: "msgposition",
            center: true
          });
          this.Company();
        } else {
          alert("系统异常");
        }
      });
      // if (
      //   prams.blog_name == "" ||
      //   prams.blogger_head == "" ||
      //   prams.blogger_name == "" ||
      //   prams.blogger_email == "" ||
      //   prams.blogger_qq == "" ||
      //   prams.blogger_province == "" ||
      //   prams.blogger_city == "" ||
      //   prams.blogger_sex == "" ||
      //   prams.blogger_constellations == "" ||
      //   prams.blogger_signature == "" ||
      //   prams.blogger_introductions == ""
      // ) {
      //   this.$message({
      //     message: "信息填写不完整请重新输入",
      //     type: "error",
      //     customClass: "msgposition"
      //   });
      //   return;
      //   // alert("信息填写不完整请重新输入");
      // } else {
      // }
    }
  },
  computed: {
    itemColorFun() {
      let id = this.$store.getters.itemColor.id;
      switch (id) {
        case "0":
          return "CompanyInformation_white";
        case "1":
          return "CompanyInformation_black";
        default:
          return;
      }
    }
  }
};
</script>
<style lang="less" scoped>
// @import "../../less/CompanyInformation/index.less";
.CompanyInformation {
  border-radius: 8px;

  .edit_product {
    background: #ffffff;
    width: 100%;
    padding: 34px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
    opacity: 1;
    border-radius: 4px;

    .tit {
      text-align: left;
      font-size: 20px;
      font-weight: 600;
      line-height: 28px;
      color: rgba(0, 0, 0, 0.85);
      margin-bottom: 20px;
    }

    .input {
      margin-top: 12px;
      text-align: left;

      span {
        display: block;
        font-size: 14px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.45);
        margin-bottom: 8px;
        color: rgba(0, 0, 0, 0.45);
      }

      .editInput {
        width: 804px;
        min-width: 200px;
        /deep/ .el-input__inner {
          background: rgba(0, 0, 0, 0.02);
          border: 1px solid rgba(0, 0, 0, 0.039);
          // height: 44px;
        }
        /deep/ .el-input__inner:focus {
          background: transparent;
          // border: 1px solid #3ca860;
        }
      }

      .imglogo {
        width: 240px;
        height: 180px;
        box-sizing: border-box;
        border: 2px dashed rgba(0, 0, 0, 0.07);
      }
    }

    .cituselect {
      width: 800px;
      margin-right: 60px;

      .cityone {
        width: 240px;
      }

      .citytwo {
        width: 240px;
        margin-left: 10px;
      }
    }

    .editinputall {
      width: 100%;
      min-width: 200px;
      .rows {
        display: flex;
        margin-top: 6px;
        .rows_three {
          width: 260px;
          margin-right: 12px;
        }
      }
    }
  }
}

//上传头像
.input /deep/ .avatar-uploader {
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 4px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    border: 1px dashed rgba(0, 0, 0, 0.078);
    width: 120px;
    height: 120px;
    input[type="file"] {
      display: none;
    }
    img {
      max-height: 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .el-upload:hover {
    // border-color: #3ca860;
  }

  .avatar-uploader-icon {
    font-size: 42px;
    color: rgba(0, 0, 0, 0.45);
    width: 42px;
    height: 42px;
    text-align: center;
    line-height: 42px;
    margin-top: 25px;
  }
  .avatar-uploader-icon:after {
    content: "上传照片";
    width: 48px;
    display: block;
    height: 17px;
    font-size: 12px;
    font-weight: 400;
    line-height: 17px;
    color: rgba(0, 0, 0, 0.45);
    margin-top: 11px;
  }
}
.warning {
  position: relative;
  width: 4px;
  height: 4px;
  overflow: hidden;
  display: inline-block;
  background: red;
  border-radius: 50%;
  top: -2px;
}
.CompanyInformation_black /deep/ .edit_product {
  background: #222643;
  box-shadow: none;
  .tit {
    color: rgba(255, 255, 255, 1);
  }
  .input {
    span {
      color: rgba(255, 255, 255, 0.65);
    }

    .editInput {
      .el-input__inner {
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid transparent;
        color: rgba(255, 255, 255, 0.65);
      }
      .el-input__inner:focus {
        background: transparent;
        border: 1px solid rgba(255, 255, 255, 0.06);
      }
    }

    .el-upload {
      background: rgba(255, 255, 255, 0.04);
      border: 2px dashed rgba(255, 255, 255, 0.078);
      .avatar-uploader-icon::after,
      .avatar-uploader-icon::before {
        color: rgba(255, 255, 255, 0.45);
      }
    }
  }
  .el-input__inner {
    color: rgba(255, 255, 255, 0.65);
  }
}
</style>


