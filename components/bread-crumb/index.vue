<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="bread in breadList" :key="bread.value">{{bread.label}}</el-breadcrumb-item>
        <el-breadcrumb-item>二维码</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
    name: 'bread-crumb',

    computed: {
        breadList() {
            const mainNavIdx = this.$store.state.global.mainNavIdx;
            const mainSecNavIdx = this.$store.state.global.mainSecNavIdx;
            const qrTypes = this.$store.state.global.qrTypes;
            if (mainNavIdx === 0) {
                return [];
            }
            const first = qrTypes[mainNavIdx - 1];
            const second = first.children[mainSecNavIdx];
            console.log(first, second);
            return [
                first,
                second
            ]
        }
    },

    
}
</script>
