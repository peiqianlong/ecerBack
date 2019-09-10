<template>
  <div style="height:100%;">
    <transition name="slide-fade">
      <div v-if="isview" class="home" style="overflow: auto;" :class="itemColorFun">
        <div class="productCategories_header">
          <div class="productCategories_header_top">
            <el-input
              class="search_up_left_search"
              placeholder="请输入产品名称"
              prefix-icon="el-icon-search"
              v-model="name_value"
              :style="{'background': storeItemList.itemColor.myproductbg}"
            ></el-input>
            <div
              :class="storeItemList.itemColor.id === '0' ? 'search_up_left_input' : 'search_up_left_input search_up_left_input_block'"
            >
              <el-select
                v-model="classification_value"
                placeholder="请选择"
                :popper-class="`pop${storeItemList.itemColor.id}`"
              >
                <el-option
                  v-for="item in classification"
                  :key="item.id"
                  :label="item.term_name"
                  :value="item.id"
                ></el-option>
              </el-select>
              <el-select
                v-model="status_value"
                placeholder="请选择"
                :popper-class="`pop${storeItemList.itemColor.id}`"
              >
                <el-option
                  v-for="item in status"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-button class="query" @click="search">查询</el-button>
              <el-button class="clear" @click="clear">清空</el-button>
            </div>
          </div>
          <div class="productCategories_header_down search_down">
            <el-button
              class="search_down_search"
              type="primary"
              icon="el-icon-plus"
              @click="addProduct"
            >添加产品</el-button>
            <el-button class="search_down_all" plain @click="ProductUpDown('1')">批量上架</el-button>
            <el-button class="search_down_all" plain @click="ProductUpDown('0')">批量下架</el-button>
            <el-button class="search_down_all" plain @click="delproduct">批量删除</el-button>
          </div>
        </div>
        <div class="datalist" :style="{'background': storeItemList.itemColor.myproductbg}">
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            @selection-change="handleSelectionChange"
            :class="storeItemList.itemColor.id === '0' ? 'myProduct_tablelist' : 'myProduct_tablelist myProduct_tablelist_black'"
            highlight-current-row
            :style="{'background': storeItemList.itemColor.myproductbg , 'font=size':'16px' ,}"
          >
            <el-table-column
              type="selection"
              width="60"
              align="center"
              :class-name="storeItemList.itemColor.id === '0'? 'checkboxbg' : 'checkboxbgblack'"
            ></el-table-column>
            <el-table-column align="center" label="序号" width="80">
              <template slot-scope="scope">{{ scope.row.num }}</template>
            </el-table-column>
            <el-table-column header-align="center" label="产品名称">
              <template slot-scope="scope">
                <div
                  style="text-align:left;margin:0 10px; max-width:407px;overflow:hidden;white-space: nowrap;"
                >{{ scope.row.product_name }}</div>
              </template>
            </el-table-column>
            <el-table-column align="center" label="产品分类">
              <template slot-scope="scope">
                <div
                  style="text-align:left;max-width:280px;overflow:hidden;white-space: nowrap;"
                >{{ scope.row.check_term_name}}</div>
              </template>
            </el-table-column>
            <el-table-column align="center" label="标签" width="200">
              <template slot-scope="scope">
                <div class="tag">
                  <template v-for="(item,index) in scope.row.check_label_list">
                    <el-tag
                      style="margin-right:4px;border-radius:8px;background: transparent;"
                      disable-transitions
                      color="#fff"
                      :key="index"
                      v-if="index < 3"
                    >{{item.label_name}}</el-tag>
                  </template>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" label="产品状态" width="80">
              <template slot-scope="scope">
                <div class="updown" v-if="scope.row.product_status !== '1'">
                  <span class="disc">●</span>
                  {{scope.row.product_status_name}}
                </div>
                <div class="updown" v-if="scope.row.product_status === '1'" style="color:#42C471">
                  <span
                    class="disc"
                    :style="{'color': itemColorFun == 'productCategories_white' ? '#42C471' : '#42C471'}"
                  >●</span>
                  {{scope.row.product_status_name}}
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" label="更新时间" width="173">
              <template slot-scope="scope">{{ scope.row.updated_date }}</template>
            </el-table-column>
            <el-table-column
              align="center"
              label="操作"
              :class-name="storeItemList.itemColor.id === '0'? 'btn_white' : 'btn_black'"
              width="230"
            >
              <template slot-scope="scope">
                <div class="UpDown" style="display:flex;flex-warp:nowarp">
                  <el-button
                    v-if="scope.row.product_status !== '1'"
                    class="operation operation_upper"
                    round
                    @click="ProductUpDown('2' ,scope.row )"
                  >上架</el-button>
                  <el-button
                    v-if="scope.row.product_status == '1'"
                    class="operation operation_down"
                    round
                    @click="ProductUpDown( '1' ,  scope.row )"
                  >下架</el-button>
                  <el-button
                    class="operation operation_modify"
                    round
                    @click="addProduct(scope.row)"
                  >修改</el-button>
                  <el-button class="operation operation_del" round @click="delSingel(scope.row)">删除</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div :class="storeItemList.itemColor.id === '0' ? 'pagination_white' : 'pagination_black'">
          <!-- :page-size="PageInfo.limit" -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="PageInfo.page"
            layout=" total,prev, pager, next, sizes, jumper"
            :total="PageInfo.count"
            background
            :popper-class="storeItemList.itemColor.id === '0' ?  'popper_white': 'popper_black'"
          ></el-pagination>
        </div>
      </div>
    </transition>
    <transition name="slide-fade">
      <div v-if="!isview">
        <addproduct @cancel="cancel" :addInfo="addInfo"></addproduct>
      </div>
    </transition>
  </div>
