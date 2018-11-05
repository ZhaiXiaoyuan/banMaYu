<template>
  <div id="app" v-cloak>
   <!-- <transition :name="transitionName">
      <router-view/>
    </transition>-->
    <router-view/>
  </div>
</template>

<style lang="less" rel="stylesheet/less">
  @import "less/main";
  [v-cloak] { display: none }
</style>
<script>
  import Vue from 'vue'
  import MtaH5 from 'mta-h5-analysis';
  /**
   * 奇技淫巧：在这里显式定义全局变量和最高级的methods，在子组件里面可以直接调用，this.$root.xxxx来访问
   * */
  Vue.$rootScope = {
    access: {

    }
  }
export default {
  name: 'app',
  data:function () {
    return {
      transitionName:''
    }
  },
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
    /*  console.log('this.transitionName:',this.transitionName);*/
    }
  },
  mounted: function () {
    /*rem单位缩放*/
    (function (doc, win) {
      var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        isIOS = navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        recalc = function () {
          var clientWidth = docEl.clientWidth;
          var clientHeight = docEl.clientHeight;
          if (!clientWidth) return;
          if(clientWidth >= 750 ){
            clientWidth = 750
            doc.body.style.width = 750 + 'px'
          }else{
            doc.body.style.width = clientWidth + 'px'
          }
          doc.body.style.height = clientHeight + 'px'
          docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
          docEl.dataset.percent = 100 * (clientWidth / 750)
        };
      recalc();
      doc.documentElement.classList.add('iosx' + win.devicePixelRatio)
      if (!doc.addEventListener) return;
      win.addEventListener(resizeEvt, recalc, false);
    })(document, window);


 /*   let h = document.body.scrollHeight;
    console.log('h:',h);
    window.onresize = function(){
      let target=document.getElementsByClassName('cm-bottom-fixed')[0];
      console.log('h2:',document.body.scrollHeight);
      if (document.body.scrollHeight < h) {
        target.style.position='relative';
        alert('窗口变小');
      }else{
        alert('窗口恢复');
        target.style.position='fixed';
      }
    };*/

    let win_h = window.innerHeight;//关键代码

    window.addEventListener('resize', function () {
      let target=document.getElementsByClassName('cm-bottom-fixed')[0];
      if(window.innerHeight< win_h){
        target.style.display='none';
      }else{
        target.style.display='block';
      }
    });

    //
    Vue.tools.wxConfig({
      debug:false,
      url:window.location.href,
      jsApiList:['hideMenuItems','onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo'], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      callback:(data)=>{
        if(data){

        }
    }
    });
  }
}
</script>
