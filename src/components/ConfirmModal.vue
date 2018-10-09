<template>
  <modal :options="options" ref="modal" :class="'confirm-modal'">
    <div class="modal-header">
      <p class="title">{{options.title}}</p>
    </div>
    <div class="modal-body" v-html="options.html">

    </div>
    <div class="modal-footer">
      <div class="handle-btn" @click="cancelHandle()">{{options.no}}</div>
      <div class="handle-btn ok-btn" @click="okHandle()">{{options.yes}}</div>
    </div>
  </modal>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  .modal.confirm-modal{
    .modal-content{
      border-radius: 0.16rem !important;
      overflow: hidden;
      width: 75%;
    }
    .modal-body{
      font-size: 0.32rem;
      color: #333;
      padding-bottom: 0rem;
    }
    .modal-footer{
      padding: 0.5rem;
      border-top:none;
      .handle-btn{
        width: 2rem;
        height: 0.7rem;
        line-height: 0.7rem;
        text-align: center;
        border: 1px solid #eee;
        font-size: 0.32rem;
        color: #333;
      }
      .ok-btn{
        margin-left: 0.6rem;
        border: 1px solid #12C2B3;
        background: #12C2B3;
        color: #fff;
      }
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
            className: '',      /*模态框的className*/
            title: '温馨提示', //提示标题
            html: '',   //提示内容
            yes: '确 定',
            no: '取 消',
            ok:null,//确定的回调
            cancel:null,//取消的回调
          }
        }
      }
    },
    data: function () {
      return {

      }
    },
    computed: {},
    watch: {

    },
    methods: {
      okHandle:function () {
        this.close();
        this.options.ok&&this.options.ok();
      },
      cancelHandle:function () {
        this.close();
        this.options.cancel&&this.options.cancel();
      },
      close:function () {
        this.$refs.modal.close();
      },
      open:function () {
        this.show=true;
      }
    },
    created: function () {

    },
    mounted: function () {

    }
  };
</script>
