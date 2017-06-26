<template>
    <div class="wrap" id="app">
        <h2>Hello Admin!</h2>
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        preFetch() {
            /**
             * 切换组建之前预取数据,利用vuex 管理数据
             */
            console.log('function preFetch called!')
        },
        data: function () {
            return {}
        }
    }
</script>
<style lang="less" scoped>
    h2 {
        text-align: center;
        color: #f90;
    }
</style>