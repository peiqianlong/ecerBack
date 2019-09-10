<template>
  <div :class="itemColorFun">
    <div v-if="dataimgshow" class="filelist">
      <div class="tit">我的文件</div>
      <div class="main">
        <template v-for="(item,index) in datalist">
          <div class="item" :key="index" @click="getFileData(item.id , item.folder_type)">
            <!-- <div class="img" @contextmenu.prevent.stop="rightumnu(index)"> -->
            <div class="img">
              <svg v-if="index == 0" class="icon" aria-hidden="true">
                <use xlink:href="#icon-media_icon_img" />
              </svg>
              <svg v-if="index == 1" class="icon" aria-hidden="true">
                <use xlink:href="#icon-media_icon_audio" />
              </svg>

              <svg v-if="index == 2" class="icon" aria-hidden="true">
                <use xlink:href="#icon-media_icon_vedio" />
              </svg>
              <svg v-if="index == 3" class="icon" aria-hidden="true">
                <use xlink:href="#icon-media_icon_article" />
              </svg>
            </div>
            <span>{{item.folder_name}}</span>
            <!-- <input type="text" v-model="item.folder_name" /> -->
          </div>
        </template>
      </div>
      <transition name="el-zoom-in-top">
        <ul ref="menu" class="numu" v-show="right" @click.stop="closenumu">
          <li index="0">新建文件夹</li>
          <li index="1">删除文件夹</li>
          <li index="2">移动文件夹</li>
          <li index="3">复制文件夹</li>
        </ul>
      </transition>

      <div class="filetree" v-show="fileterrshow" @click="closetree">
        <div class="tree" @click.stop>
          <el-tree class="box" :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
          <el-button plain>确定</el-button>
          <el-button plain>取消</el-button>
        </div>
      </div>
    </div>
    <div v-else style="margin-top:0;" class="filelist commonfile">
      <div class="tit" style="display:flex" @click="dataimgshow = !dataimgshow">
        <i class="back iconfont icon-fanhui1"></i>
        <div
          style="margin-left:13px;font-size:20px;font-weight:600;line-height:28px;color:rgba(0,0,0,1);"
        >{{filetype == 1 ? '我的图片' : filetype == 2 ? '我的音频' : filetype == 3 ? '我的视频' : filetype == 4 ? '我的文档' : '我的文件'}}</div>
      </div>
      <div class="main" v-if="filetype == 1">
        <el-upload
          class="upload-demo"
          action="/api/globalmedia/upload"
          :data="{'folder_type':filetype}"
          :on-success="getFileDatauplod"
          style="margin-bottom:20px;display: flex;justify-content:center;width:160px ;margin-right:28px;"
        >
          <div class="uploadimg">
            <i style="font-size:30px;" class="icon-jiahao1 iconfont"></i>
          </div>
        </el-upload>
        <template v-for="(item,index) in imglist">
          <div class="com_img_list" :key="index">
            <div>
              <div class="img">
                <img class="jqimg" v-lazy="srcstr(item,240,180)" alt />
              </div>
              <span>{{item.media_name}}</span>
              <div class="shodow">
                <a @click.stop="imgopen(item.media_url_http , index , 'imglist')">
                  <i class="icon-fangda iconfont"></i>
                </a>
              </div>
            </div>
          </div>
        </template>
      </div>
      <div class="main" v-if="filetype == 2">
        <el-upload
          class="upload-demo"
          action="/api/globalmedia/upload"
          :data="{'folder_type':filetype}"
          :on-success="getFileDatauplod"
          style="margin-bottom:20px;display: flex;justify-content:center;;width:160px;margin-right:25px"
        >
          <div class="uploadimg">
            <i style="font-size:30px;" class="icon-jiahao1 iconfont"></i>
          </div>
        </el-upload>
        <template v-for="(item,index) in imglist">
          <div class="com_img_list" :key="index">
            <div>
              <div
                @click.stop="openmuise(item)"
                class="img"
                style="display:flex;justify-content:center; align-items: center;background:rgba(245,245,245,1);