</template>
<script>
import {
  ProductList,
  DelProductInfo,
  SearchProductList,
  downProductInfo,
  UpProductInfo
} from "../../apis/api";
import { debug } from "util";
export default {
  name: "myProduct",
  components: {
    addproduct: resolve => require(["../../components/Product/add"], resolve)
  },
  data() {
    return {
      delProList: [],
      PageInfo: {
        count: 10,
        limit: 10,
        page: 1
      },
      isview: true,
      storeItemList: this.$store.getters,
      addInfo: null,
      tableData: [],
      status: [],
      classification: [],
      classification_value: "",
      status_value: "",
      name_value: ""
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    handleSelectionChange(val) {
      let arr = [];
      val.forEach(element => {
        arr.push(element.id);
      });
      this.delProList = arr;
    },
    handleSizeChange(val) {
      this.PageInfo.limit = val;
      this.search();
    },
    handleCurrentChange(val) {
      this.PageInfo.page = val;
      this.search();
    },
    addProduct(val) {
      if (val.id !== undefined) {
        this.addInfo = val;
      } else {
        this.addInfo = null;
      }
      this.isview = false;
    },
    cancel() {
      this.isview = true;
      this.getInfo();
    },
    //获取数据
    getInfo() {
      ProductList().then(res => {
        if (res.status === 200) {
          this.tableData = res.data.data.product_list;
          this.PageInfo = res.data.data.page_info;
          this.status = res.data.data.product_status_list;
          this.classification = res.data.data.product_term_list;
          this.classification_value = res.data.data.product_term_list[0].id;
          this.status_value = res.data.data.product_term_list[0].id;
        } else {
          alert("系统异常");
        }
      });
    },
    // 删除单个
    delSingel(val) {
      let arr = [];
      arr.push(val.id);
      let prames = {
        product_id_list: arr
      };
      DelProductInfo(prames).then(res => {
        this.$message({
          message: res.data.msg,
          type: res.data.type,
          customClass: "msgposition",
            center: true
        });
        this.getInfo();
      });
    },
    //删除商品
    delproduct() {
      let prames = {
        product_id_list: this.delProList
      };
      DelProductInfo(prames).then(res => {
        this.$message({
          message: res.data.msg,
          type: res.data.type,
          customClass: "msgposition",
            center: true
        });
        this.getInfo();
      });
    },
    //查询
    search() {
      let prames = {
        s_product_name: this.name_value,
        s_term_id: this.classification_value,
        s_product_status: this.status_value,
        p: this.PageInfo.page
      };
      SearchProductList(prames).then(res => {
        if (res.status === 200) {
          res.data.data.page_info.count = parseInt(
            res.data.data.page_info.count
          );
          this.tableData = res.data.data.product_list;
          this.PageInfo = res.data.data.page_info;
        } else {
          alert("系统异常");
        }
      });
    },
    //清空
    clear() {
      (this.classification_value = ""),
        (this.status_value = ""),
        (this.name_value = "");
    },
    //全部上下架
    ProductUpDown(val, data) {
      if (data !== undefined) {
        // debugger;
        let prames = {
          product_id_list: [data.id]
        };
        if (val === "2") {
          UpProductInfo(prames).then(res => {
            this.$message({
              message: res.data.msg,
              type: res.data.type,
              customClass: "msgposition",
            center: true
            });
            this.getInfo();
          });
        } else if (val == "1") {
          downProductInfo(prames).then(res => {
            this.$message({
              message: res.data.msg,
              type: res.data.type,
              customClass: "msgposition",
            center: true
            });
            this.getInfo();
          });
        }
      } else {
        let prames = {
          product_id_list: this.delProList
        };
        if (val === "1") {
          UpProductInfo(prames).then(res => {
            this.$message({
              message: res.data.msg,
              type: res.data.type,
              customClass: "msgposition",
            center: true
            });
            this.getInfo();
          });
        } else if (val == "0") {
          downProductInfo(prames).then(res => {
            this.$message({
              message: res.data.msg,
              type: res.data.type,
              customClass: "msgposition",
            center: true
            });
            this.getInfo();
          });
        }
      }
    }
  },
  computed: {
    itemColorFun() {
      let id = this.$store.getters.itemColor.id;
      switch (id) {
        case "0":
          return "productCategories_white";
        case "1":
          return "productCategories_black";
        default:
          return;
      }
    }
  }
};
</script>
<style scoped lang="less" >
.home {
  width: 100%;
  height: 100%;

  .datalist {
    margin-top: 20px;
  }
  .search_up_left_search {
    width: 560px;
    height: 44px;
    margin-right: 15px;
    /deep/ .el-input__inner:focus {
      // border: 1px solid #3ca860;
      background: transparent;
    }
    /deep/ .el-input__inner {
      border: 1px solid transparent;
      height: 100%;
      background: rgba(0, 0, 0, 0.02);
    }

    /deep/ .el-input__prefix {
      i {
        font-size: 20px;
        color: #3ca860;
        font-weight: 900;
        line-height: 44px;
      }
    }
  }
  .search_up_left_input {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;

    .el-select {
      margin-right: 16px;
      width: 288px;

      .el-input__suffix {
        .el-select__caret {
          color: #3ca860;
          font-weight: 500;
        }
      }
    }

    .query,
    .clear {
      width: 120px;
      height: 44px;
      font-size: 16px;
      font-weight: 500;
      border-radius: 8px;
      border: none;
      padding: 0;
    }

    .query {
      background: rgba(70, 185, 108, 1);
      color: #fff;
      margin-left: 16px;
    }

    .clear {
      background: transparent;
      border: 1px solid rgba(60, 168, 96, 1);
      color: rgba(70, 185, 108, 1);
      margin-left: 16px;
    }
  }

  .search_up_left_input_block {
    .el-select {
      .el-input__inner {
        color: rgba(255, 255, 255, 1);
      }
    }
  }
  .tag {
    display: flex;
    justify-content: flex-start;
    padding: 0;
  }
}
.productCategories_header /deep/ .productCategories_header_top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-input__inner {
    height: 44px;
    min-height: 32px;
    background: rgba(0, 0, 0, 0.02);
    opacity: 1;
    border-radius: 8px;
    color: rgba(0, 0, 0, 0.65);
    font-weight: 500;
    border: 1px solid transparent;
    font-size: 14px;
  }
  .el-input__inner::placeholder {
    font-size: 12px;
  }
  .el-select__caret {
    color: rgba(70, 185, 108, 1);
    font-weight: 500;
  }

  .el-button--primary {
    width: 140px;
    height: 44px;
    font-size: 16px;
    background: rgba(70, 185, 108, 1);
    opacity: 1;
    border-radius: 8px;
    border: none;
    margin-left: 16px;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    opacity: 1;
    padding: 0;
  }

  .is-plain {
    width: 140px;
    height: 44px;
    font-size: 16px;
    padding: 0;

    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(60, 168, 96, 1);
    opacity: 1;
    border-radius: 8px;
    font-weight: 500;
    color: rgba(70, 185, 108, 1);
    opacity: 1;
  }
}

