<template>
  <div class="indexhome" :class="itemColorFun">
    <template v-if="showpage">
      <div class="header">SUMMER,欢迎使用ecer!</div>

      <div class="start container-fluid" style="margin-top:0;">
        <div class="tit">了解一下，ecer可以为您提供哪些服务吧！</div>
        <div class="row start_main">
          <div
            class="list col-lg-4 col-md-4 col-sm-6 col-xs-12"
            v-for=" (item , index) in content"
            :key="index"
          >
            <div class="main_logo">
              <img :src="itemColorFun === 'index_white' ? item.img2 : item.img" alt />
            </div>
            <div class="content_tit">{{item.tit}}</div>
            <div class="content_main">{{item.main}}</div>
            <div class="btn" :class="index ==0?'btn1':''" @click="Go(index)">{{item.btnconten}}</div>
          </div>
        </div>
      </div>
      <div class="start more container-fluid">
        <div class="tit">在这里，您可以找到更多和ecer同样优质的产品！</div>
        <div class="row start_main">
          <div
            class="list col-lg-4 col-md-4 col-sm-6 col-xs-12"
            v-for=" (item , index) in 3"
            :key="index"
          >
            <div class="Seller">
              <img
                v-if="itemColorFun !== 'index_white'"
                src="../../assets/img/home_icon_maijiayi2@2x.png"
                alt
              />
              <img v-else src="../../assets/img/home_icon_maijiayi@2x.png" alt />
            </div>
            <div class="content_main content_main2">“买家易”是宜选网为外贸企业提供的真正按效果付费的外贸电子商务整合营销服务。</div>
            <div class="btn btnliaojie">去了解</div>
          </div>
        </div>
      </div>
      <div class="footer start">
        <div class="tit">更多疑问</div>
        <ul class="listcontent">
          <li class="content" v-for="(i,n) in footercontent" :key="n">{{i}}</li>
        </ul>
      </div>
    </template>
    <template v-else>
      <div class="pageadd">
        <img src="../../assets/img/bg@2x.png" alt />
        <p>您还没有添加任何产品哦！马上开始添加，丰富您的产品库吧</p>
        <div class="btn btn1" @click="Go(0)">添加博客</div>
      </div>
    </template>
  </div>
