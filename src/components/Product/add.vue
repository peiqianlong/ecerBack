<template>
  <div class="addmain" :class="itemColorFun">
    <div class="addmain_left">
      <div class="bgtemp">
        <div class="tit">产品基本信息</div>
        <div style="margin-bottom:12px;width:100%px">
          <inputEdit tit="产品名称" :data.sync="product_info.product_name"></inputEdit>
        </div>
        <div style="margin-bottom:12px;width:240px">
          <selectEdit tit="产品分类" :data.sync="term_list"></selectEdit>
        </div>
        <div style="margin-bottom:0px;width:100%px">
          <div style class="titspan">详细信息</div>
          <div
            style="height:485px;"
            :class="$store.getters.itemColor.id === '0' ? 'edit_white' : 'edit_black'"
          >
            <editor
              style="overflow:hidden;box-sizing:border-box;height:100%;"
              api-key="1lzod4sidk60oiu5ljguaw3vel0o9s119nymdttn0f8lkegi"
              :init="editorinit"
              v-model="content"
            ></editor>
          </div>
        </div>
      </div>
      <div class="bgtemp" style="padding-right:30px">
        <div class="tit">产品图片</div>
        <div class="uploadImg">
          <draggable
            v-bind="{draggable:'.itemList'}"
            v-model="check_product_img_list"
            @change="change"
            @start="start"
            @end="end"
            :move="move"
            animation="300"
            sort="true"
            handle=".itemList"
            forceFallback="false"
          >
            <template v-for="(item , i) in check_product_img_list">
              <div class="itemList" :key="i">
                <div class="closeaddimg" style="height:100%;position:relative">
                  <img class="jqimg" :src="item.media_url_http" alt />
                  <div class="imgclose" @click="removeAddImg(i)">
                    <i class="iconfont icon-guanbi"></i>
                  </div>
                </div>
              </div>
            </template>
            <div class="itemList upload">
              <el-upload
                style="width:100%;height:100%;opacity:0"
                action="/api/globalmedia/upload"
                list-type="picture-card"
                :on-success="fileSuccess"
                :show-file-list="false"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </div>
          </draggable>
          <div style="clear:both"></div>
        </div>
      </div>
      <div class="btnsave">
        <savebtn tit="保存" @Fun="SaveInfo"></savebtn>
        <div style="margin-left:12px;">
          <cancelbtn tit="取消" @Fun="$emit('cancel')"></cancelbtn>
        </div>
      </div>
    </div>
    <div class="addmain_right">
      <div class="bgtemp">
        <div class="tit">产品生产属性</div>
        <div style="margin-bottom:12px;width:100%px">
          <inputEdit tit="原产地" :data.sync="product_info.brand_name"></inputEdit>
        </div>
        <div style="margin-bottom:12px;width:100%px">
          <inputEdit tit="品牌" :data.sync="product_info.model_number"></inputEdit>
        </div>
        <div style="margin-bottom:12px;width:100%px">
          <inputEdit tit="型号" :data.sync="product_info.certification"></inputEdit>
        </div>
        <div style="margin-bottom:0px;width:100%px">
          <inputEdit tit="认证证书" :data.sync="product_info.place_of_origin"></inputEdit>
        </div>
      </div>
      <div class="bgtemp">
        <div class="tit">产品交易属性</div>
        <div style="margin-bottom:12px;width:100%px">
          <inputEdit tit="价格(美元/件)" :data.sync="product_info.price"></inputEdit>
        </div>
        <div style="margin-bottom:12px;width:100%px">
          <inputEdit tit="付款方式" :data.sync="product_info.payment_terms"></inputEdit>
        </div>
        <div style="margin-bottom:12px;width:100%px">
          <inputEdit tit="最小订货量(件)" :data.sync="product_info.minimum_order_quantity"></inputEdit>
        </div>
        <div style="margin-bottom:12px;width:100%px">
          <inputEdit tit="供货能力(件/月)" :data.sync="product_info.supply_ability"></inputEdit>
        </div>
        <div style="margin-bottom:12px;width:100%px">
          <inputEdit tit="常规包装" :data.sync="product_info.packaging_details"></inputEdit>
        </div>
        <div style="margin-bottom:0px;width:100%px">
          <inputEdit tit="发货期限" :data.sync="product_info.delivery_time"></inputEdit>
        </div>
      </div>
      <div class="bgtemp" style="min-height:192px;">
        <div class="tit">产品标签</div>
        <input
          placeholder="回车保存标签"
          @keydown="SaveLable"
          class="taginput"
          type="text"
          v-model="lable_name_tag"
        />
        <div class="tags">
          <el-tag
            @close="handleClose(tag)"
            v-for="tag in dynamicTags"
            :key="tag.name"
            closable
            :type="tag.type"
          >{{tag}}</el-tag>
        </div>
      </div>
    </div>
    <!--  <editor
      style="overflow:hidden;box-sizing:border-box;"
      api-key="1lzod4sidk60oiu5ljguaw3vel0o9s119nymdttn0f8lkegi"
      :init="editorinit"
      v-model="content"
    ></editor>
    <div @click="SaveInfo">大数定律</div>-->
    <!-- // var activeEditor = tinymce.activeEditor;
      // var editBody = activeEditor.getBody();
      // activeEditor.selection.select(editBody);
    // var text = activeEditor.selection.getContent({ format: "text" });-->
  </div>
