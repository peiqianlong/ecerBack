<template>
  <div class="CompanyInformation" :class="itemColorFun">
    <div class="edit_product">
      <div class="tit">编辑公司信息</div>
      <div class="input">
        <span>
          <b class="warning"></b> 公司名称
        </span>
        <el-input class="editInput" placeholder="请输入内容" v-model="company_info.company_name"></el-input>
      </div>
      <div class="input">
        <span>
          <b class="warning"></b> logo
        </span>
        <el-upload
          class="avatar-uploader"
          action="/api/globalmedia/upload"
          :data="{'folder_type':'1'}"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img
            v-if="company_info.company_logo_info"
            :src="company_info.company_logo_info.media_url_http"
            class="avatar"
          />
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div class="editinputall">
        <div class="rows">
          <div class="rows_three">
            <inputedit ref="tel" tit="电话" place="请输入你的电话" :data="company_info.company_tel"></inputedit>
          </div>
          <div class="rows_three">
            <inputedit ref="fax" tit="传真" place="请输入你的传真" :data="company_info.company_fax"></inputedit>
          </div>
          <div class="rows_three">
            <inputedit ref="e" tit="邮箱" place="请输入你的邮箱" :data="company_info.company_email"></inputedit>
          </div>
        </div>
        <div style="width:804px">
          <addresscity
            style="margin-top:12px;"
            :cityid="company_info.check_company_city"
            :provinceid="company_info.check_company_province"
            :province="province_list"
            :citylist="city_list"
            :cityaddr="company_info.company_addr"
            ref="address"
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
import { CompanyInfo, SaveCompanyInfo } from "../../apis/api";
export default {
  name: "index",
  components: {
    inputedit: resolve => require(["../../components/input/input"], resolve),
    addresscity: resolve =>
      require(["../../components/input/address"], resolve),
    savebtn: resolve => require(["../../components/input/savebtn"], resolve)
  },
  data() {
    return {
      value: "",
      company_info: {
        company_name: "",
        company_tel: "",
        company_fax: "",
        company_email: "",
        company_province: 0,
        company_city: 0,
        company_addr: "",
        company_logo_info: ""
      },
      province_list: [],
      city_list: [],
      logo: ""
    };
  },
  created() {
    this.Company();
  },
  methods: {
    handleAvatarSuccess(response, file, fileList) {
      this.company_info.company_logo_info = response.data;
    },
    beforeAvatarUpload(file) {
      if (file.type !== "image/jpeg" || "image/png") {
        debugger;
        this.$message.error("请上传jpg/png图片");
      }

      return;
    },
    Company() {
      CompanyInfo().then(res => {
        if (res.status === 200) {
          if (res.data.data.company_info) {
            this.company_info = res.data.data.company_info;
          }
          this.province_list = res.data.data.province_list;
          if (res.data.data.city_list) {
            this.city_list = res.data.data.city_list;
          }
        } else {
          alert("系统异常");
        }
      });
    },
    SaveSub() {
      let parmes = {
        company_name: this.company_info.company_name,
        company_logo: this.company_info.company_logo_info.media_url || "",
        company_tel: this.$refs.tel.D,
        company_fax: this.$refs.fax.D,
        company_email: this.$refs.e.D,
        company_province: this.$refs.address.cityoneid,
        company_city: this.$refs.address.citytwoid,
        company_addr: this.$refs.address.text
      };
      if (
        parmes.company_name == "" ||
        parmes.company_logo == "" ||
        parmes.company_tel == "" ||
        parmes.company_fax == "" ||
        parmes.company_email == "" ||
        parmes.company_email == "" ||
        parmes.company_province == "" ||
        parmes.company_city == "" ||
        parmes.company_addr == ""
      ) {
        this.$message({
          message: "信息填写不完整请重新输入",
          type: "error",
          customClass: "msgposition",
            center: true
        });
        return;
        // alert("信息填写不完整请重新输入");
      } else {
        SaveCompanyInfo(parmes).then(res => {
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
      }
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
          border: 1px solid rgba(0, 0, 0, 0.12);
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
      // max-width: 100%;
      max-height: 100%;
      position: absolute;
      left:50%;
      top: 50%;
      transform: translate(-50% , -50%);
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


