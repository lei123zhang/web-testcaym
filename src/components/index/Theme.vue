<template>
  <div
  @click="switchTheme" 
  class="theme">
    <div 
    class="color"
    :style="`background:${themeData[theme]};`"
    >
    <div class="themeListWarp">
      <!-- <ul
      v-if="themeListOnOff" 
      class="themeList">
        <li 
        v-for="items in themeData" 
        :key="items.id"
        :style="`width: 16px;height: 16px;border-radius: 50%;background: ${items};`"
        @click="switchTheme(items)"
        ></li>
      </ul> -->
    </div>
    </div>
    <span
    class="context" 
    >主题</span>
  </div>
</template>
<script>
export default {
  data(){
    return{
      theme:0,
      themeListOnOff:false,
      themeData:[
        'black',
        'white'
      ]
    }
  },
  methods:{
    showThemeList(){
      event.stopPropagation()
      this.themeListOnOff=true
    },
    switchTheme(){
      // event.stopPropagation()
      if(this.themeData[this.theme]==='white'){
        this.theme=0
        localStorage.setItem('theme', '0');
        this.$store.commit('setTheme',this.theme)
      }else if(this.themeData[this.theme]==='black'){
        this.theme=1
        localStorage.setItem('theme', '1');
        this.$store.commit('setTheme',this.theme)
      }
      this.themeListOnOff=false
    },
    handleBodyClick(){
      this.themeListOnOff=false
    },
    getTheme(){
      let theme =  localStorage.getItem('theme')
      if(theme){
        this.theme =  Number(theme)
      }
      this.$store.commit('setTheme',this.theme)
    }
  },
  mounted(){
    this.$nextTick(() => {
        document.querySelector('body').addEventListener('click', this.handleBodyClick);
    })
  },
  beforeDestroy(){
    document.querySelector('body').removeEventListener('click', this.handleBodyClick);
  },
  created(){
    this.getTheme()
    
  }
}
</script>
<style scoped>
  .theme{
    cursor:pointer;
    margin-left: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .theme .context{
    padding-left: 10px;
    font-family: MicrosoftYaHei;
    font-size: 15px;
    color: #141721;
  }
  .theme .color{
    position: relative;
    width: 16px;
    height: 16px;
    border: 1px solid #000;
    border-radius: 50%;
    /* background: #000; */
  }
  .theme .color .themeListWarp{
    position: absolute;
    top: 24px;
  }
  .theme .color .themeList{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 38px;
  }
  .theme .color .themeList li{
    border: 1px solid #000;
  }
  .page-view.active .theme .context{
    color: #8a93a9;
  }
</style>



