<template>
  <div class="hxSider-container">
    <div class="top-content">
      <span>高度（h/pa）</span>
    </div>
    <div class="bottom-content">
      <div class="leftSilderBar">
        <div class="silderItem" v-for="option in options">
          <div class="silderbar" v-if="option === currentSelect"><span class="silderbarStep currentSelect"
                                                                       @click="changebar"></span></div>
          <div class="silderbar" v-else><span class="silderbarStep" @click="changebar"></span></div>

          <span class="silderbar-title" v-text="option" @click="change"></span>
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
        this.$emit('change', newVal);
      }
    },
    data() {
      return {}
    },
    mounted(){

    },
    methods: {
      change(e) {
        let text = e.currentTarget.textContent;
        if (this.currentSelect !== text) {
          this.currentSelect = text;
        }
      },
      changebar(e) {
        let text = e.currentTarget.parentNode.parentNode.getElementsByClassName('silderbar-title')[0].textContent;
        if (this.currentSelect !== text) {
          this.currentSelect = text;
        }
      },
      onmousedown: function (e) {
        let self = this;
        let btn = this.sliderBtn;
        let box = document.getElementsByClassName("process")[0];
        let left = box.getBoundingClientRect().left;
        let distance = box.clientWidth;//滑动成功的宽度（距离）

        let len = (distance - 64) / (this.options.length - 2);

        //1.鼠标按下之前必须清除掉后面设置的过渡属性
        btn.style.transition = "";

        //三、给文档注册鼠标移动事件
        document.onmousemove = function (e) {

          e = e || window.event;
          //1.获取鼠标移动后的水平位置
          let moveX = e.clientX - left;
          if (moveX > distance - 16) {
            moveX = distance - 20;
          } else if (moveX < 16) {
            moveX = 12;
          }
          btn.style.left = moveX + "px";
        };

        document.onmouseup = function (e) {
          e = e || window.event;
          //1.获取鼠标移动后的水平位置
          let moveX = e.clientX - left;
          if (moveX > distance - 32) {
            moveX = distance - 20;
            self.selectTime = self.options[self.options.length - 1];
          } else if (moveX < 32) {
            moveX = 12;
            self.selectTime = self.options[0];
          } else if (moveX >= 32 && moveX <= distance - 32) {
            let items = parseInt((moveX - 32) / (len / 2));
            let len2 = parseInt(items / 2) + 1;
            moveX = (len2 - 0.5) * len + 27;
            self.selectTime = self.options[len2];
          }
          btn.style.left = moveX + "px";

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
    height: 19rem;
    padding-left: 0.5rem;
    position: relative;
  }

  .top-content {
    height: 1rem;
    color: #000;
    font-size: 0.7rem;
  }

  .bottom-content {
    position: absolute;
    top: 1.5rem;
    height: calc(100% - 2rem);
    display: flex;
  }

  .leftSilderBar {
    height: 100%;
    margin-left: 0.2rem;
    display: flex;
    flex-direction: column;
  }

  .silderbar {
    background: rgba(0, 0, 0, 0.5);
    width: 0.5rem;
    position: relative;
  }

  .silderItem {
    flex: 1;
    display: flex;
    color: black;
  }

  .silderbar-title {
    margin-left: 1rem;
    margin-top: 0.5rem;
    height: 0.9rem;
    font-size: 0.1rem;
    padding: 0.05rem 0.3rem;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    cursor: pointer;
  }

  .silderItem:nth-child(1) .silderbar {
    border-radius: 1rem 1rem 0 0;
  }

  .silderItem:last-child .silderbar {
    border-radius: 0 0 1rem 1rem;
    height: 2rem;
  }

  .silderbarStep {
    height: 0.2rem;
    background: white;
    position: absolute;
    width: 0.4rem;
    left: 0.05rem;
    top: 0.9rem;
    cursor: pointer;
  }

  .silderbarStep.currentSelect {
    background: url(../assets/images/高度滑块.png) center no-repeat;
    width: 1rem;
    height: 1rem;
    left: -0.25rem;
    top: 0.5rem;
  }


</style>
