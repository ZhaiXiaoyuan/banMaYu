<template>
  <div class="list-selector">
    <mt-popup
      v-model="options.show"
      position="bottom" style="width: 100%;">
      <mt-picker :slots="slots" value-key="label" @change="change"></mt-picker>
    </mt-popup>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  .list-selector{
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
  export default {
    components: {

    },
    props:{
      options: {
        type: Object,
        default:function () {
          return {
           show:false,
           list:[]
          }
        }
      }
    },
    data: function () {
      return {
        selectedGender:null,
        slots: [
          {
            values: [],
            textAlign: 'center',
            defaultIndex:0,
            className:'list-selector-picker',

          }
        ],
        isInit:false
      }
    },
    computed: {},
    watch: {
      options:{
        handler (curVal,oldVal) {
          this.slots[0].values=curVal.list;
        },
        deep: true
      }
    },
    methods: {
      change(picker, values) {
        let item=values[0];
      /*  this.member.gender=item.value;
        this.member.genderText=item.label;
        this.genderModalFlag=false;*/
        this.options.ok&&this.options.ok(item);
        this.options.show=false;
      },
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