</template>
<script>
import { ProductList } from "../../apis/api";
export default {
  name: "blogindex",
  data() {
    return {
      content: [
        {
          img: require("../../assets/img/home_icon_add2@2x.png"),
          img2: require("../../assets/img/home_icon_add@2x.png"),
          tit: "信息添加",
          main:
            "您需要完成公司信息、产品信息等内容的添加工作，以让客户更好的了解您的商城。",
          btnconten: "添加博客"
        },
        {
          img: require("../../assets/img/home_icon_write2@2x.png"),
          img2: require("../../assets/img/home_icon_write@2x.png"),
          tit: "网站编辑",
          main:
            "您可以选择模板库中的所有模板，来给客户展示您的商城。完成模板选择后，您可以快速进行网站编辑，编辑属于您的个性化商城，吸引更多客户。",
          btnconten: "开始编辑"
        },
        {
          img: require("../../assets/img/home_icon_publish2@2x.png"),
          img2: require("../../assets/img/home_icon_publish@2x.png"),
          tit: "网站发布",
          main: "将您的网站发布出来吧，让更多人进入您的网站，查看您的产品。",
          btnconten: "去发布"
        }
      ],
      footercontent: [
        "网站发布需要提前准备什么工作，具体步骤是怎么样，ecer帮助申请域名？",
        "如何选择适合自己的网站？",
        "如何进行网站编辑，具体的操作指南？",
        "网站发布需要提前准备什么工作？"
      ],
      showpage: true
    };
  },
  created() {
    this.getlist();
  },
  methods: {
    Go(index) {
      if (index === 0) {
        this.$router.push("/blog/myBlog");
      } else if (index === 1) {
        this.$router.push("/WebsiteEditor");
      } else if (index === 2) {
      }
    },
    getlist() {
      ProductList().then(res => {
        if (res.data.data.product_list.length <= 0) {
          this.showpage = false;
        } else {
          this.showpage = true;
        }
      });
      let id = this.$route.params.type;
      if (id == ":blog") {
        this.reload();
      }
    }
  },
  computed: {
    itemColorFun() {
      let id = this.$store.getters.itemColor.id;
      switch (id) {
        case "0":
          return "index_white";
        case "1":
          return "index_black";
        default:
          return;
      }
    }
  }
};
</script>
<style lang="less" scoped>
// @import "../../less/Index/index.less";
// 总体编辑
.indexhome {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .header {
    width: 100%;
    font-weight: 600;
    color: rgba(60, 168, 96, 1);
    opacity: 1;
    border-radius: 4px;
    text-align: left;
    position: relative;
    font-size: 28px;
    line-height: 28px;
    margin-bottom: 12px;
  }

  .start {
    width: 100%;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
    opacity: 1;
    border-radius: 4px;
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    padding: 34px;
    height: 380px\0;
    .tit {
      font-size: 20px;
      font-weight: 600;
      line-height: 28px;
      opacity: 1;
      text-align: left;
      margin-bottom: 16px;
      margin-left: 0;
      margin-right: 0;
    }

    .row {
      flex: 1;
      margin: 0;
      .list {
        height: 100%;
        padding: 0;
        padding: 0 34px;
        .main_logo {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          margin: auto;
          margin-top: 10px;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .content_tit {
          font-size: 16px;
          line-height: 22px;
          color: rgba(0, 0, 0, 0.85);
          font-weight: 600;
          margin-top: 34px;
          margin-bottom: 12px;
        }

        .content_main {
          width: 100%;
          font-size: 14px;
          height: 64px;
          font-weight: 400;
          line-height: 22px;
          color: rgba(0, 0, 0, 0.65);
          // min-height: 100px;
          overflow: hidden;
          text-overflow: ellipsis; //文本溢出显示省略号
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
        }
        .content_main2 {
          height: 40px;
          -webkit-line-clamp: 2;
          height: 42px;
        }
        .btn {
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(60, 168, 96, 1);
          color: rgba(60, 168, 96, 1);
          opacity: 1;
          border-radius: 4px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: auto;
          font-size: 14px;
          width: 100px;
          height: 32px;
          line-height: 32px;
          // margin-bottom: 24px;
          margin-top: 34px;
          position: relative;
          z-index: 5;
          overflow: hidden;
        }
        .btn:before {
          content: "";
          display: block;
          width: 0;
          height: 0;
          border-radius: 50%;
          position: absolute;
          background: rgba(32, 137, 67, 1);
          background: transparent\0;
          z-index: -1;
          transition: all 200ms linear;
        }
        .btn:hover {
          color: #fff;
          color: rgba(32, 137, 67, 1) \9;
        }
        .btn:hover::before {
          width: 100px;
          height: 100px;
          border-radius: 0%;
        }
        .btn.active,
        .btn:active {
          box-shadow: none;
        }
        .btn1 {
          background: rgba(60, 168, 96, 1);
          color: #fff;
        }
      }
    }
  }

  .more {
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    height: 314px\0;
    .row {
      .list {
        .Seller {
          width: 65px;
          height: 50px;
          margin: 10px auto 34px;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .btnliaojie {
        }
      }
    }
  }

  .footer {
    width: 100%;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    opacity: 1;
    border-radius: 4px;
    margin-top: 16px;
    margin-bottom: 20px;
    padding-bottom: 16px;
    .listcontent {
      margin: 0;
      padding-left: 0px;
      margin-top: 4px;
      display: flex;
      flex-wrap: wrap;
      .content {
        white-space: nowrap;
        height: 20px;
        width: 50%;
        min-width: 500px;
        flex-shrink: 0;
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
        color: rgba(0, 0, 0, 0.65);
        opacity: 1;
        margin-bottom: 8px;
        text-align: left;
        list-style: none;
        position: relative;
        padding-left: 8px;
      }
      .content::before {
        content: "";
        left: 0px;
        position: absolute;
        display: block;
        top: 50%;
        transform: translateY(-50%);
        width: 4px;
        height: 4px;
        background: rgba(60, 168, 96, 1);
        border-radius: 50%;
      }
    }
  }
  .pageadd {
    margin-top: 104px;
    height: 100%;

    img {
      width: 360px;
      height: 252px;
    }
    p {
      width: 240px;
      height: 50px;
      font-size: 16px;
      font-weight: 400;
      line-height: 28px;
      color: rgba(0, 0, 0, 0.65);
      margin: 32px auto 24px;
    }
    .btn {
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(60, 168, 96, 1);
      color: rgba(60, 168, 96, 1);
      opacity: 1;
      border-radius: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: auto;
      font-size: 14px;
      width: 100px;
      height: 32px;
      line-height: 32px;
      // margin-bottom: 24px;
      margin-top: 34px;
      position: relative;
      z-index: 5;
      overflow: hidden;
    }
    .btn:before {
      content: "";
      display: block;
      width: 0;
      height: 0;
      border-radius: 50%;
      position: absolute;
      background: rgba(32, 137, 67, 1);
      z-index: -1;
      transition: all 200ms linear;
    }
    .btn:hover {
      // background: rgba(32, 137, 67, 1);
      // border: 1px solid transparent;
      color: #fff;
    }
    .btn:hover::before {
      width: 100px;
      height: 100px;
      border-radius: 0%;
    }
    .btn.active,
    .btn:active {
      box-shadow: none;
    }
    .btn1 {
      background: rgba(60, 168, 96, 1);
      color: #fff;
    }
  }
}

//黑色
.index_black {
  .header {
    color: rgba(26, 194, 87, 1);
  }
  .header,
  .start,
  .footer {
    box-shadow: none;
  }
  .start {
    background: rgba(34, 38, 67, 1);

    .tit {
      color: rgba(255, 255, 255, 1);
    }

    .row {
      .list {
        .content_tit {
          color: rgba(255, 255, 255, 0.85);
        }

        .content_main {
          color: rgba(255, 255, 255, 0.65);
        }

        .btn {
          background: rgba(34, 38, 67, 1);
          color: rgba(26, 194, 87, 1);
        }
        .btn1 {
          background: rgba(26, 194, 87, 1);
          color: rgba(255, 255, 255, 1);
        }
      }
    }
  }

  .footer .listcontent .content {
    color: rgba(255, 255, 255, 0.65);
  }
}
</style>


