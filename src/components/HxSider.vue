<template>
  <div class="hxSider-container">
    <div class="silder-title">
      <span>高度（h/pa）</span>
    </div>
    <div class="silder-content">
      <div class="hpaProcess"></div>
      <div class="hpa-slider-button" @mousedown="onmousedown"></div>
      <div class="hpa-optionItems">
        <div v-for="option in options" class="hpa-optionItem" @click="selectNode">
          <span class="hpa-slider-item"></span>
          <span class="hpa-slider-stop"></span>
          <span class="hpa-slider-index" :title='option' v-text="option"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HxSider",
    props: {
      options: {
        default: [],
      },
      currentSelect: {
        default: '200'
      }
    },
    watch: {
      currentSelect: function (newVal, oldVal) {
        let items = document.getElementsByClassName("hpa-optionItem");
        if (items.length === 0) {
          return;
        }
        for (let i = 0; i < this.options.length; i++) {
          if (newVal === this.options[i]) {
            this.selectBtn = items[i];
            break;
          }
        }
        this.sliderBtn.style.top = this.selectBtn.offsetTop + this.selectBtn.clientHeight / 2 - 5 + 'px';
        this.sliderBtn.title = this.selectTime;
        this.$emit('change', newVal);
      },
      options: function (newVal, oldVal) {
        this.selectTime = newVal[0];
      },
    },
    data() {
      return {}
    },
    mounted() {
      this.sliderBtn = document.getElementsByClassName('hpa-slider-button')[0];
    },
    methods: {
      change(e) {
        let text = e.currentTarget.textContent;
        if (this.currentSelect !== text) {
          this.currentSelect = text;
        }
      },
      selectNode(e) {
        this.currentSelect = e.currentTarget.getElementsByClassName("hpa-slider-index")[0].title;
      },
      onmousedown: function (e) {
        let self = this;
        let btn = this.sliderBtn;
        let box = document.getElementsByClassName("hpaProcess")[0];
        let top = box.getBoundingClientRect().top;
        let distance = box.clientHeight;//滑动成功的宽度（距离）

        let len = (distance - 64) / (this.options.length - 2);

        document.onmousemove = function (e) {

          e = e || window.event;
          //1.获取鼠标移动后的水平位置
          let moveY = e.clientY - top;
          if (moveY > distance - 16) {
            moveY = distance - 20;
          } else if (moveY < 16) {
            moveY = 12;
          }
          btn.style.top = moveY + "px";
        };

        document.onmouseup = function (e) {
          e = e || window.event;
          //1.获取鼠标移动后的水平位置
          let moveY = e.clientY - top;
          if (moveY > distance - 32) {
            moveY = distance - 32;
            self.currentSelect = self.options[self.options.length - 1];
          } else if (moveY < 32) {
            moveY = 12;
            self.currentSelect = self.options[0];
          } else if (moveY >= 32 && moveY <= distance - 32) {
            let items = parseInt((moveY - 32) / (len / 2));
            let len2 = parseInt(items / 2) + 1;
            moveY = (len2 - 0.5) * len + 27;
            self.currentSelect = self.options[len2];
          }
          btn.style.top = moveY + "px";

          document.onmousemove = null;
          document.onmouseup = null;
        }
      }
    }
  }
</script>

<style scoped>
  .hxSider-container {
    display: flex;
    height: 17rem;
    padding-left: 0.5rem;
    position: relative;
  }

  .silder-title {
    height: 1rem;
    color: #000;
    font-size: 0.7rem;
  }

  .silder-content {
    position: absolute;
    height: calc(100% - 2rem);
    top: 2rem;
  }

  .hpaProcess {
    height: 100%;
    width: 0.3rem;
    position: absolute;
  }

  .hpa-slider-button {
    position: absolute;
    background: url(../assets/images/高度滑块.png) center no-repeat;
    width: 1rem;
    height: 1rem;
    left: -0.2rem;
    top: 0.5rem;
    cursor: pointer;
    z-index: 2;
  }

  .hpa-optionItems {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .hpa-optionItem {
    flex: 1;
    width: 0.6rem;
    background: rgba(0, 0, 0, 0.5);
    cursor: pointer;
    position: relative;
  }

  .hpa-optionItem:nth-child(1) {
    border-radius: 0.3rem 0.3rem 0 0;
    height: 1rem;
  }

  .hpa-optionItem:nth-last-child(1) {
    border-radius: 0 0 0.3rem 0.3rem;
    height: 1rem;
  }

  .hpa-slider-stop {
    width: 0.6rem;
    height: 0.2rem;
    top: 1rem;
    position: absolute;
    left: 0;
    background: white;
  }

  .hpa-slider-index {
    position: absolute;
    left: 1.5rem;
    padding: 0 0.1rem;
    background: rgba(0, 0, 0, 0.5);
    font-size: 0.3rem;
    width: 1.8rem;
    cursor: pointer;
    top: 0.8rem;
  }

</style>
