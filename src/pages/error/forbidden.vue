<!--404页面-->
<template>
    <div class="404-page" style="text-align: center;padding-top: 2rem;">
      <img src="data:image/png;base64,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">
      <p style="font-size: 0.36rem;margin-top:0.4rem; ">你已被禁止访问该网站</p>
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

            }
        },
        computed: {},
        watch: {},
        methods: {

        },

        created: function () {
        },
        mounted: function () {

        },

    };
</script>
