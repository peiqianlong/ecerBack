<template>
  <div class="qianjuproduct" :class="itemColorFun">
    <transition name="slide-fade">
      <div v-if="isview" style="height:100%;">
        <div class="pro">
          <div class="memu">
            <div class="proitem" style="width:100%;">
              <el-input
                class="inputsearch"
                placeholder="请输入内容"
                prefix-icon="el-icon-search"
                v-model="name_value"
              ></el-input>
              <el-select
                v-model="classification_value"
                placeholder="请选择"
                :popper-class="`pop${storeItemList.itemColor.id}`"
                class="producrselect prodoctclass"
              >
                <el-option
                  v-for="item in classification"
                  :key="item.id"
                  :label="item.term_name"
                  :value="item.id"
                >{{item.term_name == '产品分类' ? '全部':item.term_name }}</el-option>
              </el-select>
              <el-select
                v-model="status_value"
                placeholder="请选择"
                :popper-class="`pop${storeItemList.itemColor.id}`"
                class="producrselect prodoctstats"
              >
                <el-option
                  v-for="item in status"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                >{{item.name == '产品状态' ? '全部':item.name }}</el-option>
              </el-select>
              <div class="mar" style="margin-right:12px;">
                <savebtn tit="查询" @Fun="search"></savebtn>
              </div>
              <div class="mar" style="margin-right:12px">
                <cancelbtn tit="清空" @Fun="clear"></cancelbtn>
              </div>
              <div class="mar" style="margin-right:12px;float:right;">
                <savebtn tit="添加博文" @Fun="addProduct"></savebtn>
              </div>
            </div>
          </div>
          <div class="table" style=" padding-bottom: 0px;">
            <transition name="el-zoom-in-top">
              <div class="operation" v-if="menuShow">
                <div @click="ProductUpDown('1')">发布</div>
                <div @click="ProductUpDown('0')">草稿</div>
                <div @click="delproduct">删除</div>
              </div>
            </transition>
            <el-table
              ref="multipleTable"
              :data="tableData3"
              tooltip-effect="dark"
              @selection-change="handleSelectionChange"
              header-row-class-name="headerTable"
            >
              <el-table-column type="selection" width="100"></el-table-column>
              <el-table-column label="图片" width="148">
                <template slot-scope="scope">
                  <div class="img" @click="addProduct(scope.row)">
                    <img
                      class="imgcenter"
                      v-if="scope.row.post_img"
                      :src="scope.row.post_img"
                      alt
                    />
                    <img
                      v-else
                      src="http://img.site.maoyt.com/group1/M00/00/01/wKgAb11bwASAZbkgAACcpmjRuDY697.jpg_500x375.jpg"
                      alt
                    />
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="博文标题">
                <template slot-scope="scope">
                  <div style="display:flex;padding-right: 15px;">
                    <div
                      style="max-width:80%;"
                      class="name"
                      @click="addProduct(scope.row)"
                    >{{ scope.row.post_title }}</div>
                    <div class="hreftemp" style="cursor:pointer;">
                      <i style="color:#3CA860;marign-top:6px;" class="iconfont icon-icon_yulan"></i>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="分类">
                <template slot-scope="scope">
                  <div class="class">
                    <span v-if="scope.row.check_term_name.term_name_p">
                      {{scope.row.check_term_name.term_name_p}}
                      <i
                        style="color:#3CA860"
                        class="iconfont icon-xiaji"
                      ></i>
                    </span>
                    <span
                      v-if="scope.row.check_term_name.term_name"
                    >{{scope.row.check_term_name.term_name}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="状态" width="102">
                <template slot-scope="scope">
                  <div v-if="scope.row.post_status == 1" class="pruductUp"></div>
                  <div v-if="scope.row.post_status == -1" class="pruductDown"></div>
                  <div v-if="scope.row.post_status == 0" class="pruductDown"></div>
                </template>
              </el-table-column>
              <el-table-column label="更新时间" width="118">
                <template slot-scope="scope">
                  <div class="date">{{ scope.row.updated_date }}</div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div :class="storeItemList.itemColor.id === '0' ? 'pagination_white' : 'pagination_black'">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="PageInfo.page"
            layout=" total,prev, pager, next, sizes, jumper"
            :total="PageInfo.count"
            background
            :page-size="PageInfo.limit"
            :popper-class="storeItemList.itemColor.id === '0' ?  'popper_white': 'popper_black'"
          ></el-pagination>
        </div>
      </div>
    </transition>
    <transition name="slide-fade">
      <div v-if="!isview" style="widht:100%;height:100%;">
        <addproduct @cancel="cancel" :addInfo="addId"></addproduct>
      </div>
    </transition>
  </div>
</template>
<script>
import {
  BlogList,
  BlogListTerm,
  DelProductInfo,
  SearchProductList,
  downProductInfo,
  UpProductInfo,
  DelBlogList,
  upBlogList,
  downBlogList
} from "../../apis/api";
export default {
  name: "bloglist",
  components: {
    addproduct: resolve => require(["../../components/Blog/AddBlog"], resolve),
    savebtn: resolve =>
      require(["../../components/input/savebtn.vue"], resolve),
    cancelbtn: resolve =>
      require(["../../components/input/cancelbtn.vue"], resolve)
  },
  data() {
    return {
      storeItemList: this.$store.getters,
      tableData3: [],
      menuShow: false,
      PageInfo: {},
      status: {},
      classification: {},
      classification_value: "",
      status_value: "",
      name_value: "",
      isview: true,
      delProList: [],
      addId: null
    };
  },
  created() {
    this.getDataInfo();
  },
  methods: {
    getDataInfo() {
      BlogList().then(res => {
        if (res.status === 200) {
          this.tableData3 = res.data.data.post_list;
          this.PageInfo = res.data.data.page_info;
          this.classification = res.data.data.post_term_list;
          this.status = res.data.data.post_status_list;
          this.classification_value = res.data.data.post_term_list[0].id;
          this.status_value = res.data.data.post_status_list[0].value;
        } else {
          this.$message({
            message: "数据异常",
            type: "error",
            customClass: "msgposition",
            center: true
          });
        }
      });
    },
    //查询
    search() {
      let prames = {
        s_post_title: this.name_value,
        s_term_id: this.classification_value,
        s_post_status: this.status_value,
        p: this.PageInfo.page
      };
      BlogList(prames).then(res => {
        if (res.status === 200) {
          this.tableData3 = res.data.data.post_list;
          this.PageInfo = res.data.data.page_info;
        } else {
          alert("系统异常");
        }
      });
    },
    //清空
    clear() {
      this.classification_value = "";
      this.status_value = "";
      this.name_value = "";
      this.getDataInfo();
    },
    // 添加产品
    addProduct(val) {
      if (val == undefined) {
        this.addId = null;
      } else {
        this.addId = val.id;
      }
      this.isview = false;
    },
    //关闭产品
    cancel() {
      this.isview = true;
      this.search();
    },
    //全部上下架
    ProductUpDown(val) {
      let prames = {
        post_id_list: this.delProList
      };
      if (val === "1") {
        upBlogList(prames).then(res => {
          this.$message({
            message: res.data.msg,
            type: res.data.type,
            customClass: "msgposition",
            center: true
          });
          this.getDataInfo();
        });
      } else if (val == "0") {
        downBlogList(prames).then(res => {
          this.$message({
            message: res.data.msg,
            type: res.data.type,
            customClass: "msgposition",
            center: true
          });
          this.getDataInfo();
        });
      }
    },
    //删除商品
    delproduct() {
      let prames = {
        post_id_list: this.delProList
      };
      DelBlogList(prames).then(res => {
        this.$message({
          message: res.data.msg,
          type: res.data.type,
          customClass: "msgposition",
            center: true
        });
        this.getDataInfo();
      });
    },
    //用户选择列表数组
    handleSelectionChange(val) {
      if (val.length == 0) {
        this.menuShow = false;
      } else {
        this.menuShow = true;
      }
      let arr = [];
      val.forEach(element => {
        arr.push(element.id);
      });
      this.delProList = arr;
    },
    handleCurrentChange(value) {
      this.PageInfo.page = value;
      this.search();
    },
    handleSizeChange(value) {
      this.PageInfo.limit = value;
      this.search();
    }
  },
  computed: {
    itemColorFun() {
      let id = this.$store.getters.itemColor.id;
      switch (id) {
        case "0":
          return "product_white";
        case "1":
          return "product_black";
        default:
          return;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.hreftemp {
  display: none;
  position: relative;
}
.memu {
  padding-top: 29px;
  .proitem {
    .inputsearch,
    .el-select {
      float: left;
      margin-top: 5px;
    }
    .mar {
      float: left;
      margin-top: 5px;
    }
  }
}

@media screen and (max-width: 1430px) {
  .proitem {
    div:last-child {
      float: left !important;
    }
  }
}
@media screen and (max-width: 1192px) {
  .mar {
    margin-left: 0 !important;
  }
}
</style>