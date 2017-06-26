<template>
    <div class="content" id="app">
        <div class="miss">
            <div class="img"></div>
        </div>
    </div>
</template>
<script>
    export default {
        data: function () {
            return {}
        },
        components: {}
    }
</script>
<style lang="less" scoped>
    .content {
        min-width: 1200px;
    }

    .miss {
        width: 1200px;
        margin: 0 auto;
        min-height: 500px;
        min-height: calc(~'100vh - 190px');
        text-align: center;
        padding-top: 50px;
        .img {
            display: inline-block;
            width: 460px;
            height: 419px;
            background: url('../../assets/image/404.jpg') no-repeat;
        }
    }
</style>