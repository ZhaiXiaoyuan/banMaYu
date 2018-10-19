<!--文章模板-->
<template>
    <div class="tips-page">
      <div class="page-content">
        <i class="icon tips-success-icon"></i>
        <p class="status">{{curContent.title}}</p>
        <p class="remark">{{curContent.remark}}</p>
        <div class="btn-wrap">
          <span class="cm-btn btn ok-btn" @click="curContent.ok&&curContent.ok()">确定</span>
        </div>
      </div>
    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  .tips-page{
    .page-content{
      text-align: center;
      padding: 0.8rem 0.4rem  0.4rem 0.4rem;
    }
    .tips-success-icon{
      display: inline-block;
      background: url("../../images/common/tips-success-icon.png") no-repeat;
      width: 2rem;
      height: 2rem;
      background-size: 100% 100%;
    }
    .status{
      padding: 0.4rem 0rem;
      font-size: 0.4rem;
      color:#000;
    }
    .remark{
      margin-top: 0.4rem;
      text-align: left;
      font-size: 0.32rem;
      line-height: 0.5rem;
      color: #000;
    }
    .btn-wrap{
      margin-top: 0.8rem;
      width: 100%;
      padding: 0.2rem 0rem;
      background: none;
      text-align: center;
      /*border-top: 1px solid #eee;*/
      .btn{
        display: inline-block;
        width: 100%;
        height: 1rem;
        text-align: center;
        line-height: 1rem;
        font-size: 0.38rem;
        color: #fff;
        border-radius: 0.1rem;
        background: linear-gradient(to right, #0091e0 , #017ecc);
      }
    }
  }
</style>

<script>
    import Vue from 'vue'


    export default {
        components: {

        },
        data: function () {
            return {
              userInfo:null,
              content:[],
              curContent:{},
            }
        },
        computed: {},
        watch: {},
        methods: {

        },

        created: function () {
        },
        mounted: function () {
          this.userInfo=Vue.cookie.get('userInfo')?JSON.parse(Vue.cookie.get('userInfo')):{};
          this.content=[{
            type:'orderSuccess',
            title:'申请成功',
            remark:'亲爱的'+this.userInfo.realname+',您的体检预约到店支付已申请成功。请您提前到店支付，体检预约才能生效！',
            ok:()=>{
              this.$router.replace({name:'myOrder',query:{pageType:'10'}});
            }}];
          this.curContent=this.content[0]
        },

    };
</script>
