<template>
  <div class="productCategoriesmain">
    <div :class="itemColorFun" class="indexproductCategories">
      <div class="productCategories_header">
        <div class="productCategories_header_top">
          <el-input
            class="search_up_left_search"
            placeholder="请输入产品名称"
            prefix-icon="el-icon-search"
            v-model="name_value"
            :style="{'background': storeItemList.itemColor.myproductbg}"
          ></el-input>

          <el-button type="primary" @click="search">搜索</el-button>
          <el-button plain @click="clear">清空</el-button>
        </div>
        <div class="productCategories_header_down">
          <el-button type="primary" icon="el-icon-plus" @click="addDuct(null)">添加分类</el-button>
          <el-button plain @click="AlldelInfo">批量删除</el-button>
        </div>
      </div>
      <div class="productCategories_table datalist">
        <el-table
          ref="multipleTable"
          :data="tableData3"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          :class="storeItemList.itemColor.id === '0' ? 'myProduct_tablelist' : 'myProduct_tablelist myProduct_tablelist_black'"
          :style="{'background': storeItemList.itemColor.myproductbg , 'font=size':'16px'}"
        >
          <el-table-column
            type="selection"
            width="60"
            align="center"
            :class-name="storeItemList.itemColor.id === '0'? 'checkboxbg' : 'checkboxbgblack'"
            :selectable="checkboxT"
          ></el-table-column>
          <el-table-column align="center" label="序号" width="80">
            <template slot-scope="scope">{{scope.row.num}}</template>
          </el-table-column>
          <el-table-column align="center" label="分类名称">
            <template slot-scope="scope">
              <div class="moretext3" style="text-align:left;">{{scope.row.term_name}}</div>
            </template>
          </el-table-column>
          <el-table-column label="产品数量" align="center" width="180">
            <template slot-scope="scope">{{scope.row.product_count}}</template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="300">
            <template slot-scope="scope">
              <el-button class="operation operation_modify" round @click="addDuct(scope.row)">修改</el-button>
              <el-button
                :disabled="scope.row.product_count != 0"
                class="operation operation_del"
                round
                @click="delInfo(scope.row)"
              >删除</el-button>
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
          layout="total, prev, pager, next, sizes, jumper"
          :total="PageInfo.count"
          background
          :popper-class="storeItemList.itemColor.id === '0' ?  'popper_white': 'popper_black'"
        ></el-pagination>
      </div>
    </div>
    <!-- 添加分类 -->
    <transition name="fade">
      <adddialog :dataInfo="modefl" v-if="dialogFormVisible" @sub="foromSub"></adddialog>
    </transition>
  </div>
</template>
<script>
import {
  ProductListproDuctterm,
  DelProductTerm,
  SearchProductListDuctterm
} from "../../apis/api";
export default {
  name: "productCategories",
  components: {
    adddialog: resolve => require(["../../components/Product/fenlei"], resolve)
  },
  data() {
    return {
      storeItemList: this.$store.getters,
      options: [],
      PageInfo: {},
      name_value: "",
      tableData3: [],
      multipleSelection: [],
      dialogFormVisible: false,
      modefl: null,
      delList: []
    };
  },
  created() {
    this.getInfoList();
  },
  methods: {
    //获取列表
    getInfoList() {
      ProductListproDuctterm().then(res => {
        this.tableData3 = res.data.data.product_term_list;
        this.PageInfo = res.data.data.page_info;
      });
    },
    //删除多个
    AlldelInfo() {
      let prames = {
        product_term_id_list: this.delList
      };
      DelProductTerm(prames).then(res => {
        this.$message({
          message: res.data.msg,
          type: res.data.type,
          customClass: "msgposition",
            center: true
        });
        this.getInfoList();
      });
    },
    handleSelectionChange(val) {
      let arr = [];
      val.forEach(element => {
        arr.push(element.id);
      });
      this.delList = arr;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.PageInfo.page = val;
      this.search();
    },
    //添加
    addDuct(val) {
      this.modefl = val;
      this.dialogFormVisible = true;
    },
    foromSub() {
      this.getInfoList();
      this.dialogFormVisible = false;
    },
    // 查询
    search() {
      let prams = {
        p: this.PageInfo.page,
        s_product_term_name: this.name_value
      };
      SearchProductListDuctterm(prams).then(res => {
        this.tableData3 = res.data.data.product_term_list;
        this.PageInfo = res.data.data.page_info;
      });
    },
    //回调勾选
    checkboxT(row, index) {
      if (row.product_count != 0) {
        return 0;
      } else {
        return 1;
      }
    },
    //清除
    clear() {
      this.name_value = "";
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

<style lang="less" scoped>
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
.indexproductCategories /deep/ .productCategories_header_top {
  .el-input__inner {
    height: 44px;
    min-height: 32px;
    background: rgba(0, 0, 0, 0.02);
    opacity: 1;
    border-radius: 8px;
    font-weight: 400;
  }
  .el-input__inner::placeholder {
    font-weight: 400;
  }

  .el-select__caret {
    color: rgba(70, 185, 108, 1);
    font-weight: 900;
  }

  .el-button--primary {
    width: 120px;
    height: 44px;
    font-size: 16px;
    background: rgba(70, 185, 108, 1);
    opacity: 1;
    border-radius: 8px;
    border: none;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    opacity: 1;
    padding: 0;
  }

  .is-plain {
    width: 120px;
    height: 44px;
    font-size: 16px;
    padding: 0;
    margin-left: 16px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(60, 168, 96, 1);
    opacity: 1;
    border-radius: 8px;
    font-weight: 500;
    color: rgba(70, 185, 108, 1);
    opacity: 1;
  }
}

.indexproductCategories /deep/ .productCategories_header_down {
  .el-button {
    width: 140px;
    height: 44px;
    font-size: 16px;
    padding: 0;
    border: none;
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
    margin-left: 16px;
    color: rgba(70, 185, 108, 1);
  }
}

.productCategoriesmain /deep/ .productCategories_black {
  .productCategories_header {
    box-shadow: none;
    background: rgba(34, 38, 67, 1);
    .el-input__inner {
      background: rgba(255, 255, 255, 0.04);
      font-weight: 900;
    }
    .el-input__inner:focus {
      background: transparent;
      font-weight: 900;
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

.indexproductCategories {
  width: 100%;

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
      justify-content: start;
      align-items: center;

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
}

@media screen and (max-width: 1440px) {
  /deep/ .indexproductCategories {
    span {
      font-size: 14px;
    }
    .productCategories_header_top {
      .el-button {
        width: 80px;
        height: 35px;
      }
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
    .productCategories_header_down {
      .el-button {
        width: 100px;
        height: 35px;
      }
    }
    .operation {
      width: 50px;
      height: 28px;
    }
  }
}
</style>