border:1px solid rgba(238,238,238,1);cursor:pointer;"
              >
                <a style="text-decoration: none">
                  <i class="iconfont icon-yinpin" style="font-size:20px;color:#3CA860"></i>
                </a>
                <!-- -->
              </div>
              <span>{{item.media_name}}</span>
            </div>
          </div>
        </template>
      </div>
      <div class="main" v-if="filetype == 3">
        <el-upload
          class="upload-demo"
          action="/api/globalmedia/upload"
          :data="{'folder_type':filetype}"
          :on-success="getFileDatauplod"
          style="margin-bottom:20px;display: flex;justify-content:center;width:160px;margin-right:25px;"
        >
          <div class="uploadimg">
            <i style="font-size:30px;" class="icon-jiahao1 iconfont"></i>
          </div>
        </el-upload>
        <template v-for="(item,index) in imglist">
          <div class="com_img_list" :key="index">
            <div>
              <div
                @click.stop="openvideo(item.media_url_http)"
                class="img"
                style="display:flex;justify-content:center; align-items: center;background:rgba(245,245,245,1);
border:1px solid rgba(238,238,238,1);cursor:pointer;"
              >
                <a style="text-decoration: none">
                  <i class="iconfont icon-shipin" style="font-size:20px;color:#3CA860"></i>
                </a>
              </div>
              <span>{{item.media_name}}</span>
            </div>
          </div>
        </template>
      </div>
      <div class="main" v-if="filetype == 4">
        <el-upload
          class="upload-demo"
          action="/api/globalmedia/upload"
          :data="{'folder_type':filetype}"
          :on-success="getFileDatauplod"
          style="margin-bottom:20px;display: flex;justify-content:center;width:160px;margin-right:25px; "
        >
          <div class="uploadimg">
            <i style="font-size:30px;" class="icon-jiahao1 iconfont"></i>
          </div>
        </el-upload>
        <template v-for="(item,index) in imglist">
          <div class="com_img_list" :key="index">
            <div>
              <div
                class="img"
                style="display:flex;justify-content:center; align-items: center;background:rgba(245,245,245,1);
border:1px solid rgba(238,238,238,1);"
              >
                <a :href="item.media_url_down" style="text-decoration: none">
                  <i
                    class="iconfont icon-jinlingyingcaiwangtubiao45"
                    style="font-size:20px;color:#3CA860"
                  ></i>
                </a>

                <!-- <img :src="item.media_url_http" alt /> -->
              </div>
              <span>{{item.media_name}}</span>
            </div>
          </div>
        </template>
      </div>
    </div>

    <div v-if="dataimgshow" class="filelist commonfile">
      <div class="tit">公共图片</div>
      <div class="main">
        <div class="com_img_list" v-for="(item,index) in globalimg" :key="index">
          <div class="img">
            <img class="jqimg" v-lazy="srcstr(item,240,180)" alt />
          </div>
          <!-- <span>{{item.media_folder_name}}</span> -->
          <div class="shodow">
            <a @click="imgopen(item.media_url_http,index ,'globa')">
              <i class="iconfont icon-fangda"></i>
            </a>
          </div>
        </div>
      </div>
    </div>

    <transition name="el-fade-in">
      <div class="imgdlo" v-if="ipenimgshow" @click.stop="ipenimgshow = !ipenimgshow">
        <div class="opnimg">
          <div class="imgdlo_left">
            <div @click.stop="prev(openimguel.index ,openimguel.type)">
              <img src="../../assets/img/previous@2x.png" alt />
            </div>
          </div>
          <img :src="openimguel.src" alt />
          <div class="imgdlo_right">
            <div @click.stop="next(openimguel.index ,openimguel.type)">
              <img src="../../assets/img/next@2x.png" alt />
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="el-fade-in">
      <div class="imgdlo" v-if="ipenmuiseshow" @click.stop="ipenmuiseshow = !ipenmuiseshow">
        <div style="height:100%;width:80%;background:#000;display:flex;flex-direction: column;">
          <div
            @click.stop
            style="flex:1;overflow:hidden;padding:5px;display:flex;justify-content: center;
  align-items:center;flex-direction:column"
          >
            <svg
              style="color:#3CA860;font-size:60px;cursor:pointer"
              class="icon"
              aria-hidden="true"
              @click="automusic"
            >
              <use xlink:href="#icon-yinpin" />
            </svg>
            <div style="margin-top:20px;color:#fff;">{{muiseurl.title}}</div>
          </div>
          <div
            @click.stop
            style="width:100%;    align-items: center;    justify-content: center;    display: flex;"
          >
            <aplayer
              class="music"
              style="width:100%;"
              :autoplay="autopalymusei"
              theme="#3CA860"
              :music="muiseurl"
            ></aplayer>
          </div>
        </div>
      </div>
    </transition>
    <transition name="el-fade-in">
      <div class="imgdlo" v-if="ipenvideoshow" @click.stop="ipenvideoshow = !ipenvideoshow">
        <div @click.stop style="width:80%;background:#fff;position:relative">
          <video-player
            class="video-player vjs-custom-skin"
            ref="videoPlayer"
            :playsinline="true"
            :options="playerOptions"
          ></video-player>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { ListMediaFolder, ListMedia } from "../../apis/api";