</template>
<script>
import {
  AddProductInfo,
  SaveAddProductInfo,
  SaveModifyProductInfo,
  UpProductInfo,
  ModifyProductInfo
} from "../../apis/api";
import draggable from "vuedraggable";
import Editor from "../../../static/tinymce/tinymce-vue/lib/cjs";
import { tinymcedata } from "../../units/timy";

export default {
  name: "add",
  props: ["addInfo"],
  components: {
    editor: Editor,
    draggable: draggable,
    inputEdit: resolve => require(["../input/input2.vue"], resolve),
    cancelbtn: resolve => require(["../input/cancelbtn.vue"], resolve),
    savebtn: resolve => require(["../input/savebtn.vue"], resolve),
    selectEdit: resolve => require(["../input/selectTem.vue"], resolve)
  },
  data() {
    return {
      term_list: {
        id: "",
        sel: []
      },
      product_info: {
        product_name: "",
        brand_name: "",
        model_number: "",
        certification: "",
        place_of_origin: "",
        price: "",
        payment_terms: "",
        minimum_order_quantity: "",
        supply_ability: "",
        packaging_details: "",
        delivery_time: ""
      },
      dynamicTags: [],
      content: "",
      check_product_img_list: [],
      lable_name_tag: "",

      // trem_value: "1",
      inputVisible: false,
      inputValue: "",
      imglist: [],
      value: "",
      editorinit: tinymcedata,
      //删除添加图片
      removeAddImg(index) {
        this.check_product_img_list.splice(index, 1);
      }
    };
  },
  mounted() {
    this.taglist();
  },
  updated() {
    this.img();
  },
  methods: {
    //图片适应
    img: function() {
      let arr = $(".jqimg");
      if (arr.length > 0) {
        setTimeout(() => {
          arr.each(function() {
            let widthpx = parseInt($(this).css("width"));
            let heightpx = parseInt($(this).css("height"));
            if (widthpx !== 0) {
              if (widthpx > heightpx) {
                $(this).addClass("imgscaleshowheight");
              } else if (widthpx < heightpx) {
                $(this).addClass("imgscaleshowwidth");
              } else {
                $(this).addClass("imgscaleshow");
              }
            }
          });
        }, 100);
      }
    },
    //获取下拉框
    taglist() {
      if (this.addInfo !== null) {
        ModifyProductInfo(this.addInfo).then(res => {
          if (res.data.status === 0) {
            let datainfo = res.data.data;
            this.product_info.product_name = datainfo.product_info.product_name;
            this.term_list.id = datainfo.product_info.check_term_id;
            this.term_list.sel = datainfo.term_list;
            this.content = datainfo.product_info.product_content_html;
            this.check_product_img_list =
              datainfo.product_info.check_product_img_list;
            this.product_info.brand_name =
              datainfo.product_info.check_product_details.brand_name;
            this.product_info.model_number =
              datainfo.product_info.check_product_details.model_number;
            this.product_info.certification =
              datainfo.product_info.check_product_details.certification;
            this.product_info.payment_terms =
              datainfo.product_info.check_product_details.payment_terms;
            this.product_info.place_of_origin =
              datainfo.product_info.check_product_details.place_of_origin;
            this.product_info.price =
              datainfo.product_info.check_product_details.price;
            this.product_info.payment_terms =
              datainfo.product_info.check_product_details.payment_terms;
            this.product_info.minimum_order_quantity =
              datainfo.product_info.check_product_details.minimum_order_quantity;
            this.product_info.supply_ability =
              datainfo.product_info.check_product_details.supply_ability;
            this.product_info.packaging_details =
              datainfo.product_info.check_product_details.packaging_details;
            this.product_info.delivery_time =
              datainfo.product_info.check_product_details.delivery_time;
            if (datainfo.product_info.check_label_list) {
              datainfo.product_info.check_label_list.forEach(item => {
                this.dynamicTags.push(item.label_name);
              });
            }
          } else {
            this.$message({
              type: res.data.type,
              message: res.data.msg,
              customClass: "msgposition",
              center: true
            });
          }
        });
      } else {
        AddProductInfo().then(res => {
          if (res.status === 200) {
            this.term_list.sel = res.data.data.term_list;
            this.term_list.id = res.data.data.term_list[0].id;
          }
        });
      }
    },
    fileSuccess(response, file, fileList) {
      this.check_product_img_list.push(response.data);
    },

    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    //保存数据
    SaveInfo() {
      let arr = [];
      this.check_product_img_list.forEach(item => {
        arr.push(item.media_url);
      });
      let prams = {
        product_name: this.product_info.product_name,
        product_content: this.content,
        term_id: this.term_list.id,
        label_list: this.dynamicTags,
        product_img_list: arr,
        product_details_1: {
          brand_name: this.product_info.brand_name,
          model_number: this.product_info.model_number,
          certification: this.product_info.certification,
          place_of_origin: this.product_info.place_of_origin
        },
        product_details_2: {
          price: this.product_info.price,
          payment_terms: this.product_info.payment_terms,
          minimum_order_quantity: this.product_info.minimum_order_quantity,
          supply_ability: this.product_info.supply_ability,
          packaging_details: this.product_info.packaging_details,
          delivery_time: this.product_info.delivery_time
        }
      };

      if (prams.product_name == "") {
        this.$message({
          type: "info",
          message: "请填写名字",
          customClass: "msgposition",
          center: true
        });
        return;
      } else if (prams.product_name.length > 40) {
        this.$message({
          type: "info",
          message: "产品名称在40字以内",
          customClass: "msgposition",
          center: true
        });
        return;
      } else if (prams.product_content == "") {
        this.$message({
          type: "info",
          message: "请输入内容",
          customClass: "msgposition",
          center: true
        });
        return;
      } else if (prams.product_img_list.length < 1) {
        this.$message({
          type: "info",
          message: "请上传图片",
          customClass: "msgposition",
          center: true
        });
        return;
      }
      if (this.addInfo !== null) {
        SaveModifyProductInfo(prams, this.addInfo).then(res => {
          this.$message({
            message: res.data.msg,
            type: res.data.type,
            customClass: "msgposition",
            center: true
          });
        });
      } else {
        SaveAddProductInfo(prams).then(res => {
          this.$message({
            message: res.data.msg,
            type: res.data.type,
            customClass: "msgposition",
            center: true
          });
        });
      }
      this.$emit("cancel", "save");
    },

    //保存标签
    SaveLable() {
      let e = event.keyCode;
      if (e === 13) {
        if (this.lable_name_tag !== "") {
          this.dynamicTags.push(this.lable_name_tag);
          this.lable_name_tag = "";
        } else {
          this.$message({
            type: "error",
            message: "不允许为空",
            customClass: "msgposition",
            center: true
          });
        }
      }
    },
    // 生成标签
    LabelList() {
      if (this.addInfo === null) {
        return [];
      } else {
        let arr = [];
        this.addInfo.check_label_list.forEach(element => {
          arr.push(element.label_name);
          return arr;
        });
      }
    },
    //上架
    ProductUpDown() {
      let arr = [];
      arr.push(this.addInfo.id);
      UpProductInfo({ product_id_list: arr }).then(res => {
        this.$message({
          message: res.data.msg,
          type: res.data.type,
          center: true
        });
      });
    },
    // 拖拽
    change: function(evt) {
      console.log("change" + evt);
    },
    //start ,end ,add,update, sort, remove 得到的都差不多
    start: function(evt) {
      this.$emit("start", evt);
    },
    end: function(evt) {
      // console.log("end" + evt);
      evt.item; //可以知道拖动的本身
      evt.to; // 可以知道拖动的目标列表
      evt.from; // 可以知道之前的列表
      evt.oldIndex; // 可以知道拖动前的位置
      evt.newIndex; // 可以知道拖动后的位置
      this.$emit("end", evt, this.ThemeInfo);
    },
    move: function(evt, originalEvent) {
      // console.log("move" + evt);
      // console.log("move" + originalEvent);
      this.$emit("move", evt, originalEvent);
    }
  },
  computed: {
    itemColorFun() {
      let id = this.$store.getters.itemColor.id;
      switch (id) {
        case "0":
          return "add_white";
        case "1":
          return "add_black";
        default:
          return;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.addmain {
  width: 100%;
  height: 100%;
  display: flex;
  .bgtemp {
    padding: 34px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
    margin-bottom: 16px;
    .tit {
      font-size: 20px;
      font-weight: 600;
      line-height: 28px;
      color: rgba(0, 0, 0, 1);
      text-align: left;
      margin-bottom: 20px;
    }
  }
  .addmain_left {
    flex: 1;
    margin-right: 16px;
    .titspan {
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      color: rgba(0, 0, 0, 0.45);
      margin-bottom: 7px;
      text-align: left;
    }
    .uploadImg {
      width: 100%;
      .itemList {
        width: 144px;
        height: 144px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 2px;
        overflow: hidden;
        float: left;
        margin: 4px;
        .imgclose {
          position: absolute;
          right: -20px;
          top: -20px;
          display: block;
          border: 20px solid #3ca860;
          transform: rotate(45deg);
          display: none;
          cursor: pointer;
          i {
            position: absolute;
            left: -7px;
            top: 1px;
            color: #fff;
            transform: rotate(45deg);
            transition: all 200ms linear;
          }
          i:hover {
            transform: rotate(225deg);
          }
        }
        .closeaddimg {
          img {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
        }
        .closeaddimg:hover {
          .imgclose {
            display: block;
          }
        }
      }
      .upload {
        background: rgba(0, 0, 0, 0.02);
        border: 2px dashed rgba(0, 0, 0, 0.0784313725490196);
        position: relative;
        /deep/ .el-upload {
          width: 100%;
          height: 100%;
        }
      }
      .upload:before {
        content: "";
        display: block;
        width: 2px;
        height: 60px;
        background: rgba(0, 0, 0, 0.45098039215686275);
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      .upload::after {
        content: "";
        display: block;
        width: 60px;
        height: 2px;
        background: rgba(0, 0, 0, 0.45098039215686275);
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      .itemList:first-child {
        width: 300px;
        height: 300px;
        margin: 0;
        margin-right: 4px;
        margin-top: 4px;
      }
    }
    .btnsave {
      display: flex;
      justify-content: flex-start;
      margin-bottom: 19px;
    }
  }
  .addmain_right {
    width: 348px;
    .taginput {
      width: 280px;
      height: 40px;
      background: rgba(0, 0, 0, 0.02);
      border: 1px solid rgba(0, 0, 0, 0.0392156862745098);
      opacity: 1;
      border-radius: 4px;
      outline: none;
      text-indent: 12px;
      margin-bottom: 8px;
    }
    .taginput::placeholder {
      font-size: 13px;
    }
    .tags {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      span {
        margin-right: 8px;
        padding: 0px 8px;
        height: 28px;
        line-height: 28px;
        border: 1px solid rgba(0, 0, 0, 0.25098039215686274);
        border-radius: 4px;
        background: transparent;
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
      }
      /deep/ .el-tag .el-tag__close {
        color: rgba(0, 0, 0, 0.65);
      }
      /deep/ .el-tag .el-tag__close:hover {
        background: transparent;
      }
    }
    .taginput:focus {
      background: transparent;
      border: 1px solid rgba(0, 0, 0, 0.12);
    }
  }
}
.add_black {
  .addmain_left,
  .addmain_right {
    .bgtemp {
      background: rgba(34, 38, 67, 1);
      .tit {
        color: rgba(255, 255, 255, 1);
      }
      .taginput {
        background: rgba(255, 255, 255, 0.04);
        color: rgba(255, 255, 255, 0.65);
      }
      .tags {
        span {
          border: 1px solid rgba(255, 255, 255, 0.25098039215686274);
          color: rgba(255, 255, 255, 0.65);
        }
        /deep/ .el-tag .el-icon-close::before {
          color: rgba(255, 255, 255, 0.65);
        }
      }
      .upload {
        border: 2px dashed rgba(255, 255, 255, 0.0784313725490196);
        background: rgba(255, 255, 255, 0.04);
      }
      .upload:before {
        background: rgba(255, 255, 255, 0.45098039215686275);
      }
      .upload::after {
        background: rgba(255, 255, 255, 0.45098039215686275);
      }
    }
    .titspan {
      color: rgba(255, 255, 255, 0.65);
    }
  }
}
</style>


