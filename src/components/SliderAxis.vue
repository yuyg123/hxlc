<template>
  <div class="slider" ref="slider">
    <div class="process"></div>
    <div class="slider-button" @mousedown="onmousedown"></div>
    <div class="optionItems">
      <div v-for="(option,index,key) in options" class="optionItem"
           :class="(index === 0 || parseInt(option) - parseInt(options[index-1]) > 30 || parseInt(option) - parseInt(options[index-1]) < -200)?'day-item':''"
           @click="selectNode">
        <span
          v-if="index === 0 || parseInt(option) - parseInt(options[index-1]) > 30 || parseInt(option) - parseInt(options[index-1]) < -200"
          class="slider-day" v-text="option.substring(0,2) + '日'"></span>
        <span class="slider-item"></span>
        <span class="slider-stop"></span>
        <span class="slider-index" :title='option' v-text="option.substring(2,4)"></span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      options: {
        default: []
      },
      selectTime: {
        default: null
      }
    },
    data() {
      return {}
    },
    watch: {
      selectTime: function (newVal, oldVal) {
        let items = document.getElementsByClassName("optionItem");
        if (items.length === 0) {
          return;
        }
        if (this.selectBtn) {
          this.selectBtn.classList.remove('currentSelect');
        }
        for (let i = 0; i < this.options.length; i++) {
          if (newVal === this.options[i]) {
            this.selectBtn = items[i];
            break;
          }
        }
        this.sliderBtn.style.left = this.selectBtn.offsetLeft + this.selectBtn.clientWidth / 2 - 5 + 'px';
        this.sliderBtn.title = this.selectTime;
        this.selectBtn.classList.add('currentSelect');
        this.$emit('change', newVal);
      },
      options: function (newVal, oldVal) {
        this.selectTime = newVal[0];
      }
    },
    //渲染到页面的时候
    mounted() {
      this.sliderBtn = document.getElementsByClassName('slider-button')[0];
    },
    methods: {
      selectNode(e) {
        this.selectTime = e.currentTarget.getElementsByClassName("slider-index")[0].title;
      },
      stepNext() {
        if (this.selectTime === this.options[this.options.length - 1]) {
          return;
        }
        for (let i = 0; i < this.options.length; i++) {
          if (this.selectTime === this.options[i]) {
            this.selectTime = this.options[i + 1];
            break;
          }
        }
      },
      stepLast() {
        if (this.selectTime === this.options[0]) {
          return;
        }
        for (let i = 0; i < this.options.length; i++) {
          if (this.selectTime === this.options[i]) {
            this.selectTime = this.options[i - 1];
            break;
          }
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
<style>
  .slider {
    width: 100%;
    display: flex;
    position: relative;
    height: 1rem;
  }

  .process {
    width: 100%;
    height: 0.3rem;
    position: absolute;
  }

  .optionItems {
    width: 100%;
    display: flex;
  }

  .optionItem {
    flex: 1;
    height: 0.2rem;
    background: #303133;
    position: relative;
    cursor: pointer;
  }

  .optionItems .optionItem:nth-child(1) {
    flex: inherit;
    width: 2rem;
  }

  .optionItems .optionItem:nth-last-child(1) {
    flex: inherit;
    width: 2rem;
  }


  .slider-item {
    background-color: deepskyblue;
    height: 0.2rem;
  }

  .optionItem.currentSelect {
    background: red;
  }

  .slider-stop {
    position: absolute;
    top: 2px;
    width: 2px;
    height: 0.5rem;
    background: #303133;
  }

  .day-item .slider-stop {
    height: 0.7rem;
    width: 2px;
  }

  .slider-index {
    position: absolute;
    top: 1rem;
    font-size: 0.3rem;
    color: #e4e4e4;
  }

  .day-item .slider-index {
    font-size: 0.9rem;
    color: white;

  }

  .slider-button {
    position: absolute;
    left: 0.7rem;
    top: -0.3rem;
    width: 0.4rem;
    height: 0.4rem;
    background: black;
    border-radius: 0.4rem;
    border: 3px solid white;
    z-index: 2;
    cursor: pointer;
  }

  .slider-button:hover {
    background: red;
  }

  .slider-day {
    background: #335d9b;
    position: absolute;
    top: -1.5rem;
    font-size: 0.4rem;
    color: white;
    padding: 0.1rem 0.8rem;
    border-radius: 1rem;
    word-break: keep-all;
  }


</style>
