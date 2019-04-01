<template>
  <div class="hello">
    <el-button-group class="topButtongroup">
      <el-button class='topButton currentBtn' type="primary" @click="changePageType">预报分析</el-button>
      <el-button class='topButton' type="primary" @click="changePageType">实况观测</el-button>
      <el-button class='topButton' type="primary" @click="changePageType">指导预测</el-button>
      <el-button class='topButton' type="primary" @click="changePageType">历史个例</el-button>
      <el-button class='topButton' type="primary" @click="changePageType">本地产品</el-button>
    </el-button-group>

    <el-button-group class="topButtongroup2">
      <el-button class='topButton2 currentBtn2' type="primary" @click="changePageType2">EC细网格</el-button>
      <el-button class='topButton2' type="primary" @click="changePageType2">日本模式</el-button>
      <el-button class='topButton2' type="primary" @click="changePageType2">NCEP</el-button>
      <el-button class='topButton2' type="primary" @click="changePageType2">德国</el-button>
      <el-button class='topButton2' type="primary" @click="changePageType2">华东区域</el-button>
      <el-button class='topButton2' type="primary" @click="changePageType2">华东区域</el-button>
      <el-button class='topButton2' type="primary" @click="changePageType2">华中区域</el-button>
      <el-button class='topButton2' type="primary" @click="changePageType2">集合预报</el-button>
    </el-button-group>

    <div class="paremsPanel">
      <div class="leftPanel">
        <ul class="panel-item">
          <li class="panel-top">
            <span class="icon-js"></span>
            <span>降水</span>
            <span class="js-line"></span>
          </li>
          <li class="panel-bottom">
            <span>降雨量</span>
            <span>降雪量</span>
            <span>降水相态</span>
          </li>
        </ul>
        <ul class="panel-item">
          <li class="panel-top">
            <span class="icon-wdc"></span>
            <span>温度场</span>
            <span class="wdc-line"></span>
          </li>
          <li class="panel-bottom">
            <span>24小时变温</span>
            <span>最高气温</span>
            <span>最低气温</span>
            <span>最低气温</span>
          </li>
        </ul>
        <ul class="panel-item">
          <li class="panel-top">
            <span class="icon-xsc"></span>
            <span>形式场</span>
            <span class="xsc-line"></span>
          </li>
          <li class="panel-bottom">
            <span>海平面气压</span>
            <span>高度场</span>
            <span>风场</span>
            <span>10m风场</span>
            <span>高度场+风场</span>
          </li>
        </ul>
        <ul class="panel-item">
          <li class="panel-top">
            <span class="icon-wlzdl"></span>
            <span>物理诊断量</span>
            <span class="wlzdl-line"></span>
          </li>
          <li class="panel-bottom">
            <span style="width: 20%">cape</span>
            <span style="width: 20%">cin</span>
            <span style="width: 20%">k指数</span>
            <span style="width: 20%">si指数</span>
            <span style="width: 20%">散度</span>
            <span style="width: 20%">涡度</span>
            <el-collapse-transition>
              <div v-show="ismore">
                <span class="transition-box">假相当温度</span>
                <span class="transition-box">温度平流</span>
                <span class="transition-box">水汽通量散度</span>
                <span class="transition-box">可降水量</span>
                <span class="transition-box">垂直速度</span>
              </div>
            </el-collapse-transition>
          </li>
          <span v-if="!ismore" class="morebtn el-icon-arrow-down" title="显示" @click="ismore = !ismore"></span>
          <span v-else class="morebtn el-icon-arrow-up" title="隐藏" @click="ismore = !ismore"></span>
        </ul>
        <ul class="panel-item">
          <li class="panel-top">
            <span class="icon-yl"></span>
            <span>云量</span>
            <span class="yl-line"></span>
          </li>
          <li class="panel-bottom">
            <span>总云量</span>
            <span>低云量</span>
          </li>
        </ul>
        <ul class="panel-item">
          <li class="panel-top">
            <span class="icon-zht"></span>
            <span>综合图</span>
            <span class="zht-line"></span>
          </li>
          <li class="panel-bottom">
            <span>高度场+风场</span>
            <span>高度场+温度场</span>
          </li>
        </ul>
      </div>
      <div class="rightPanel">
        <HxSider :options="hpas" :currentSelect="hpa" @change="changeHpa"></HxSider>
      </div>

    </div>

    <div class="rightToolBar">
      <div class="leftToolbars">
        <div class="rightToolBtn">
          <span>填色</span>
          <el-switch width="32"
                     v-model="Coloring"
                     inactive-color="white"
                     active-color="white">
          </el-switch>
        </div>
        <div class="rightToolBtn">
          <span>风羽</span>
          <el-switch
            v-model="windFeather"
            width="32"
            inactive-color="white"
            active-color="white">
          </el-switch>
        </div>
        <div class="rightToolBtn">
          <span>等值线</span>
          <el-switch
            v-model="Contour"
            width="32"
            inactive-color="white"
            active-color="white">
          </el-switch>
        </div>
        <div class="rightToolBtn">
          <span>格点</span>
          <el-switch
            v-model="gridPoint"
            width="32"
            inactive-color="white"
            active-color="white">
          </el-switch>
        </div>
      </div>
      <div v-show="isExpand" class="hideMenu">
        <div class="rightToolBtn">
          <span>省界</span>
          <el-switch
            width="32"
            v-model="provincialBoundary"
            inactive-color="white"
            active-color="white">
          </el-switch>
        </div>
        <div class="rightToolBtn">
          <span>县界</span>
          <el-switch
            v-model="countyBoundary"
            width="32"
            inactive-color="white"
            active-color="white">
          </el-switch>
        </div>
        <div class="rightToolBtn">
          <span>站名</span>
          <el-switch
            v-model="siteName"
            width="32"
            inactive-color="white"
            active-color="white">
          </el-switch>
        </div>
        <div class="rightToolBtn">
          <span>站号</span>
          <el-switch
            v-model="stationNum"
            width="32"
            inactive-color="white"
            active-color="white">
          </el-switch>
        </div>
      </div>

      <div class="rightToolBtn">
        <el-button type="text" class='isExpandBtn' @click="isExpand = !isExpand"
                   v-text="isExpand?'收起':'展开'"></el-button>
      </div>
    </div>

    <div class="rightToolBar2">
      <div class="rightToolBtn21" title="单点时序图"></div>
      <div class="rightToolBtn22" title="模式探空"></div>
      <div class="rightToolBtn23" title="累计降水"></div>
      <div class="rightToolBtn24" title="模式对比"></div>
      <div class="rightToolBtn25" title="剖面图"></div>
      <div class="rightToolBtn26" title="底图配置"></div>
      <div class="rightToolBtn27" title="保存图片"></div>
    </div>

    <div class="rightToolBar3">
      <el-slider style="z-index:2" @change="selectColor"
                 v-model="colorRanger"
                 range
                 vertical
                 height="15rem"
                 :max="7">
      </el-slider>
      <div class="colorBlock">
        <div class="color1"></div>
        <div class="color2"></div>
        <div class="color3"></div>
        <div class="color4"></div>
        <div class="color5"></div>
        <div class="color6"></div>
        <div class="color7"></div>
      </div>
    </div>

    <div class="footerPanel">
      <div class="leftFooterPanel">
        <el-date-picker
          v-model="seleteDate"
          @change="changeDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
        <el-button-group class="topButtongroup3">
          <el-button class='topButton3 currentBtn3' type="primary" @click="changePageType3">08</el-button>
          <el-button class='topButton3' type="primary" @click="changePageType3">20</el-button>
        </el-button-group>
      </div>
      <div class="ceterFooterPanel">
        <div class="centerplayBtns">
          <div class="playBtn1" @click="stepLast"></div>
          <div class="playBtn2" @click="play"></div>
          <div class="playBtn3" @click="stepNext"></div>
        </div>
        <el-button-group class="topButtongroup4">
          <el-button class='topButton4 currentBtn4' type="primary" @click="changePageType4">3h</el-button>
          <el-button class='topButton4' type="primary" @click="changePageType4">6h</el-button>
          <el-button class='topButton4' type="primary" @click="changePageType4">12h</el-button>
          <el-button class='topButton4' type="primary" @click="changePageType4">24h</el-button>
        </el-button-group>
      </div>
      <div class="rightFooterPanel">
        <SliderAxis ref="timeSlider" class="rightSlider" :options='options'
                    @change="changeTime"></SliderAxis>
      </div>
    </div>
  </div>

