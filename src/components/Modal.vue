<template>
  <div class="modal" v-if="show" :class="[options.className]">
    <div class="mask" @click="!options.lock&&close()"></div>
    <div class="modal-content">
      <slot>
        <div class="modal-header">
          <p class="title">{{options.title}}</p>
        </div>
        <div class="modal-body" v-html="options.html">

        </div>
        <div class="modal-footer">
          <div class="handle-btn" @click="cancel()">取消</div>
          <div class="handle-btn" @click="ok()">确定</div>
        </div>
      </slot>
    </div>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  .modal{
    display: flex;
    position: fixed;
    z-index: 200;
    width: 100%;
    height: 100%;
    top:0rem;
    left: 0rem;
    align-items: center;
    justify-content: center;
    .mask{
      position: absolute;
      z-index: 201;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      top:0rem;
      left: 0rem;
    }
    .modal-content{
      position: relative;
      z-index: 202;
      width: 70%;
      margin: auto;
      background: #fff;
      border-radius: 0.04rem;
    }
    .modal-header{
      padding: 0.4rem;
      .title{
        color: #333;
        font-size: 0.36rem;
        text-align: center;
      }
    }
    .modal-body{
      padding: 0rem 0.2rem 0.3rem 0.2rem;
      text-align: center;
      p{
        font-size: 0.28rem;
        color: #666;
      }
    }
    .modal-footer{
      border-top: 1px solid #e5e5e5;
      display: -webkit-flex;
      display: flex;
      .handle-btn{
        height: 0.88rem;
        line-height: 0.88rem;
        text-align: center;
        color: #0090df;
        font-size: 0.3rem;
        flex: 1;
        -webkit-flex: 1;
        &+.handle-btn{
          border-left: 1px solid #e5e5e5;
        }
      }
    }
  }
  .modal-enter, .modal-leave {
    opacity: 0;
  }
  .modal-enter .modal-content, .modal-leave .modal-content {
    transition: all 0.5s ease;
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
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
            lock:false,
          }
        }
      }
    },
    data: function () {
      return {
        show:true,
      }
    },
    computed: {},
    watch: {

    },
    methods: {
      cancel:function () {
        this.close();
        this.options.cancel&&this.options.cancel();
      },
      ok:function () {
        this.close();
        this.options.ok&&this.options.ok();
      },
      close:function () {
        this.show=false;
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
