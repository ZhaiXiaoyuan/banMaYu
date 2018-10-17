<template>
  <div class="list-selector">
    <mt-popup
      v-model="options.show"
      position="bottom" style="width: 100%;">
      <mt-picker :slots="options.slots" :showToolbar="true" value-key="label" @change="change">
        <div class="picker-hd"><span class="cm-btn btn cancel-btn" @click="options.show=false">取消</span><span class="cm-btn btn ok-btn" @click="sure()">确定</span></div>
      </mt-picker>
    </mt-popup>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  .list-selector{
    .picker-hd{
      .btn{
        display: inline-block;
        padding: 0.2rem 0.2rem;
        font-size: 0.32rem;
      }
      .ok-btn{
        float: right;
        color: #0091e0;
      }
    }
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
        picker:null,
        curData:null,
      }
    },
    computed: {},
    watch: {
     /* options:{
        handler (curVal,oldVal) {
          this.slots[0].values=curVal.list;
        },
        deep: true
      }*/
    },
    methods: {
      change(picker, values) {
        this.picker=picker;
        this.curData=values;
      },
      close:function () {
        this.$el.remove();
        this.$destroy();
      },
      sure:function () {
        this.options.ok&&this.options.ok(this.curData);
        this.options.show=false;
      },
      setDefault:function (data) {
        let list=[];
        data.forEach((target,index)=>{
          list.push(
            this.options.slots[index].values.find((item,i)=>{
              return item.value==target;
            })
          )
        });
        this.picker.setValues(list);
      },
    },
    created: function () {

    },
    mounted: function () {
      console.log('test:',this.options);
    }
  };
</script>
