<!--我的-->
<template>
    <div class="my">
      <div class="panel user-panel">
        <div class="panel-bd">
          <img :src="userData.touxiang?userData.touxiang:defaultAvatar">
          <p class="name">{{userData.realname}}</p>
          <div class="data-row">
            <div class="item"><i class="icon diamond-icon"></i><span>{{userData.levelLabel}}</span></div>
            <div class="item"><i class="icon score-icon"></i><span>积分{{userData.score?userData.score:0}}</span></div>

          </div>
        </div>
        <router-link :to="{name:'store',params: { userId: userData.id},query:{storeId:userData.storeid}}" tag="div" class="panel-ft">
          <span class="label">关联体控所</span>
          <span class="value" v-if="userData.storename">{{userData.storename}}</span>
          <span class="cm-btn handle" v-if="!userData.storename">前往绑定</span>
        </router-link>
      </div>
      <div class="panel list-panel">
        <ul class="entry-list">
          <router-link :to="{ name: 'memberData', params: {id: userData.id,mainId:userInfo.mainid}}" tag="li">
            <span class="icon-wrap"><i class="icon data-min-icon"></i></span>
            <p>我的资料</p>
          </router-link>
          <li @click="toInvite()" v-if="userInfo.mainid=='M'">
            <span class="icon-wrap"><i class="icon add-member-icon"></i></span>
            <p>邀请好友</p>
          </li>
          <router-link :to="{ name: 'physicalList', params: {},query:{}}" tag="li" v-if="userInfo.mainid=='M'">
            <span class="icon-wrap"><i class="icon stethoscope-min-icon"></i></span>
            <p>体检预约</p>
          </router-link>
          <router-link :to="{ name: 'score', params: {}}" tag="li" v-if="userInfo.mainid=='M'">
            <span class="icon-wrap"><i class="icon score-lg-icon"></i></span>
            <p>积分明细</p>
          </router-link>
          <router-link tag="li" :to="{ name: 'myOrder', query: {pageType:'10'}}" v-if="userInfo.mainid=='M'">
            <span class="icon-wrap"><i class="icon order-icon"></i></span>
            <p>历史订单</p>
          </router-link>
          <router-link tag="li"  :to="{ name: 'reportList', params: {},query:{}}" >
            <span class="icon-wrap"><i class="icon report-min-icon"></i></span>
            <p>体检报告</p>
          </router-link>
          <router-link tag="li" :to="{ name: 'diary', params: {}}" v-if="userInfo.mainid=='M'">
            <span class="icon-wrap"><i class="icon diary-icon"></i></span>
            <p>食用日记</p>
          </router-link>
          <router-link :to="{ name: 'msg', params: {}}" tag="li" v-if="userInfo.mainid=='M'">
            <span class="icon-wrap"><i class="icon msg-icon"></i></span>
            <p>消息中心</p>
          </router-link>
          <router-link :to="{ name: 'feedback', params: {}}" tag="li" v-if="userInfo.mainid=='M'">
            <span class="icon-wrap"><i class="icon feedback-icon"></i></span>
            <p>意见反馈</p>
          </router-link>
          <router-link :to="{ name: 'about', params: {}}" tag="li" v-if="userInfo.mainid=='M'">
            <span class="icon-wrap"><i class="icon about-icon"></i></span>
            <p>关于我们</p>
          </router-link>
        <!--  <li @click="logout()">
            <span class="icon-wrap">退出</span>
            <p>临时测试</p>
          </li>-->
        </ul>
      </div>
      <nav-bar></nav-bar>
    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
</style>

<script>
    import Vue from 'vue'


    export default {
        components: {

        },
        data: function () {
            return {
              userInfo:{},
              defaultAvatar:require('../../images/common/default-avatar.png'),
              userData:{},
            }
        },
        computed: {},
        watch: {},
        methods: {
          getMyData:function () {
            Vue.api.getMyData({...Vue.tools.sessionInfo()}).then((resp)=>{
              if(resp.status=='success'){
                this.userData=JSON.parse(resp.message);
                console.log('this.userData:',this.userData);
              }
            });
          },
          toInvite:function () {
            window.location.href=window.location.href.split('#')[0]+'#/invite';
          },
          logout:function () {
            Vue.cookie.delete('number');
            Vue.cookie.delete('token');
            Vue.cookie.delete('userInfo');
            this.$router.push({name:'home'});
          }
        },

        created: function () {
        },
        mounted: function () {
          this.userInfo=Vue.cookie.get('userInfo')?JSON.parse(Vue.cookie.get('userInfo')):{};
          //
          this.getMyData();
          //
        },

    };
</script>
