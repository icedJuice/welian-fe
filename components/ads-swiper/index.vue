<template>
    <div class="ads-containers" v-if="aids">
        <div class="ads-list">
            <div class="ads-item">
                广告
            </div>
             <div class="ads-item">
                广告
            </div>
             <div class="ads-item">
                广告
            </div>
        </div>
        <div class="ads-swiper">
            <el-carousel :interval="3000" arrow="always">
                <el-carousel-item v-for="item in 4" :key="item">
                    <div class="ads-swiper-item">
                        <span>广告</span>
                    </div>
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ads-swiper',

    computed: {
        aids() {
            return this.$store.state.global.aids;
        }
    }
}
</script>

<style lang="scss">
.ads-containers {
    .ads-list {
        .ads-item {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #ccc;
            margin-bottom: 20px;
            height: 200px;
        }
    }
    .ads-swiper {
        display: none;
        height: 140px;
        flex-grow: 1;
        align-self: stretch;
        background-color: #fff;
        margin: 16px 0 10px;
        .el-carousel__container {
            height: 140px;
        }
        .ads-swiper-item {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 140px;
        }
    }
}

@media screen and (max-width: 768px) {
    .ads-containers {
        .ads-list {
            display: none;
        }
        .ads-swiper {
            display: block;
        }
    } 
}
</style>