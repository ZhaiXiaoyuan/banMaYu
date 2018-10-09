<template>
  <modal :options="options" ref="modal">
    <div class="modal-header">
      <p class="title">{{options.title}}</p>
      <span class="close-btn" @click="close()">&times;</span>
    </div>
    <div class="modal-body">
      <div v-html="options.html"></div>
      <div v-if="options.autoTime">
        <span class="second">{{options.autoTime}}</span>秒后{{options.autoText}}
      </div>
    </div>
    <div class="modal-footer">
      <div class="handle-btn" @click="ok()">{{options.yes}}</div>
    </div>
  </modal>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  .alert-modal{}
  .modal-header{
    position: relative;
  }
  .close-btn{
    position: absolute;
    top:0.08rem;
    right: 0.2rem;
    float: right;
    color: #999;
    font-size: 0.54rem;
  }
  .second{
    font-size: 0.36rem;
    color: #00DFA0;
    padding-right: 0.08rem;
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
            className: '',      /*模态框的className*/
            title: '温馨提示', //提示标题
            html: '',   //提示内容
            yes: '确 定',
            no: '取 消',
            ok:null,//确定的回调
            cancel:null,//取消的回调,
            autoTime:false,
            second:0,
          }
        }
      }
    },
    data: function () {
      return {
        interval:null,
      }
    },
    computed: {},
    watch: {

    },
    methods: {
      ok:function () {
        this.close();
        this.options.ok&&this.options.ok();
      },
      close:function () {
        this.interval&&clearInterval(this.interval);
        this.$refs.modal.close();
      },
      open:function () {
        this.show=true;
      }
    },
    created: function () {

    },
    mounted: function () {
      if(this.options.autoTime){
        this.interval=setInterval(()=>{
          this.options.autoTime--;
          if(this.options.autoTime==0){
            this.ok();
          }
        },1000);
      }
    }
  };
</script>
