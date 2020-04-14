<template>
    <div class="category-item">
        <div class="media">
            <div class="media-body">
                <h5 class="mt-0">{{category.name}}</h5>
                 <button type="button" v-on:click="changeCategory" class="btn btn-success btn-small float-right">{{ $t('adminJokes.buttonGoToCategory') }}</button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'category-item',
        props: {
            category: Object
        },
        methods: {
            changeCategory() {
                this.$emit('changeCategory', this.category.name);
            }
        }
    }
</script>
<style scoped>
    .category-item {
        background-color: #fff;
        color: #373737;
        box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
        padding: 30px;
        margin-top: 20px;
    }
</style>