</template>

<script>
  import HxSider from '../components/HxSider'
  import SliderAxis from '../components/SliderAxis'

  export default {
    name: 'NumForecast',
    components: {HxSider, SliderAxis},
    data() {
      let date = new Date();
      return {
        heightVal: 0,//高度值
        Coloring: false,//填色
        windFeather: false,
        Contour: false,
        gridPoint: false,
        provincialBoundary: false,
        countyBoundary: false,
        siteName: false,
        stationNum: false,

        ismore: false,

        isExpand: true,//右顶部栏是否展开，默认为true展开

        colorRanger: [2, 5], //颜色范围选择

        seleteDate: date.getFullYear() + '-' + (date.getMonth() >= 10 ? date.getMonth() : '0' + date.getMonth()) + '-' + (date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()),

        options: [],//时间轴选项list
        hpas: ['200', '500', '700', '850', '925', '1000', '地面'],
        hpa: '200'
      }
    },
    mounted() {
      this.currentBtn1 = document.getElementsByClassName("currentBtn")[0];
      this.currentBtn2 = document.getElementsByClassName("currentBtn2")[0];
      this.currentBtn3 = document.getElementsByClassName("currentBtn3")[0];
      this.currentBtn4 = document.getElementsByClassName("currentBtn4")[0];
      this.updateSlider();
    },
    methods: {
      /**
       * 预报分析/实况预测按钮点击事件
       */
      changePageType(e) {
        if (this.currentBtn1) {
          this.currentBtn1.classList.remove('currentBtn');
        }
        this.currentBtn1 = e.currentTarget;
        this.currentBtn1.classList.add('currentBtn');

      },
      /**
       * EC细网格/日本模式的切换
       */
      changePageType2(e) {
        if (this.currentBtn2) {
          this.currentBtn2.classList.remove('currentBtn2');
        }
        this.currentBtn2 = e.currentTarget;
        this.currentBtn2.classList.add('currentBtn2');

      },
      /**
       *高度hpa改变
       */
      changeHpa() {

      },

      changePageType3(e) {
        if (this.currentBtn3) {
          this.currentBtn3.classList.remove('currentBtn3');
        }
        this.currentBtn3 = e.currentTarget;
        this.currentBtn3.classList.add('currentBtn3');
        this.updateSlider()
      },
      changePageType4(e) {
        if (this.currentBtn4) {
          this.currentBtn4.classList.remove('currentBtn4');
        }
        this.currentBtn4 = e.currentTarget;
        this.currentBtn4.classList.add('currentBtn4');
        this.updateSlider();
      },
      changeDate() {
        this.updateSlider();
      },
      updateSlider() {
        this.options = [];
        let timeType = parseInt(this.currentBtn3.textContent);
        let stamp = new Date(this.seleteDate).getTime() + (timeType === 8 ? 0 : 12 * 3600000);
        let timeRangeType = parseInt(this.currentBtn4.textContent.replace('h', ''));
        let len = (24 / timeRangeType) * (timeRangeType === 3 ? 5 : 10);
        for (let i = 0; i < len; i++) {
          let date = new Date(stamp + i * timeRangeType * 3600000);
          let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
          let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
          this.options.push(day.toString() + hours.toString());
        }
      },

      /**
       * 选择颜色范围
       */
      selectColor() {
      },
      /**
       * 时间轴数据变化
       */
      changeTime(data) {
      },
      stepLast() {
        this.$refs["timeSlider"].stepLast();
      },
      stepNext() {
        this.$refs["timeSlider"].stepNext();
      },
      /**
       * 播放
       */
      play() {

      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

  /* 修改elementui组件样式*/
  .el-switch__core {
    font-size: 12px;
    height: 16px;
    width: 30px;
  }

  .el-switch__core:after {
    width: 12px;
    height: 12px;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .el-switch.is-checked .el-switch__core::after {
    margin-left: -14px;
  }

  .topButtongroup {
    position: absolute;
    top: 0.6rem;
    left: 0.6rem;
  }

  .topButtongroup.el-button-group .topButton {
    margin-right: 0.5rem;
    border-radius: 0;
    border: rgba(255, 255, 255, 0.5) 0.1rem;
    background: rgba(0, 0, 0, 0.5);
    font-size: 1rem;
  }

  .topButtongroup.el-button-group .topButton.currentBtn {
    background: url(../assets/images/选中.png) center no-repeat;
  }

  .topButtongroup2 {
    position: absolute;
    top: 3rem;
    left: 0.6rem;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 1rem;
    font-size: 8px;
  }

  .topButtongroup2.el-button-group .topButton2 {
    border-radius: 1rem;
    background: rgba(0, 0, 0, 0);
    border: 0;
    padding: 0.4rem 0.6rem;
  }

  .topButtongroup2.el-button-group .topButton2.currentBtn2 {
    background: #335d9b;
    border-radius: 1rem;
  }


  .paremsPanel {
    position: absolute;
    top: 5rem;
    left: 0.6rem;
    color: white;
    display: flex;
  }

  .panel-item {
    margin: 0;
    padding: 0;
    margin-bottom: 0.5rem;
    position: relative;
  }

  .panel-top {
    height: 2rem;
    line-height: 2.4em;
    width: 11rem;
    display: flex;
    font-size: 0.9rem;
  }

  .leftPanel {
    padding: 0.2rem;
    background: rgba(0, 0, 0, 0.5);

  }

  .panel-bottom {
    line-height: 1.5em;
    font-size: 0.3rem;
    width: 11rem;
    display: flex;
    flex-wrap: wrap;
    color: #e2dfda
  }

  .icon-js {
    width: 1rem;
    padding-left: 0.5rem;
    background: url(../assets/images/降水@2x.png) center no-repeat;
  }

  .js-line {
    height: 0.1rem;
    width: calc(100% - 4rem);
    background-color: #7ecff9;
    margin-top: 1em;
    margin-left: 0.4rem;
  }

  .panel-bottom span {
    padding-left: 0.8rem;
    cursor: pointer;
    text-align: left;
  }

  .panel-bottom span:hover {
    color: #5cca8e
  }

  .icon-wdc {
    width: 1rem;
    padding-left: 0.5rem;
    background: url(../assets/images/温度场@2x.png) center no-repeat;
  }

  .wdc-line {
    height: 0.1rem;
    width: calc(100% - 5rem);
    background-color: #f9a87e;
    margin-top: 1em;
    margin-left: 0.5rem;
  }

  .icon-xsc {
    width: 1rem;
    padding-left: 0.5rem;
    background: url(../assets/images/形式场@2x.png) center no-repeat;
  }

  .xsc-line {
    height: 0.1rem;
    width: calc(100% - 5rem);
    background-color: #f7fc79;
    margin-top: 1em;
    margin-left: 0.5rem;
  }

  .icon-wlzdl {
    width: 1rem;
    padding-left: 0.5rem;
    background: url(../assets/images/物理诊断量@2x.png) center no-repeat;
  }

  .wlzdl-line {
    height: 0.1rem;
    width: calc(100% - 7rem);
    background-color: #a9fca9;
    margin-top: 1em;
    margin-left: 0.5rem;
  }

  .icon-yl {
    width: 1rem;
    padding-left: 0.5rem;
    background: url(../assets/images/云量@2x.png) center no-repeat;
  }

  .morebtn {
    position: absolute;
    right: 0.8rem;
    bottom: 0.1rem;
    font-size: 0.3rem;
    color: #e2dfda;
    cursor: pointer;
  }

  .yl-line {
    height: 0.1rem;
    width: calc(100% - 4rem);
    background-color: #a9cafc;
    margin-top: 1em;
    margin-left: 0.5rem;
  }

  .icon-zht {
    width: 1rem;
    padding-left: 0.5rem;
    background: url(../assets/images/综合图@2x.png) center no-repeat;
  }

  .zht-line {
    height: 0.1rem;
    width: calc(100% - 5rem);
    background-color: #fca9e0;
    margin-top: 1em;
    margin-left: 0.5rem;
  }

  .rightToolBar {
    position: absolute;
    display: flex;
    right: 1rem;
    top: 1rem;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 1rem;
  }

  .rightToolBtn {
    margin: 0.2rem 0.4rem;
    font-size: 0.4rem;
    color: #fff;
  }

  .isExpandBtn {
    cursor: pointer;
    height: 1rem;
    line-height: 0.3rem;
    color: #fff;
  }

  .isExpandBtn:hover {
    color: #5cca8e
  }

  .rightToolBar2 {
    position: absolute;
    right: 1rem;
    top: 4rem;
    display: block;
  }

  .rightToolBar2 div {
    width: 3rem;
    height: 2.3rem;
    cursor: pointer;

  }

  .rightToolBtn21 {
    background: url(../assets/images/单点时序图@2x.png) center no-repeat;
  }

  .rightToolBtn22 {
    background: url(../assets/images/模式探空@2x.png) center no-repeat;
  }

  .rightToolBtn23 {
    background: url(../assets/images/累计降水@2x.png) center no-repeat;
  }

  .rightToolBtn24 {
    background: url(../assets/images/模式对比@2x.png) center no-repeat;
  }

  .rightToolBtn25 {
    background: url(../assets/images/剖面图@2x.png) center no-repeat;
  }

  .rightToolBtn26 {
    background: url(../assets/images/底图配置@2x.png) center no-repeat;
  }

  .rightToolBtn27 {
    background: url(../assets/images/保存图片@2x.png) center no-repeat;
  }

  .rightToolBar3 {
    position: absolute;
    right: 1.3rem;
    bottom: 5.5rem;
    display: block;
  }

  .rightToolBar3 .el-slider__bar {
    visibility: hidden;
  }

  .rightToolBar3 .el-slider.is-vertical .el-slider__runway {
    width: 1px
  }

  .rightToolBar3 .el-slider.is-vertical .el-slider__button-wrapper {
    left: -1.1rem;
  }

  .colorBlock {
    position: absolute;
    left: 0.4rem;
    height: 15rem;
    width: 1.2rem;
    bottom: 0;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
  }

  .colorBlock div {
    flex: 1;
    display: flex;
  }

  .color1 {
    background-color: red;
    border-radius: 1rem 1rem 0 0;

  }

  .color2 {
    background-color: indianred;

  }

  .color3 {
    background-color: yellow;

  }

  .color4 {
    background-color: green;

  }

  .color5 {
    background-color: deepskyblue;

  }

  .color6 {
    background-color: dodgerblue;

  }

  .color7 {
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 0 0 1rem 1rem;
  }

  .footerPanel {
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .leftFooterPanel {
    float: left;
    width: 8rem;
    height: 100%;
    margin: 0.6rem 0.5rem 0.4rem 2rem;
  }

  .leftFooterPanel .el-date-editor {
    width: 8rem;
  }

  .leftFooterPanel input {
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    outline: none;
  }

  .topButtongroup3 {
    background: rgba(0, 0, 0, 0.5);
    border-radius: 1rem;
    font-size: 8px;
    margin-top: 0.3rem;
  }

  .topButtongroup3.el-button-group .topButton3 {
    border-radius: 1rem;
    background: rgba(0, 0, 0, 0);
    border: 0;
    padding: 0.2rem 0.6rem;
  }

  .topButtongroup3.el-button-group .topButton3.currentBtn3 {
    background: #335d9b;
    border-radius: 1rem;
  }

  .playBtn1 {
    width: 3rem;
    height: 1.8em;
    background: url(../assets/images/退步@2x.png) center no-repeat;
    margin-left: 0.8rem;
    cursor: pointer;
  }

  .playBtn2 {
    width: 3rem;
    height: 1.8em;
    background: url(../assets/images/播放@2x.png) center no-repeat;
    cursor: pointer;
  }

  .playBtn3 {
    width: 3rem;
    height: 1.8em;
    background: url(../assets/images/进步@2x.png) center no-repeat;
    cursor: pointer;
  }

  .ceterFooterPanel {
    float: left;
    width: 11rem;
    height: 100%;
    margin: 0.6rem 0.5rem 0.4rem 0;
  }

  .centerplayBtns {
    display: flex;

  }

  .topButtongroup4 {
    background: rgba(0, 0, 0, 0.5);
    border-radius: 1rem;
    font-size: 8px;
    margin-top: 0.3rem;
  }

  .topButtongroup4.el-button-group .topButton4 {
    border-radius: 1rem;
    background: rgba(0, 0, 0, 0);
    border: 0;
    padding: 0.2rem 0.6rem;
    cursor: pointer;
  }

  .topButtongroup4.el-button-group .topButton4.currentBtn4 {
    background: #335d9b;
    border-radius: 1rem;
  }

  .rightFooterPanel {
    position: absolute;
    right: 3rem;
    width: calc(100% - 26rem);
    top: 1.2rem;
    margin-top: 0.8rem;
  }

  .panel-bottom .transition-box {
    width: 42%;
    display: inline-block;
    text-align: left;
    padding-left: 10px;
  }

  .leftToolbars {
    position: relative;
    display: flex;
  }

  .hideMenu {
    display: flex;
    animation: all .5s;
  }


</style>
