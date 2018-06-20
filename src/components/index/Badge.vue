<template>
    <Badge count='100'>
        <a href="#" class="demo-badge">
            <svg class="icon icon-icon--" aria-hidden="true">
            <use xlink:href="#icon-icon--"></use>
        </svg>
        </a>
    </Badge>
</template>
<script>
export default {
    
}
</script>
<style scoped>
    .icon-icon--{
        font-size: 22px;
    }
    .ivu-badge-count{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .page-view.active .icon-icon--{
        color: #8992a8;
    }
</style>


