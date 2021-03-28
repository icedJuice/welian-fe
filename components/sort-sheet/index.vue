<template>
    <div class="sort-sheet">
        <div class="header">
            <h6 class="title">热门频道</h6>
        </div>
        <div class="sort-wrap">
            <div class="sort-item"
                v-for="(nav, index) in secNavs"
                :key="nav.value"
                @click="() => onNavClick(index)"
            >
                <span class="sort-item-text">{{nav.label}}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'sort-sheet',

    methods: {
        onNavClick(index) {
            const secIdx = this.$store.state.global.mainSecNavIdx;
            if (secIdx !== index) {
                this.$store.dispatch('global/onNavClick', { mainSecNavIdx: index });
            }
        }
    },

    computed: {
        secNavs() {
            const mainNavIdx = this.$store.state.global.mainNavIdx;
            if (mainNavIdx > 0) {
                return this.$store.state.global.qrTypes[mainNavIdx - 1].children;
            }
            return []
        },
        mainSecNavIdx() {
        return this.$store.state.global.mainSecNavIdx;
        },
    }
}
</script>

<style lang="scss" scoped>
.sort-sheet {
    padding: 20px 16px;
    background-color: #fff;
    .header {
        display: flex;
        justify-content: space-between;
        position: relative;
    }
    .title {
        font-size: 14px;
        line-height: 20px;
        color: #333;
        &::before {
            content: "";
            display: block;
            width: 4px;
            height: 26px;
            position: absolute;
            left: -20px;
            top: 0px;
            background-color: #07C160;
        }
    }
    .sort-wrap {
        display: flex;
        flex-wrap: wrap;
        padding-top: 7px;
        font-size: 0px;
        margin: 0 -4px;
    }
    .sort-item {
        display: flex;
        font-size: 12px;
        color: #07C160;
        width: 33.33%;
        margin-top: 8px;
    }
    .sort-item-text {
        display: flex;
        height: 27px;
        line-height: 27px;
        margin: 0 4px;
        justify-content: center;
        align-self: stretch;
        flex-grow: 1;
        cursor: pointer;
        background: #F1F1F1;
    }
}
@media screen and (max-width: 692px){
   
}
</style>