import aplayer from "vue-aplayer";
export default {
  name: "FileLibrary",
  components: {
    aplayer
  },
  data() {
    return {
      autopalymusei: false,
      right: false,
      imgs: [
        require("../../assets/img/img.png"),
        require("../../assets/img/audio.png"),
        require("../../assets/img/vedio.png"),
        require("../../assets/img/article.png")
      ],
      imgsblack: [
        require("../../assets/img/media_icon_img2@2x.png"),
        require("../../assets/img/media_icon_audio2@2x.png"),
        require("../../assets/img/media_icon_vedio2@2x.png"),
        require("../../assets/img/media_icon_article2@2x.png")
      ],
      datalist: [],
      currentindex: "",
      data: [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1"
                }
              ]
            }
          ]
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1"
                }
              ]
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1"
                }
              ]
            }
          ]
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1"
                }
              ]
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1"
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      fileterrshow: false,
      imglist: "",
      globalimg: "",
      dataimgshow: true,
      openimguel: "",
      ipenimgshow: false,
      fileid: "",
      filetype: "",
      mouseropen: false,
      ipenmuiseshow: false,
      ipenvideoshow: false,
      muiseurl: {
        src: "",
        title: ""
      },
      playerOptions: {
        playbackRates: [1.0, 2.0, 3.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4",
            src: "" //url地址
          }
        ],
        poster: "", //你的封面地址
        width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        }
      }
    };
  },
  created() {
    this.getInfo();
  },
  updated() {},
  methods: {
    getInfo() {
      ListMediaFolder().then(res => {
        // debugger
        (this.datalist = res.data.data.media_folder_list),
          (this.globalimg = res.data.data.global_media_list);
      });
    },
    //打开音乐
    openmuise(url) {
      this.ipenmuiseshow = true;
      this.muiseurl.src = url.media_url_http;
      this.muiseurl.title = url.media_name;
    },
    automusic() {
      this.autopalymusei = !this.autopalymusei;
    },
    //打开视频
    openvideo(src) {
      console.log(src);
      this.ipenvideoshow = true;
      this.playerOptions.sources[0].src = src;
      console.log(this.playerOptions.sources);
    },
    getFileData(val, filetype) {
      this.imglist = "";
      this.dataimgshow = !this.dataimgshow;
      this.fileid = val;
      this.filetype = filetype;
      ListMedia(val).then(res => {
        this.imglist = res.data.data.media_list;
      });
    },
    getFileDatauplod(response, file, fileList) {
      this.$message({
        message: response.msg,
        type: response.type,
        customClass: "msgposition",
        center: true
      });
      ListMedia(this.fileid).then(res => {
        this.imglist = res.data.data.media_list;
      });
    },
    //   右键菜单、
    rightumnu(index) {
      let e = event;
      this.right = false;
      setTimeout(() => {
        this.right = true;
        this.currentindex = index;
        this.$refs.menu.style.left = e.layerX + "px";
        this.$refs.menu.style.top = e.layerY + "px";
      }, 200);
    },
    // 关闭菜单
    closenumu(e) {
      this.right = false;
      let ID = null;
      if (e) {
        ID = e.target.attributes.index.value;
      }

      if (ID === "0") {
        this.creatFile();
      } else if (ID === "1") {
        this.removeFile();
      } else if (ID === "2") {
        this.fileterrshow = true;
      } else if (ID === "3") {
        this.fileterrshow = true;
      }
    },
    // 关闭复制
    closetree() {
      this.fileterrshow = false;
    },
    //创建文件夹
    creatFile() {
      this.$prompt("请输入文件夹名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          this.datalist.push({ title: value });
          this.$message({
            type: "success",
            message: "创建成功",
            customClass: "msgposition",
            center: true
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "创建失败",
            customClass: "msgposition",
            center: true
          });
        });
    },
    removeFile() {
      this.datalist.splice(this.currentindex, 1);
    },
    //y移动文件夹
    handleNodeClick(data) {
      console.log(data);
    },
    // 图片放大
    imgopen(src, index, type) {
      this.ipenimgshow = !this.ipenimgshow;
      this.openimguel = {
        src,
        index,
        type
      };
    },
    //切换图片
    next(index, type) {
      if (type == "globa") {
        let ide = 1 + index;
        if (this.globalimg.length <= ide) {
          this.$message({
            type: "info",
            message: "已经是最后一张了",
            customClass: "msgposition",
            center: true
          });
        } else {
          this.openimguel = {
            src: this.globalimg[ide].media_url_http,
            index: ide,
            type
          };
        }
      } else {
        let ide = 1 + index;
        if (this.imglist.length <= ide) {
          this.$message({
            type: "info",
            message: "已经是最后一张了",
            customClass: "msgposition",
            center: true
          });
        } else {
          this.openimguel = {
            src: this.imglist[ide].media_url_http,
            index: ide,
            type
          };
        }
      }
    },
    prev(index, type) {
      if (type == "globa") {
        let ide = index - 1;
        if (ide < 0) {
          this.$message({
            type: "info",
            message: "已经是第一张了",
            customClass: "msgposition",
            center: true
          });
        } else {
          this.openimguel = {
            src: this.globalimg[ide].media_url_http,
            index: ide,
            type
          };
        }
      } else {
        let ide = index - 1;
        if (ide < 0) {
          this.$message({
            type: "info",
            message: "已经是第一张了",
            customClass: "msgposition",
            center: true
          });
        } else {
          this.openimguel = {
            src: this.imglist[ide].media_url_http,
            index: ide,
            type
          };
        }
      }
    }
  },
  computed: {
    itemColorFun() {
      let id = this.$store.getters.itemColor.id;
      switch (id) {
        case "0":
          return "filelist_white";
        case "1":
          return "filelist_black";
        default:
          return;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.filelist {
  display: flex;
  position: relative;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;
  padding: 34px;

  .tit {
    font-size: 20px;
    font-weight: 600;
    line-height: 28px;
    color: rgba(0, 0, 0, 1);
    opacity: 1;
    cursor: pointer;
    .back {
      font-size: 20px;
      color: #3ca860;
    }
  }
  .main {
    display: flex;
    margin-top: 20px;
    flex-wrap: wrap;
    .item {
      cursor: pointer;
      border-radius: 6px;
      display: flex;
      justify-content: flex-start;
      width: 240px;
      height: 100px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(238, 238, 238, 1);
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.08);
      opacity: 1;
      border-radius: 4px;
      margin-right: 16px;
      display: flex;
      align-items: center;
      margin-bottom: 5px;
      .img {
        margin-left: 32px;
        .icon {
          font-size: 56px;
        }
      }
      span {
        margin-left: 25px;
        height: 20px;
        font-size: 14px;
        line-height: 16px;
        font-weight: 400;
        background: transparent;
        border: none;
        text-align: center;
        color: rgba(0, 0, 0, 1);
      }
    }
    .item:hover {
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.12);
    }
  }

  .numu {
    position: absolute;
    z-index: 1000;
    background-color: #fff;
    box-shadow: 2px 2px 2px #eee;
    padding: 10px;
    cursor: pointer;
    font-size: 14px;
    border-radius: 3px;
    li {
      line-height: 20px;
      list-style-type: none;
      border-bottom: 1px solid #eee;
      padding: 3px 0;
    }
  }
}
.filetree {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  left: 0;
  top: 0;
  .tree {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 800px;
    height: 500px;
    background-color: #fff;
    .box {
      width: 80%;
      margin: 0 auto;
      margin-top: 100px;
    }
  }
}
.commonfile {
  margin-top: 16px;
  padding-right: 0;
  padding-bottom: 10px;
  margin-bottom: 20px;
  .main {
    width: 100%;
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    .com_img_list {
      //视频播放
      display: flex;
      flex-direction: column;
      margin-bottom: 28px;
      margin-right: 28px;
      position: relative;
      overflow: hidden;
      .img {
        width: 160px;
        height: 100px;
        overflow: hidden;
        border-radius: 2px;
        position: relative;
        img {
          max-width: 100%;
          border: 1px solid #efefef;
          box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.16);
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          border: 6px solid #fff;
          max-height: 100%;
          transition: all 300ms ease;
        }
      }

      span {
        width: 160px;
        height: 17px;
        font-size: 14px;
        font-weight: 400;
        line-height: 16px;
        color: rgba(0, 0, 0, 0.65);
        margin-top: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: block;
      }
      .shodow {
        position: absolute;
        width: 160px;
        height: 100px;
        top: 0;
        left: 0px;
        // background: rgba(0, 0, 0, 0.7);
        transition: all 300ms ease;
        transform: translateY(-100%);
        opacity: 0;
        display: flex;
        justify-content: space-around;
        align-items: center;
        a {
          cursor: pointer;
          text-decoration: none;
          i {
            font-size: 30px;
            color: #3ca860;
          }
        }
      }
    }
    .com_file_list {
      width: 100%;
      .wendang {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 20px;
        i {
          font-size: 12px;
        }
        a {
          margin-left: 5px;
          font-size: 14px;
        }
      }
    }
    .uploadimg {
      width: 75px;
      height: 75px;
      border: 1px dashed rgba(0, 0, 0, 0.16078431372549018);
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 2px;
      .icon-jiahao1 {
        color: rgba(0, 0, 0, 0.45);
      }
    }
    .upload-file {
      flex: 1;
      /deep/ .el-upload {
        width: 100%;
        .file {
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
      }
    }
  }
}
/deep/.music {
  margin: 0;
  height: 66px;
  .aplayer-body {
    position: relative;
    .aplayer-info {
      background: #111111;
      height: 66px;
      padding: 0;
      margin: auto;
      padding-bottom: 10px;
      padding-left: 15px;
      .aplayer-music {
        padding-top: 15px;
        span {
          color: #fff;
        }
        .aplayer-author {
          display: none;
        }
        // display: none;
      }
      .aplayer-time {
        .aplayer-icon-mode {
          display: none;
        }
      }
    }
    .aplayer-play {
      margin: 0 -22px -15px 0;
    }
    .aplayer-icon {
    }
    .aplayer-pic {
      height: 66px;
      width: 40px;
      background: #111;
      // display: none;
      .aplayer-pause {
        width: 26px;
        margin: 0 -22px -15px 0;
        height: 26px;
        border: 2px solid #fff;
        bottom: 50%;
        right: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        .aplayer-icon {
          position: initial;
        }
      }
    }
    .aplayer-volume-bar-wrap::after {
      background: #444;
    }
  }
}
/deep/.video-js:hover .vjs-big-play-button,
.vjs-custom-skin > .video-js .vjs-big-play-button:focus,
.vjs-custom-skin > .video-js .vjs-big-play-button:active {
  background-color: transparent;
}
/deep/.video-player {
  .vjs-big-play-button {
    border: none;
    outline: none;
    background: url("../../assets/img/media_icon_vedio@2x.png") no-repeat center;
    background-size: 60px 60px;
    span {
      display: none;
    }
  }
}
/deep/ .vjs-custom-skin > .video-js .vjs-play-progress,
.vjs-custom-skin > .video-js .vjs-volume-level {
  background-color: #3ca860;
}
.el-upload {
  margin-top: 20px;
}
//图片弹出
.imgdlo {
  position: fixed;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.8);
  left: 0;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px;
  .opnimg {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  img {
    max-height: 100%;
    max-width: 100%;
    border: 10px solid #fff;
    border-radius: 2px;
  }
  .imgdlo_left,
  .imgdlo_right {
    height: 100%;
    width: 45%;
    display: flex;
    // justify-content: flex-start;
    align-items: center;
    overflow: hidden;
    position: absolute;
    top: 50%;
    border-radius: 50%;
    transform: translateY(-50%);
    div {
      width: 60px;
      height: 60px;
      display: none;
      cursor: pointer;
      img {
        border: none;
      }
    }
  }
  .imgdlo_left {
    left: 80px;
    justify-content: flex-start;
  }
  .imgdlo_right {
    right: 80px;
    justify-content: flex-end;
  }
  .imgdlo_left:hover {
    div {
      display: block;
    }
  }
  .imgdlo_right:hover {
    div {
      display: block;
    }
  }
}
.commonfile .main .com_img_list:hover {
  .shodow {
    transform: translateY(0%) !important;
    opacity: 1 !important;
  }
  .img {
    img {
      transform: translate(-50%, -50%) scale(1.6);
    }
  }
}
//黑色主题
.filelist_black {
  .filelist {
    background: rgba(34, 38, 67, 1);
    box-shadow: none;
    .tit {
      color: rgba(255, 255, 255, 1);
    }
    .main {
      .item {
        span {
          color: rgba(255, 255, 255, 0.85);
        }
      }

      .com_img_list {
        .img {
          img {
            box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.24);
            border: 1px solid rgba(255, 255, 255, 0.04);
          }
        }

        span {
          color: rgba(255, 255, 255, 0.65);
        }
      }
    }
  }
  .commonfile .main .uploadimg {
    border: 1px dashed rgba(255, 255, 255, 0.16078431);
    .icon-jiahao1 {
      color: rgba(255, 255, 255, 0.45);
    }
  }
}
</style>
