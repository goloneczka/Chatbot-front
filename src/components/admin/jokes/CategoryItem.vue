<template>
    <div class="category-item">
        <div class="media">
            <div class="media-body">
                <h5 class="mt-0">{{category.category}}</h5>
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
                this.$emit('changeCategory', this.category.category);
            }
        }
    }
</script>
<style scoped>
    .category-item {
        background-color: var(--admin-joke-item-bg-color);
        color: var(--admin-joke-item-color);
        box-shadow: var(--admin-joke-item-box-shadow);
        padding: var(--admin-joke-item-padding);
        margin-top: var(--admin-joke-margin-top);
    }
</style>
