<template>
    <div class="sort-sheet">
        <div class="header">
            <h6 class="title">热门频道</h6>
        </div>
        <div class="sort-wrap">
            <div class="sort-item">
                <span class="sort-item-text">交友群</span>
            </div>
            <div class="sort-item">
                <span class="sort-item-text">交友群</span>
            </div>
            <div class="sort-item">
                <span class="sort-item-text">宝妈群</span>
            </div>
            <div class="sort-item">
                <span class="sort-item-text">吃货群</span>
            </div>
            <div class="sort-item">
                <span class="sort-item-text">咋咋群</span>
            </div>
            <div class="sort-item">
                <span class="sort-item-text">阅读群</span>
            </div>
            <div class="sort-item">
                <span class="sort-item-text">喝酒群</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'sort-sheet',
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