.productCategories_header /deep/ .productCategories_header_down {
  .el-button {
    border: none;
    width: 140px;
    height: 44px;
    font-size: 16px;
    padding: 0;
  }

  .el-button--primary {
    background: rgba(70, 185, 108, 1);
    opacity: 1;
    border-radius: 8px;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);

    .el-icon-plus {
      font-size: 10px;
    }
  }

  .is-plain {
    border: 1px solid rgba(70, 185, 108, 1);
    opacity: 1;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 500;
    color: rgba(70, 185, 108, 1);
    margin-left: 16px;
  }
}

.productCategories_header::after {
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.05);
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}

.productCategories_header {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
  opacity: 1;
  border-radius: 8px;
  padding: 16px 32px 15px;
  position: relative;
  height: 148px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .productCategories_header_top,
  .productCategories_header_down {
    display: flex;
    .btnbg {
      width: 120px;
      height: 44px;
      background: rgba(70, 185, 108, 1);
      opacity: 1;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      opacity: 1;
      text-align: center;
      line-height: 44px;
    }
  }
}

.productCategories_table {
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
  opacity: 1;
  border-radius: 8px;
  margin-top: 20px;
  overflow: hidden;
}

//黑色  背景
/deep/ .productCategories_black {
  .productCategories_header {
    box-shadow: none;
    background: rgba(34, 38, 67, 1);
    .el-input__inner {
      background: rgba(255, 255, 255, 0.04);
      font-weight: 500;
      border: none;
      color: rgba(255, 255, 255, 0.65);
    }
    .el-input__inner::placeholder {
      font-weight: 500;
      color: rgba(255, 255, 255, 0.65);
      font-size: 12px;
    }
    .is-plain {
      background: rgba(34, 38, 67, 1);
    }
  }
  .datalist {
    box-shadow: none;
  }
  .operation_modify:focus,
  .operation_modify:hover {
    background: transparent;
    color: rgba(25, 95, 235, 1);
  }

  .operation_del:focus,
  .operation_del:hover {
    background: transparent;
    color: rgba(255, 255, 255, 0.65);
  }
}

@media screen and (max-width: 1440px) {
  /deep/ .home {
    span {
      font-size: 14px;
    }
    .search_up_left_search {
      min-width: 200px;
      height: 35px;
      .el-input__inner {
        height: 100%;
      }
      .el-input__prefix {
        i {
          line-height: 35px;
        }
      }
    }
    .search_up_left_input {
      .el-select {
        width: 150px;
        height: 35px;
        .el-input {
          height: 100%;
          .el-input__inner {
            height: 100%;
          }
          .el-input__suffix {
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
      .el-button {
        width: 80px;
        height: 35px;
      }
    }
    .productCategories_header_down {
      .el-button {
        width: 100px;
        height: 35px;
      }
    }
    .UpDown {
      .el-button {
        width: 50px;
        height: 28px;
      }
    }
  }
}
</style>

