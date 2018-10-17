<!--新增反馈-->
<template>
    <div class="add-feedback">
      <div class="form">
      <!--  <div class="input-item">
          <span class="label">反馈对象：</span>
          <select>
            <option value ="体控所有管理员">体控所有管理员</option>
            <option value ="系统管理员">系统管理员</option>
          </select>
        </div>-->
        <div class="input-item">
          <p class="label">反馈内容：</p>
          <textarea v-model="content" cols="30" rows="10"></textarea>
        </div>
        <div class="btn-wrap">
          <div class="cm-btn btn" @click="save()">提&nbsp;&nbsp;交</div>
        </div>
      </div>
     <!-- <div class="tips-panel">
        <p>温馨提示：</p>
        <p>1、反馈一些关于体检预约、体检报告、健康咨询等相关问题，反馈对象请选择体控所管理员。</p>
        <p>2、反馈一些关于系统的使用说明，系统改善等相关问题，反馈对象请选择系统管理员。</p>
      </div>-->
    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  .add-feedback{
    padding: 0.8rem 0.3rem 0rem 0.3rem;
    width: 100%;
    .input-item{
      .label{
        padding: 0.1rem 0rem;
        font-size: 0.28rem;
        color: #333;
      }
      select{
        border: 1px solid #e5e5e5;
        background: #fff;
        padding: 0.1rem 0.2rem;
        outline: none;
        border-radius: 0.06rem;
      }
      textarea{
        padding: 0.2rem;
        width: 100%;outline: none;
        border: 1px solid #e5e5e5;
        resize: none;
      }
      &+.input-item{
        margin-top: 0.2rem;
      }
    }
    .btn-wrap{
      margin-top: 0.4rem;
      text-align: center;
      .btn{
        display: inline-block;
        height: 0.88rem;
        line-height: 0.88rem;
        padding: 0rem 0.8rem;
        font-size: 0.28rem;
        color: #fff;
        background: #0091e0;
        border-radius: 0.06rem;
      }
    }
    .tips-panel{
      margin-top: 0.8rem;
      font-size: 0.28rem;
      color: #999;
      line-height: 0.4rem;
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
              content:null,
            }
        },
        computed: {},
        watch: {},
        methods: {
          save:function () {
            if(!this.content){
              this.operationFeedback({type:'warn',text:'请输入反馈内容'});
              return;
            }
            let fb=this.operationFeedback({text:'保存中...'});
            let params={
              ...Vue.tools.sessionInfo(),
              content:this.content
            }
            Vue.api.addFeeback(params).then((resp)=>{
              if(resp.status=='success'){
                this.$router.go(-1);
                fb.setOptions({type:'complete',text:'保存成功'});
              }else{
                fb.setOptions({type:'warn',text:resp.message});
              }
            });
          },
        },

        created: function () {
        },
        mounted: function () {

        },

    };
</script>
