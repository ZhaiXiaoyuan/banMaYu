<!--导航栏-->
<template>
    <div class="cm-bottom-fixed nav-bar" v-if="pageName!='login'">
        <ul>
          <router-link   to="/home" class="ripple" tag="li" :class="{'active':pageName=='home'}" v-if="!userInfo.mainid||userInfo.mainid=='M'">
            <i class="icon normal-icon home-btn-normal"></i>
            <i class="icon active-icon home-btn-active"></i>
            <span>首页</span>
          </router-link>
          <router-link tag="li"class="ripple" to="/shop" :class="{'active':pageName=='shop'}" v-if="!userInfo.mainid||userInfo.mainid=='M'">
            <i class="icon normal-icon shop-btn-normal"></i>
            <i class="icon active-icon shop-btn-active"></i>

            <span>商城</span>
          </router-link>
          <router-link tag="li" class="ripple" to="/relatives"  :class="{'active':pageName=='relatives'}">
            <i class="icon normal-icon relatives-btn-normal"></i>
            <i class="icon active-icon relatives-btn-active"></i>
            <span>亲友</span>
          </router-link>
          <li  class="ripple"  :class="{'active':pageName=='my'}" @click="checkUserInfo('my')">
            <i class="icon normal-icon my-btn-normal"></i>
            <i class="icon active-icon my-btn-active"></i>
            <span>我的</span>
          </li>
        </ul>
    </div>
</template>

<style lang="less" rel="stylesheet/less">
    .nav-bar{
      position: fixed;
      left: 0rem;
      bottom: 0rem;
      z-index: 1;
      width: 100%;
      height: 1.08rem;
      background: #fff;
      border-top:1px solid #e5e5e5;
      .home-btn-normal{
        background: url("../images/common/home-btn-normal.png") no-repeat;
        width: 0.48rem;
        height: 0.44rem;
        background-size: 100% 100%;
      }
      .home-btn-active{
        background: url("../images/common/home-btn-active.png") no-repeat;
        width: 0.58rem;
        height: 0.56rem;
        background-size: 100% 100%;
      }
      .shop-btn-normal{
        background: url("../images/common/shop-btn-normal.png") no-repeat;
        width: 0.44rem;
        height: 0.43rem;
        background-size: 100% 100%;
      }
      .shop-btn-active{
        background: url("../images/common/shop-btn-active.png") no-repeat;
        width: 0.50rem;
        height: 0.49rem;
        background-size: 100% 100%;
      }
      .relatives-btn-normal{
        background: url("../images/common/relatives-btn-normal.png") no-repeat;
        width: 0.54rem;
        height: 0.38rem;
        background-size: 100% 100%;
      }
      .relatives-btn-active{
        background: url("../images/common/relatives-btn-active.png") no-repeat;
        width: 0.60rem;
        height: 0.44rem;
        background-size: 100% 100%;
      }
      .my-btn-normal{
        background: url("../images/common/my-btn-normal.png") no-repeat;
        width: 0.40rem;
        height: 0.46rem;
        background-size: 100% 100%;
      }
      .my-btn-active{
        background: url("../images/common/my-btn-active.png") no-repeat;
        width: 0.52rem;
        height: 0.56rem;
        background-size: 100% 100%;
      }
      ul{
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
        li{
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          flex: 1;
          font-size: 0.24rem;
          color: #999;
          height: 100%;
          .icon{
            margin-bottom: 0.02rem;
          }
          .normal-icon{
            display: inline-block;
          }
          .active-icon{
            display: none;
          }
          &.active{
            color: #0080cc;
            .normal-icon{
              display: none;
            }
            .active-icon{
              display: inline-block;
            }
          }
        }
      }
    }

</style>

<script>
    import Vue from 'vue'


    export default {
        props: {

        },
        data:function () {
          return {
              userInfo:{},
              pageName:'',
              loverName:''
          }
        },
        watch:{
          '$route': function(to, from) {
            this.pageName=this.$route.name;
          },
        },
        methods:{
          link:function (value) {

          }
        },
        created: function () {
        },
        mounted:function () {
          this.userInfo=Vue.cookie.get('userInfo')?JSON.parse(Vue.cookie.get('userInfo')):{};
          /**/
          this.pageName=this.$route.name;
          /*修改父dom的样式*/
          this.$el.parentNode.style.paddingBottom='1.2rem';
          //判断是否关注公众号
          if(this.userInfo&&this.userInfo.mobilephone){
            this.checkFocus();
          }
        },
    }


</script>
