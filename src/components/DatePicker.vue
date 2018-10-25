<template>
  <div class="date-picker">
    <mt-popup
      v-model="options.show"
      position="bottom" style="width: 100%;">
      <calendar :events="calendar1.events" :lunar="calendar1.lunar" :value="options.value" :begin="calendar1.begin" :end="calendar1.end" :weeks="calendar1.weeks" :months="calendar1.months" @select="calendar1.select"></calendar>
    </mt-popup>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  .date-picker{
   /* width: 100%;
    height: 100%;
    background: red;*/
    /*第三方组件样式覆盖*/
    .list-selector-picker{
      width: 100%;
    }
  }
</style>
<script>
  import Vue from 'vue'
  import calendar from './calendar.vue'

  export default {
    components: {
      calendar
    },
    props:{
      options: {
        type: Object,
        default:function () {
          return {
           curDate:new Date(),
           show:true,
           value:[this.curDate.getFullYear(),this.curDate.getMonth(),this.curDate.getDate()],
            ok:null,
          }
        }
      }
    },
    data: function () {
      return {
        calendar1:{
        /*  curDate:new Date(),*/
      /*    value:this.options.value?this.options.value:[this.curDate.getFullYear(),this.curDate.getMonth(),this.curDate.getDate()], //默认日期*/
          // lunar:true, //显示农历
         /* weeks:['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],*/
         /* months:['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],*/
         /* events:{
            '2018-2-14':'$408','2018-2-15':'$460','2018-2-16':'$500',
          },*/
          select:(value)=>{
            this.options.ok&&this.options.ok(value);
            this.options.show=false;
          }
        },
      }
    },
    computed: {},
    watch: {

    },
    methods: {

      close:function () {
        this.$el.remove();
        this.$destroy();
      }
    },
    created: function () {

    },
    mounted: function () {

    }
  };
</script>
